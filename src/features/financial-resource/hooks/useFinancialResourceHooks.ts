import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import type { GetFinancialResourceModifyInfoRequestDTO } from '@/types/services/financial-resource/request/GetFinancialResourceModifyInfoRequestDTO';
import { financialResourceService } from '@featuresFinancialResource/services/financialResourceService';
import type { GetFinancialResourceBasicInfoRequestDTO } from '@/types/services/financial-resource/request/GetFinancialResourceBasicInfoRequestDTO';
import type { AddFinancialResourceRequestDTO, UpdateFinancialResourceRequestDTO } from '@/types/services/financial-resource';


const FINANCIAL_RESOURCES_KEY = 'financialResources' as const;

// SE DEBE CAMBIAR PARA QUE SIEMPRE SE INVALIDE A BUSCAR PORQUE EL MONTO PUEDE CAMBIAR A CADA RATO
export const useFinancialResourcesBasicInfoQuery = ({ financialResourceName }: GetFinancialResourceBasicInfoRequestDTO) => {
    return useQuery({
        queryKey: [FINANCIAL_RESOURCES_KEY, 'basicInfo', { financialResourceName }],
        queryFn: () => financialResourceService.getFinancialResourceBasicInfo({ financialResourceName })
    });
}

export const useFinancialResourcesModifyInfoQuery = ({ id }: GetFinancialResourceModifyInfoRequestDTO) => {
    return useQuery({
        queryKey: [FINANCIAL_RESOURCES_KEY, 'modifyInfo', { id }],
        queryFn: () => financialResourceService.getFinancialResourceModifyInfo({ id })
    });
}

export const useAddCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    
    return useMutation({
        mutationKey: [FINANCIAL_RESOURCES_KEY, 'addFinancialResource'],
        mutationFn: (financialResource: AddFinancialResourceRequestDTO) => financialResourceService.addFinancialResource(financialResource),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FINANCIAL_RESOURCES_KEY, 'basicInfo'] });
            showAlert("Financial resource added successfully", "success");
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
        mutationKey: [FINANCIAL_RESOURCES_KEY, 'updateFinancialResource'],
        mutationFn: (financialResource: UpdateFinancialResourceRequestDTO) => financialResourceService.updateFinancialResource(financialResource),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: [FINANCIAL_RESOURCES_KEY, 'basicInfo'] });
            queryClient.invalidateQueries({ queryKey: [FINANCIAL_RESOURCES_KEY, 'modifyInfo', { id: variables.id }], exact: true });
            showAlert("Financial resource updated successfully", "success");
        },
        onError: (error: unknown) => {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    });
}
