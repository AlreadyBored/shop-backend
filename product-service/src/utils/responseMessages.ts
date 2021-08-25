const getBadRequestMessage = id => `You have to provide correct id instead of ${id}`;
const getNotFoundMessage = id => `Product with ${id} is not found`;
const getInternalServerErrorMessage = err => `Something went wrong on server side: ${err} occured`;

export {
    getBadRequestMessage,
    getNotFoundMessage,
    getInternalServerErrorMessage
};