import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@featuresCategory/services/categoryService';
import type { AddCategoryRequestDTO } from '@/types/services/category/request/AddCategoryRequestDTO';
import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import type { GetCategoryBasicInfoRequestDTO, GetCategoryModifyInfoRequestDTO } from '@/types/services/category';

const CATEGORIES_KEY = 'categories' as const;

export const useCategoriesBasicInfoQuery = ({ categoryName, categoryTypeId }: GetCategoryBasicInfoRequestDTO) => {
    return useQuery({
        queryKey: [CATEGORIES_KEY, 'basicInfo', { categoryName, categoryTypeId }],
        queryFn: () => categoryService.getCategoryBasicInfo({ categoryName, categoryTypeId })
    });
}

export const useCategoriesModifyInfoQuery = ({ id }: GetCategoryModifyInfoRequestDTO) => {
    return useQuery({
        queryKey: [CATEGORIES_KEY, 'modifyInfo', { id }],
        queryFn: () => categoryService.getCategoryModifyInfo({ id })
    });
}

export const useAddCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    
    return useMutation({
        mutationKey: [CATEGORIES_KEY, 'addCategory'],
        mutationFn: (category: AddCategoryRequestDTO) => categoryService.addCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY, 'basicInfo'] });
            showAlert("Category added successfully", "success");
        },
        onError: (error: unknown) => {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    });
}
