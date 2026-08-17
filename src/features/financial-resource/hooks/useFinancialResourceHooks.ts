import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { financialResourceService } from '@featuresFinancialResource/services/financialResourceService';
import type { GetFinancialResourceBasicInfoRequestDTO } from '@/types/services/financial-resource/request/GetFinancialResourceBasicInfoRequestDTO';
import type { AddFinancialResourceRequestDTO, GetFinancialResourceUpdateInfoRequestDTO, UpdateFinancialResourceRequestDTO } from '@/types/services/financial-resource';


const FINANCIAL_RESOURCES_KEY = 'financialResources' as const;

// SE DEBE CAMBIAR PARA QUE SIEMPRE SE INVALIDE A BUSCAR PORQUE EL MONTO PUEDE CAMBIAR A CADA RATO
export const useFinancialResourcesBasicInfoQuery = ({ financialResourceName, onlyActive }: GetFinancialResourceBasicInfoRequestDTO) => {
    return useQuery({
        queryKey: [FINANCIAL_RESOURCES_KEY, 'basicInfo', { financialResourceName, onlyActive }],
        queryFn: () => financialResourceService.getFinancialResourceBasicInfo({ financialResourceName, onlyActive })
    });
}

export const useFinancialResourcesUpdateInfoQuery = ({ id }: GetFinancialResourceUpdateInfoRequestDTO) => {
    return useQuery({
        queryKey: [FINANCIAL_RESOURCES_KEY, 'updateInfo', { id }],
        queryFn: () => financialResourceService.getFinancialResourceUpdateInfo({ id })
    });
}

export const useAddFinancialResourceMutation = () => {
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

export const useUpdateFinancialResourceMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    
    return useMutation({
        mutationKey: [FINANCIAL_RESOURCES_KEY, 'updateFinancialResource'],
        mutationFn: (financialResource: UpdateFinancialResourceRequestDTO) => financialResourceService.updateFinancialResource(financialResource),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: [FINANCIAL_RESOURCES_KEY, 'basicInfo'] });
            queryClient.invalidateQueries({ queryKey: [FINANCIAL_RESOURCES_KEY, 'updateInfo', { id: variables.id }], exact: true });
            showAlert("Financial resource updated successfully", "success");
        },
        onError: (error: unknown) => {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    });
}
