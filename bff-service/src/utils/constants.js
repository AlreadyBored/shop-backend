const DEFAULT_PORT = 3000;

const STATUS_CODES = {
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502
};

const CACHE_LIFETIME_MS = 120000;

module.exports = {
    DEFAULT_PORT,
    STATUS_CODES,
    CACHE_LIFETIME_MS
};