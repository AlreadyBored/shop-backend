import { ProductRepository } from '../repositories/product';

export const getAllProducts = async () => {
    const productsRepository = new ProductRepository();
    const products = await productsRepository.getAllProducts();
    return products;
};

export const getSingleProduct = async (id: string) => {
    const productsRepository = new ProductRepository();
    const product = await productsRepository.getSingleProduct(id);
    return product;
};