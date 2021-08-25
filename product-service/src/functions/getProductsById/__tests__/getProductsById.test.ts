import { getProductsById } from '../handler';
import { STATUS_CODES } from '../../../utils/constants';
import { getBadRequestMessage, getNotFoundMessage } from '../../../utils/responseMessages';

const createEventObject = (productId) => ({ pathParameters: { productId } });

describe('getProductsById test suite', () => {

    it('Should return correct status code & product (EXISTING PRODUCT)', async () => {
        const id = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
        const existingProductEventObject = createEventObject(id);
        const { body, statusCode } = await getProductsById(existingProductEventObject);
        expect(body).toEqual(JSON.stringify({
            count: 4,
            description: 'Sodium chloride solution for titrimetric analysis 1 AMP',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
            price: 24.40,
            title: 'Sodium chloride solution',
            image: 'https://www.sigmaaldrich.com/deepweb/content/dam/sigma-aldrich/product7/095/titrisol_ampoule_titrisol_ampoule_all.jpg/_jcr_content/renditions/titrisol_ampoule_titrisol_ampoule_all-medium.jpg'
        }));
        expect(statusCode).toBe(STATUS_CODES.OK);
    });

    it('Should return correct status code & message (NO ID)', async () => {
        const id = null;
        const noIdEventObject = createEventObject(id);
        const { body, statusCode } = await getProductsById(noIdEventObject);
        expect(body).toEqual(JSON.stringify({
            message: getBadRequestMessage(id)
        }));
        expect(statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    });

    it('Should return correct status code & message (NO PRODICT)', async () => {
        const id = 'non-existing-id';
        const noIdEventObject = createEventObject(id);
        const { body, statusCode } = await getProductsById(noIdEventObject);
        expect(body).toEqual(JSON.stringify({
            message: getNotFoundMessage(id)
        }));
        expect(statusCode).toBe(STATUS_CODES.NOT_FOUND);
    });

});