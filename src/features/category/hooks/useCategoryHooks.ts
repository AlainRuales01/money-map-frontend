import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@featuresCategory/services/categoryService';
import type { AddCategoryDTO } from '@/types/services/category/request/AddCategoryDTO';
import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';

const CATEGORIES_KEY = 'categories' as const;

export const useCategoriesBasicInfoQuery = () => {
    return useQuery({
        queryKey: [CATEGORIES_KEY, 'basicInfo'],
        queryFn: () => categoryService.getCategoryBasicInfo()
    });
}

export const useAddCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    
    return useMutation({
        mutationKey: [CATEGORIES_KEY, 'addCategory'],
        mutationFn: (category: AddCategoryDTO) => categoryService.addCategory(category),
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
