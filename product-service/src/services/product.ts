import { ProductRepository } from '../repositories/product';

export const fillDB = async () => {
    const productsRepository = new ProductRepository();
    await productsRepository.fillDatabase();
};

export const getAllProducts = async () => {
    const productsRepository = new ProductRepository();
    const products = await productsRepository.getAllProducts();
    return products.rows;
};

export const getSingleProduct = async (id: string) => {
    const productsRepository = new ProductRepository();
    const product = await productsRepository.getSingleProduct(id);
    return product.rows;
};