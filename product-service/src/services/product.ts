import { ProductRepository } from '../repositories/product';

export const restoreDefaults = async (client) => {
    const productsRepository = new ProductRepository(client);
    await productsRepository.restoreDefaults();
};

export const getAllProducts = async (client) => {
    const productsRepository = new ProductRepository(client);
    const products = await productsRepository.getAllProducts();
    return products.rows;
};

export const getSingleProduct = async (client, id: string) => {
    const productsRepository = new ProductRepository(client);
    const product = await productsRepository.getSingleProduct(id);
    return product.rows;
};

export const addProduct = async (client, productDTO) => {
    const productsRepository = new ProductRepository(client);
    return await productsRepository.addProduct(productDTO);
}