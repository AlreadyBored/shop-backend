import { Database } from '../db/db';
import { INITIAL_QUERIES } from '../utils/constants';

const { CREATE_PRODUCTS, CREATE_STOCK, FILL_PRODUCTS, FILL_STOCK } = INITIAL_QUERIES;


export class ProductRepository {
    _db: Database

    constructor() {
        this._db = new Database();
    }

    async fillDatabase() {
        try {
            await this._db.connect();
            await this._db.client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
            await this._db.client.query(CREATE_PRODUCTS);
            await this._db.client.query(CREATE_STOCK);
            const checkProductsResult = await this._db.client.query('SELECT * FROM products');
            if (checkProductsResult.rowCount) return;
            await this._db.client.query(FILL_PRODUCTS);
            await this._db.client.query(FILL_STOCK);
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