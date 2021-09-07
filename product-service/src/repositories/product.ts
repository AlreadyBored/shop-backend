import { Database } from '../db/db';
import { RESTORE_DEFAULTS_QUERY } from '../utils/constants';

export class ProductRepository {
    _db: Database

    constructor() {
        this._db = new Database();
    }

    async restoreDefaults() {
        try {
            await this._db.connect();
            await this._db.client.query(RESTORE_DEFAULTS_QUERY);
        } catch (e) {
            throw e;
        } finally {
            await this._db.disconnect();
        }
    }

    async getAllProducts() {
        try {
            await this._db.connect();
            return await this._db.client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stock s ON p.id = s.product_id
            `);
        } catch (e) {
            throw e;
        } finally {
            await this._db.disconnect();
        }

    }

    async getSingleProduct(id: string) {
        try {
            await this._db.connect();
            return await this._db.client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stock s ON p.id = s.product_id 
                WHERE p.id='${id}'
            `);
        } catch (e) {
            throw e;
        } finally {
            await this._db.disconnect();
        }

    }

    async addProduct(productDTO) {
        try {
            const { id, title, description, price, image } = productDTO;
            await this._db.connect();
            await this._db.client.query(`
                INSERT INTO
                products (${id ? 'id, ' : ''}title, description, price, image)
                VALUES (${id ? `'${id}', ` : ''}'${title}', '${description}', ${price}, '${image}')
            `);
            const product = await this._db.client.query(`SELECT * FROM products WHERE title = '${title}'`);
            await this._db.client.query(`
                INSERT INTO 
                stock (product_id, count)
                VALUES ('${product.rows[0].id}', 1)
            `);
            const fullProduct = await this._db.client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stock s ON p.id = s.product_id 
                WHERE p.id='${product.rows[0].id}'
            `);
            return fullProduct.rows[0];
        } catch (e) {
            throw e;
        } finally {
            await this._db.disconnect();
        }
    }

}