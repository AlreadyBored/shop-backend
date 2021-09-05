

import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const connectionOptions = {
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
};

export class Database {
    _client: Client;

    constructor() {
        this._client = new Client(connectionOptions);
    }

    get client() {
        return this._client;
    }

    async connect() {
        await this._client.connect();
    }

    async disconnect() {
        await this._client.end();
    }

}