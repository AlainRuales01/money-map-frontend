import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { budgetService } from '@featuresBudget/services/budgetService';
import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import type { AddBudgetRequestDTO, GetBudgetBasicInfoRequestDTO, GetBudgetUpdateInfoRequestDTO, UpdateBudgetRequestDTO } from '@/types/services/budget';

const BUDGETS_KEY = 'budgets' as const;

export const useBudgetsBasicInfoQuery = ({description, startDate, endDate, categoryId, onlyActive }: GetBudgetBasicInfoRequestDTO) => {
    return useQuery({
        queryKey: [BUDGETS_KEY, 'basicInfo', {description, startDate, endDate, categoryId, onlyActive }],
        queryFn: () => budgetService.getBudgetBasicInfo({ description, startDate, endDate, categoryId, onlyActive })
    });
}

export const useBudgetsUpdateInfoQuery = ({ id }: GetBudgetUpdateInfoRequestDTO) => {
    return useQuery({
        queryKey: [BUDGETS_KEY, 'updateInfo', { id }],
        queryFn: () => budgetService.getBudgetUpdateInfo({ id })
    });
}

export const useAddBudgetMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    
    return useMutation({
        mutationKey: [BUDGETS_KEY, 'addBudget'],
        mutationFn: (budget: AddBudgetRequestDTO) => budgetService.addBudget(budget),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BUDGETS_KEY, 'basicInfo'] });
            showAlert("Budget added successfully", "success");
        },
        onError: (error: unknown) => {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    });
}

export const useUpdateBudgetMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    
    return useMutation({
        mutationKey: [BUDGETS_KEY, 'updateBudget'],
        mutationFn: (budget: UpdateBudgetRequestDTO) => budgetService.updateBudget(budget),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: [BUDGETS_KEY, 'basicInfo'] });
            queryClient.invalidateQueries({ queryKey: [BUDGETS_KEY, 'updateInfo', { id: variables.id }], exact: true });
            showAlert("Budget updated successfully", "success");
        },
        onError: (error: unknown) => {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    });
}
