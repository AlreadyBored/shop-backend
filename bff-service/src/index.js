const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios').default;
const { DEFAULT_PORT, STATUS_CODES, CACHE_LIFETIME_MS } = require('./utils/constants');
const { logRequest: consoleLogger } = require('./utils/consoleLogger');

dotenv.config();

const { INTERNAL_SERVER_ERROR, BAD_GATEWAY } = STATUS_CODES;

const app = express();

const PORT = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

const cachedProducts = {};

app.all('/*', async (req, res) => {
    const { method, originalUrl, body } = req;

    consoleLogger({ method, originalUrl, body });

    const urlParts = originalUrl.split('/');
    const [, recipient] = urlParts;

    let fixedRequestedURL = originalUrl;

    if (urlParts.length >= 3 && recipient === 'cart') fixedRequestedURL = req.originalUrl.replace(`/${recipient}`, '');

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

            if (originalUrl === '/products' && req.method === 'GET') {
                const currTS = Date.now();
                if (!cachedProducts.iat || (currTS - cachedProducts.iat) > CACHE_LIFETIME_MS) {
                    cachedProducts.iat = currTS;
                    cachedProducts.data = response.data;
                    console.log('Cache is updated, send fresh data');
                    return res.json(response.data);
                } else {
                    console.log('Send data from cache');
                    return res.json(cachedProducts.data);
                }
            }

            res.json(response.data);

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

