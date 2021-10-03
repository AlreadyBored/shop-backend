# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS

### Task 4.1 SQL script to fill DB

This PostgreSQL script was used to create `products` and `stock` tables and fill it with initial data

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS stock;

CREATE TABLE IF NOT EXISTS products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text NOT NULL,
	description text,
	price numeric,
	image text
);

CREATE TABLE IF NOT EXISTS stock (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id uuid REFERENCES products (id),
	count integer
);

INSERT INTO products (id, title, description, price, image)
    VALUES  
    ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'Sodium chloride solution', 'Sodium chloride solution for titrimetric analysis 1 AMP', 24.40, 'https://www.sigmaaldrich.com/deepweb/content/dam/sigma-aldrich/product7/095/titrisol_ampoule_titrisol_ampoule_all.jpg/_jcr_content/renditions/titrisol_ampoule_titrisol_ampoule_all-medium.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'Acetonitrile', 'Acetonitrile for HPLC 2.5 L', 401, 'https://analyticsshop.tiny.pictures/main/import/RD34851-2.5L.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'Potassium bromide', 'Potassium bromide for IR spectroscopy 100 G', 23, 'https://5.imimg.com/data5/LP/FT/MY-30586667/potassium-bromide-500x500.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'Chloride Assay Kit', 'Sufficient for 100 colorimetric tests', 274, 'https://www.sigmaaldrich.com/deepweb/content/dam/sigma-aldrich/product2/199/mak_general-kits.tif/_jcr_content/renditions/mak_general-kits-large.jpg'),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Tetrabutylammonium hydrogensulfate', 'Tetrabutylammonium hydrogensulfate 97% 100 G', 99, 'https://analyticsshop.tiny.pictures/main/import/363622.1606.jpg');

INSERT INTO stock (product_id, count)
    VALUES 
    ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 1),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 2),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 3),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 4),
    ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 5);
```

### Lambdas

There are few lambdas currently in products-service:
* `getProductsList` — returns all products from database
* `getProductById` — finds by id and returns single product from database 
* `addProduct` — adds single product to database
* `restoreDefaultProducts` — restore initial products in database (as in SQL script above)

### Endpoints

Their APIGateway endpoints:
* `getProductsList` — GET - https://icqa4iybt4.execute-api.eu-west-1.amazonaws.com/dev/products
* `getProductById` — GET - https://icqa4iybt4.execute-api.eu-west-1.amazonaws.com/dev/products/{productId}
* `addProduct` — POST - https://icqa4iybt4.execute-api.eu-west-1.amazonaws.com/dev/products
* `restoreDefaultProducts` — PUT - https://icqa4iybt4.execute-api.eu-west-1.amazonaws.com/dev/products-default

More about endpoints at [SWAGGER](https://app.swaggerhub.com/apis/AlreadyBored/shop-be/1.0.0) (you can also look at `openapi.yml` in product-service root folder).

### Frontend

[Link to frontend](https://dajtpag5srf3l.cloudfront.net/)

Products on frontend are now integreated with database. Try it out by using `addProduct` lambda:
1. Add product using POSTMAN or SWAGGER (see above)
2. Refresh frontend page
3. Newly created product appears

P.S. I recommend you to run `restoreDefaultProducts` lambda to clear database from products created by previous cross-checker before you try it :)

[Link to frontend repository (if needed)](https://github.com/AlreadyBored/shop-vue-vuex-cloudfront)

### Transactions

Product creation process is implemented using SQL transactions (look at method `addProduct` in `src/repositories/product.ts`)