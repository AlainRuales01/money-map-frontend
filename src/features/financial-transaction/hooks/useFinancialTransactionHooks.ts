import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import type {
  AddFinancialTransactionRequestDTO,
  GetFinancialTransactionBasicInfoRequestDTO,
  GetFinancialTransactionUpdateInfoRequestDTO,
  UpdateFinancialTransactionRequestDTO,
} from '@/types/services/financial-transaction';
import { financialTransactionService } from '../services/financialTransactionService';
import { MONEY_MAP_KEY_CONSTANTS } from '@/constants/moneyMapKeys';

const TRANSACTIONS_KEY = MONEY_MAP_KEY_CONSTANTS.FINANCIAL_TRANSACTION;
export const useFinancialTransactionsBasicInfoQuery = (request: GetFinancialTransactionBasicInfoRequestDTO) =>
  useQuery({
    queryKey: [TRANSACTIONS_KEY, 'basicInfo', request],
    queryFn: () => financialTransactionService.getFinancialTransactionBasicInfo(request),
  });

export const useFinancialTransactionUpdateInfoQuery = ({ id }: GetFinancialTransactionUpdateInfoRequestDTO) =>
  useQuery({
    queryKey: [TRANSACTIONS_KEY, 'updateInfo', { id }],
    queryFn: () => financialTransactionService.getFinancialTransactionUpdateInfo({ id }),
  });

export const useAddFinancialTransactionMutation = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: [TRANSACTIONS_KEY, 'add'],
    mutationFn: (transaction: AddFinancialTransactionRequestDTO) =>
      financialTransactionService.addFinancialTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_KEY, 'basicInfo'] });
      showAlert('Financial transaction added successfully', 'success');
    },
    onError: (error: unknown) => showAlert(getApiResponseMessageError(error), 'error'),
  });
};

export const useUpdateFinancialTransactionMutation = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: [TRANSACTIONS_KEY, 'update'],
    mutationFn: (transaction: UpdateFinancialTransactionRequestDTO) =>
      financialTransactionService.updateFinancialTransaction(transaction),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_KEY, 'basicInfo'] });
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_KEY, 'updateInfo', { id: variables.id }], exact: true });
      showAlert('Financial transaction updated successfully', 'success');
    },
    onError: (error: unknown) => showAlert(getApiResponseMessageError(error), 'error'),
  });
};
