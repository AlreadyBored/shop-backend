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

        await this._client.query(`
                INSERT INTO
                products (${id ? 'id, ' : ''}title, description, price, image)
                VALUES (${id ? `'${id}', ` : ''}'${title}', '${description}', ${price}, '${image}')
            `);

        const product = await this._client.query(`SELECT * FROM products WHERE title = '${title}'`);

        await this._client.query(`
                INSERT INTO 
                stock (product_id, count)
                VALUES ('${product.rows[0].id}', 1)
            `);

        const fullProduct = await this._client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stock s ON p.id = s.product_id 
                WHERE p.id='${product.rows[0].id}'
            `);

        return fullProduct.rows[0];
    }

}