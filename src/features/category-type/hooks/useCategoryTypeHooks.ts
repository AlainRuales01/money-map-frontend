import { useQuery } from '@tanstack/react-query'
import { categoryTypeService } from '../services/categoryTypeService';

const CATEGORY_TYPES_KEY = 'categoryTypes' as const;

export const useCategoryTypesDropDownOptionsQuery = () => {
    return useQuery({
        queryKey: [CATEGORY_TYPES_KEY, 'basicInfo'],
        queryFn: () => categoryTypeService.getCategoryTypeDropDownOptions()
    });
}