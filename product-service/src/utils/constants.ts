export enum STATUS_CODES {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
};

export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export enum INITIAL_QUERIES {
    CREATE_PRODUCTS = `
    CREATE TABLE IF NOT EXIST products (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        title text NOT NULL,
        description text,
        price number,
        image text
    )
    `,
    CREATE_STOCK = `
    CREATE TABLE IF NOT EXISTS stock (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4()
        product_id uuid,
        count integer,
        constraint fk_product_id FOREIGN KEY (product_id) REFERENCES products (id)
    )
    `,
    FILL_PRODUCTS = `
    INSERT INTO products 
    VALUES (id, title, description, price, image) 
    ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'Sodium chloride solution', 'Sodium chloride solution for titrimetric analysis 1 AMP', 24.40, 'https://www.sigmaaldrich.com/deepweb/content/dam/sigma-aldrich/product7/095/titrisol_ampoule_titrisol_ampoule_all.jpg/_jcr_content/renditions/titrisol_ampoule_titrisol_ampoule_all-medium.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'Acetonitrile', 'Acetonitrile for HPLC 2.5 L', 401, 'https://analyticsshop.tiny.pictures/main/import/RD34851-2.5L.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'Potassium bromide', 'Potassium bromide for IR spectroscopy 100 G', 23, 'https://5.imimg.com/data5/LP/FT/MY-30586667/potassium-bromide-500x500.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'Chloride Assay Kit', 'Sufficient for 100 colorimetric tests', 274, 'https://www.sigmaaldrich.com/deepweb/content/dam/sigma-aldrich/product2/199/mak_general-kits.tif/_jcr_content/renditions/mak_general-kits-large.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Tetrabutylammonium hydrogensulfate', 'Tetrabutylammonium hydrogensulfate 97% 100 G', 99, 'https://analyticsshop.tiny.pictures/main/import/363622.1606.jpg')
    `,
    FILL_STOCK = `
    INSERT INTO stock
    VALUES (product_id, count)
    ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 1),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 2),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 3),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 4),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 5)
    `

}