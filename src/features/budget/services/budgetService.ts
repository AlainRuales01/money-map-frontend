import { moneyMapClient } from "@/services/api/clients/moneyMapClient";
import type { AddBudgetRequestDTO, BudgetBasicInfoResponseDTO, BudgetUpdateInfoResponseDTO, GetBudgetBasicInfoRequestDTO, GetBudgetUpdateInfoRequestDTO, UpdateBudgetRequestDTO } from "@/types/services/budget";


const BASE_URL = '/Budget';

export const budgetService = {
  async addBudget(budget: AddBudgetRequestDTO): Promise<void> {
    const endPoint = `${BASE_URL}/AddBudget`;
    await moneyMapClient.post(endPoint, budget);
  },
  
  async updateBudget(budget: UpdateBudgetRequestDTO): Promise<void> {
    const endPoint = `${BASE_URL}/UpdateBudget`;
    await moneyMapClient.put(endPoint, budget);
  },

  async getBudgetBasicInfo(request: GetBudgetBasicInfoRequestDTO): Promise<BudgetBasicInfoResponseDTO[]> {
    const endPoint = `${BASE_URL}/GetBudgetsBasicInfo`;
    return await moneyMapClient.get(endPoint, { params: request });  
  },

  async getBudgetUpdateInfo(request: GetBudgetUpdateInfoRequestDTO): Promise<BudgetUpdateInfoResponseDTO | null> {
    const endPoint = `${BASE_URL}/GetBudgetUpdateInfo`;
    return await moneyMapClient.get(endPoint, { params: request });  
  }
}