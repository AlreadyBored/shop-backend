import { Client } from 'pg';
import { RESTORE_DEFAULTS_QUERY } from '../utils/constants';

export class ProductRepository {
    _client: Client

    constructor(client) {
        this._client = client;
    }

    async restoreDefaults() {
        await this._client.query(RESTORE_DEFAULTS_QUERY);
    }

    async getAllProducts() {
        return await this._client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stock s ON p.id = s.product_id
            `);
    }

    async getSingleProduct(id: string) {
        return await this._client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stock s ON p.id = s.product_id 
                WHERE p.id='${id}'
            `);
    }

    async addProduct(productDTO) {
        const { id, title, description, price, image } = productDTO;

        try {
            await this._client.query('begin');

            const creationRes = await this._client.query(`
                INSERT INTO
                products (${id ? 'id, ' : ''}title, description, price, image)
                VALUES (${id ? `'${id}', ` : ''}'${title}', '${description}', ${price}, '${image}')
                RETURNING *
            `);

            const { id: createdProductId } = creationRes.rows[0];

            await this._client.query(`
                INSERT INTO 
                stock (product_id, count)
                VALUES ('${createdProductId}', 1)
            `);

            const fullProduct = await this._client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stock s ON p.id = s.product_id 
                WHERE p.id='${createdProductId}'
            `);

            await this._client.query('commit');

            return fullProduct.rows[0];
        } catch (e) {
            await this._client.query('rollback');
            throw e;
        }
    }

}