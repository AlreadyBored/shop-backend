const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios').default;
const { DEFAULT_PORT, STATUS_CODES } = require('./utils/constants');
const { logRequest: consoleLogger } = require('./utils/consoleLogger');
const { fixURL } = require('./utils/fixUrl');

dotenv.config();

const { INTERNAL_SERVER_ERROR, OK, BAD_GATEWAY } = STATUS_CODES;

const app = express();

const PORT = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

app.all('/*', async (req, res) => {
    const { method, originalUrl, body } = req;

    consoleLogger({ method, originalUrl, body });

    const urlParts = originalUrl.split('/');
    const [, recipient] = urlParts;

    let fixedRequestedURL = originalUrl;

    if (urlParts.length >= 3) fixedRequestedURL = req.originalUrl.replace(`/${recipient}`, '');

    console.log('[recipient]', recipient);

    const recipientURL = process.env[recipient];

    console.log('[recipientURL]', recipientURL);

    if (recipientURL) {
        const axiosConfig = {
            method,
            url: `${recipientURL}${fixedRequestedURL}`,
            ...Object.keys(body || {}).length > 0 && { data: body }
        };

        console.log('[axiosConfig]', axiosConfig);
        try {
            const response = await axios(axiosConfig);
            console.log('[response from recipient]', response.data);
            res.status(OK).json(response.data);
        } catch (e) {
            if (e.response) {
                const { status, data } = e.response;
                res.status(status).json(data);
            } else {
                res.status(INTERNAL_SERVER_ERROR).json({ error: e.message });
            }
        }


    } else {
        res.status(BAD_GATEWAY).json({ message: 'Cannot process request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port.`);
});

