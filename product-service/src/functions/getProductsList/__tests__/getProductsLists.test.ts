import { getProductsList } from '../handler';
import { STATUS_CODES } from '../../../utils/constants';

const { OK } = STATUS_CODES;

jest.mock('@db/chemicals.json', () => ({
    default: [
        {
            count: 1,
            description: "MOCK PRODUCT 1",
            id: "1",
            price: 14.40,
            title: "MOCK PRODUCT 1",
            image: ""
        },
        {
            count: 2,
            description: "MOCK PRODUCT 2",
            id: "2",
            price: 24.40,
            title: "MOCK PRODUCT 2",
            image: ""
        },
        {
            count: 3,
            description: "MOCK PRODUCT 3",
            id: "3",
            price: 34.40,
            title: "MOCK PRODUCT 3",
            image: ""
        }
    ]
}));

describe('getProductsList test suite', () => {

    it('Should return correct products list', async () => {
        const { body } = await getProductsList();
        expect(body).toEqual(JSON.stringify({
            default: [
                {
                    count: 1,
                    description: "MOCK PRODUCT 1",
                    id: "1",
                    price: 14.40,
                    title: "MOCK PRODUCT 1",
                    image: ""
                },
                {
                    count: 2,
                    description: "MOCK PRODUCT 2",
                    id: "2",
                    price: 24.40,
                    title: "MOCK PRODUCT 2",
                    image: ""
                },
                {
                    count: 3,
                    description: "MOCK PRODUCT 3",
                    id: "3",
                    price: 34.40,
                    title: "MOCK PRODUCT 3",
                    image: ""
                }
            ]
        }));
    });

    it('Should return correct status code', async () => {
        const { statusCode } = await getProductsList();
        expect(statusCode).toBe(OK);
    });
});