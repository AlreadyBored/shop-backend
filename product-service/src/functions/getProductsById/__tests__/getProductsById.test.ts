import { getProductsById } from '../handler';
import { STATUS_CODES } from '../../../utils/constants';

const { OK } = STATUS_CODES;

const createEventObject = (productId) => ({ pathParameters: { productId } });

describe('getProductsById test suite', () => {

    it('Should return correct status code & product (EXISTING PRODUCT)', async () => {
        const existingProductEventObject = createEventObject('7567ec4b-b10c-48c5-9345-fc73c48a80aa');
        const { body, statusCode } = await getProductsById(existingProductEventObject);
        expect(body).toEqual(JSON.stringify({
            count: 4,
            description: 'Sodium chloride solution for titrimetric analysis 1 AMP',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
            price: 24.40,
            title: 'Sodium chloride solution',
            image: 'https://www.sigmaaldrich.com/deepweb/content/dam/sigma-aldrich/product7/095/titrisol_ampoule_titrisol_ampoule_all.jpg/_jcr_content/renditions/titrisol_ampoule_titrisol_ampoule_all-medium.jpg'
        }));
        expect(statusCode).toBe(OK);
    });

});