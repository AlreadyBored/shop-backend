import { catalogBatchProcess } from '../handler';
import AWS from 'aws-sdk-mock';
import product from './test.json';

jest.mock('pg', () => {
    const mockClient = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Client: jest.fn(() => mockClient) };
});

const Records = {
    Records: [
        {
            body: JSON.stringify(product)
        },
        {
            body: JSON.stringify(product)
        }
    ]
};

const productsArr = [
    product,
    product
];

jest.mock('@src/services/product', () => ({
    addManyProducts: jest.fn(() => productsArr)
}));


describe('Product service catalogBatchProcess', () => {

    beforeAll(() => {
        AWS.mock('SNS', 'publish', (params, cb) => {
            cb(null, params);
        });
    });

    it('products are correct', async () => {
        const { products } = await catalogBatchProcess(Records);
        expect(products).toEqual(productsArr);
    });

    it('snsMessage is correct', async () => {
        const { snsMessage } = await catalogBatchProcess(Records);
        const { Subject, Message } = snsMessage;
        expect(Subject).toBe('Some products were added to database');
        expect(Message).toBe('Plus 2 product(s) in DB');
    });

    it('filter policy message attributes are correct', async () => {
        const { snsMessage } = await catalogBatchProcess(Records);
        const { MessageAttributes } = snsMessage;
        const expectedMA = {
            productsCount: {
                DataType: 'Number',
                StringValue: '2'
            }
        };
        expect(MessageAttributes).toEqual(expectedMA);
    });

})