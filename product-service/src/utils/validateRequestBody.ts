import { UUID_V4_REGEXP } from '../utils/constants';

interface IBody {
    id?: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export const isBodyValid = (body: IBody) => {

    const bodyFields: {
        [key: string]: {
            type: string;
            required: boolean;
            validator?: (prop: any) => boolean
        }
    } = {
        id: {
            type: 'string',
            required: false,
            validator(id: string) {
                return UUID_V4_REGEXP.test(id);
            }
        },
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        price: {
            type: 'string',
            required: true,
        },
        image: {
            type: 'string',
            required: true,
        }
    };

    for (let [key, validationProps] of Object.entries(bodyFields)) {
        const { type, required, validator } = validationProps;
        const incomingValue = body[key];
        if (required) {
            if (!incomingValue) return false;
        }
        if (typeof incomingValue !== type) return false;
        if (validator) {
            if (!validator(incomingValue)) return false;
        }
    }

    return true;
};