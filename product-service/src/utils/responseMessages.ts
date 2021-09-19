export const getSingleProductBadRequestMessage = id => `You have to provide correct id instead of ${id}`;

export const getNotFoundMessage = id => `Product with ${id} is not found`;

export const getInternalServerErrorMessage = err => `Something went wrong on server side: ${err}`;

export const addProductBadRequestMessage = `Invalid requests body`;