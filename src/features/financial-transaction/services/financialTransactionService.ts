import { moneyMapClient } from '@/services/api/clients/moneyMapClient';
import type {
  AddFinancialTransactionRequestDTO,
  FinancialTransactionBasicInfoResponseDTO,
  FinancialTransactionUpdateInfoResponseDTO,
  GetFinancialTransactionBasicInfoRequestDTO,
  GetFinancialTransactionUpdateInfoRequestDTO,
  UpdateFinancialTransactionRequestDTO,
} from '@/types/services/financial-transaction';

const BASE_URL = '/FinancialTransaction';

export const financialTransactionService = {
  async addFinancialTransaction(transaction: AddFinancialTransactionRequestDTO): Promise<void> {
    await moneyMapClient.post(`${BASE_URL}/AddFinancialTransaction`, transaction);
  },

  async updateFinancialTransaction(transaction: UpdateFinancialTransactionRequestDTO): Promise<void> {
    await moneyMapClient.put(`${BASE_URL}/UpdateFinancialTransaction`, transaction);
  },

  async getFinancialTransactionBasicInfo(
    request: GetFinancialTransactionBasicInfoRequestDTO,
  ): Promise<FinancialTransactionBasicInfoResponseDTO[]> {
    return await moneyMapClient.get(`${BASE_URL}/GetFinancialTransactionsBasicInfo`, { params: request });
  },

  async getFinancialTransactionUpdateInfo(
    request: GetFinancialTransactionUpdateInfoRequestDTO,
  ): Promise<FinancialTransactionUpdateInfoResponseDTO | null> {
    return await moneyMapClient.get(`${BASE_URL}/GetFinancialTransactionUpdateInfo`, { params: request });
  },
};