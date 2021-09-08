

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

export class DatabaseConnection {

    static client = null;

    static createClient() {
        DatabaseConnection.client = new Client(connectionOptions);
    }

    static async connect() {
        await DatabaseConnection.client.connect();
    }

    static async disconnect() {
        await DatabaseConnection.client.end();
    }

}