const fixURL = (req, recipient) => {
    const { originalUrl } = req;
    console.log( req, recipient);

    const urlParts = originalUrl.split('/');
    console.log(urlParts);
    if (urlParts.length >= 3) req.originalUrl = req.originalUrl.replace(`/${recipient}`, '');
}
// const requestedUrl = splitedUrl.length > 2 ? req.originalUrl.replace(`/${recipient}`, '') : '';

module.exports = {
    fixURL
};