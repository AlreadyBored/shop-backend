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
            notNegative?: boolean;
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
            type: 'number',
            notNegative: true,
            required: true,
        },
        image: {
            type: 'string',
            required: true,
        }
    };

    for (let [key, validationProps] of Object.entries(bodyFields)) {
        const { type, required, validator, notNegative } = validationProps;
        const incomingValue = body[key];
        if (!incomingValue) {
            if (required) {
                return false;
            } else {
                continue;
            }
        }
        if (typeof incomingValue !== type) return false;
        if (notNegative) {
            if (incomingValue < 0) return false;
        }
        if (validator) {
            if (!validator(incomingValue)) return false;
        }
    }

    return true;
};