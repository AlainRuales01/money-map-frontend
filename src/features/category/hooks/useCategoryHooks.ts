import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@featuresCategory/services/categoryService';
import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import type { AddCategoryRequestDTO, GetCategoryBasicInfoRequestDTO, GetCategoryUpdateInfoRequestDTO } from '@/types/services/category';
import type { UpdateCategoryRequestDTO } from '@/types/services/category/request/UpdateCategoryRequestDTO';
import { MONEY_MAP_KEY_CONSTANTS } from '@/constants/moneyMapKeys';

const CATEGORIES_KEY = MONEY_MAP_KEY_CONSTANTS.CATEGORY;

export const useCategoriesBasicInfoQuery = ({ categoryName, categoryTypeId, onlyActive }: GetCategoryBasicInfoRequestDTO) => {
    return useQuery({
        queryKey: [CATEGORIES_KEY, 'basicInfo', { categoryName, categoryTypeId, onlyActive }],
        queryFn: () => categoryService.getCategoryBasicInfo({ categoryName, categoryTypeId, onlyActive })
    });
}

export const useCategoriesUpdateInfoQuery = ({ id }: GetCategoryUpdateInfoRequestDTO) => {
    return useQuery({
        queryKey: [CATEGORIES_KEY, 'updateInfo', { id }],
        queryFn: () => categoryService.getCategoryUpdateInfo({ id })
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

export const useUpdateCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    
    return useMutation({
        mutationKey: [CATEGORIES_KEY, 'updateCategory'],
        mutationFn: (category: UpdateCategoryRequestDTO) => categoryService.updateCategory(category),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY, 'basicInfo'] });
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY, 'updateInfo', { id: variables.id }], exact: true });
            showAlert("Category updated successfully", "success");
        },
        onError: (error: unknown) => {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    });
}

export const useCategoriesDropDownOptionsQuery = () => {
    return useQuery({
        queryKey: [CATEGORIES_KEY, 'dropDownOptions'],
        queryFn: () => categoryService.getCategoryDropDownOptions()
    });
}
