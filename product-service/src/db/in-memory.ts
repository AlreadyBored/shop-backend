
import { IChemical } from '../models/product';
import chemicals from './chemicals.json';

const getById = (id: string): IChemical => chemicals.find(chemical => chemical.id === id);

const getAll = (): IChemical[] => chemicals;

export {
    getById,
    getAll
};
