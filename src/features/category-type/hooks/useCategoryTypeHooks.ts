import { useQuery } from '@tanstack/react-query'
import { categoryTypeService } from '../services/categoryTypeService';
import { MONEY_MAP_KEY_CONSTANTS } from '@/constants/moneyMapKeys';

const CATEGORY_TYPES_KEY = MONEY_MAP_KEY_CONSTANTS.CATEGORY_TYPES;

export const useCategoryTypesAddableDropDownOptionsQuery = () => {
    return useQuery({
        queryKey: [CATEGORY_TYPES_KEY, 'addableDropDownOptions'],
        queryFn: () => categoryTypeService.getAddableCategoryTypeDropDownOptions()
    });
}

export const useCategoryTypesDropDownOptionsQuery = () => {
    return useQuery({
        queryKey: [CATEGORY_TYPES_KEY, 'dropDownOptions'],
        queryFn: () => categoryTypeService.getDropDownOptions()
    });
}