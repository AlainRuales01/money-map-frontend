import { moneyMapClient } from "@/services/api/clients/moneyMapClient";

import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";
import type { AddFinancialResourceRequestDTO, GetFinancialResourceBasicInfoRequestDTO, FinancialResourceBasicInfoResponseDTO, GetFinancialResourceUpdateInfoRequestDTO, FinancialResourceUpdateInfoResponseDTO, UpdateFinancialResourceRequestDTO } from "@/types/services/financial-resource";

const BASE_URL = '/FinancialResource';

export const financialResourceService = {
  async addFinancialResource(financialResource: AddFinancialResourceRequestDTO): Promise<void> {
    const endPoint = `${BASE_URL}/AddFinancialResource`;
    await moneyMapClient.post(endPoint, financialResource);
  },
  
  async updateFinancialResource(financialResource: UpdateFinancialResourceRequestDTO): Promise<void> {
    const endPoint = `${BASE_URL}/UpdateFinancialResource`;
    await moneyMapClient.put(endPoint, financialResource);
  },

  async getFinancialResourceDropDownOptions(): Promise<DropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetFinancialResourceDropDownOptions`;
    return await moneyMapClient.get(endPoint);
    
  },

  async getFinancialResourceBasicInfo(request: GetFinancialResourceBasicInfoRequestDTO): Promise<FinancialResourceBasicInfoResponseDTO[]> {
    const endPoint = `${BASE_URL}/GetFinancialResourceBasicInfo`;
    return await moneyMapClient.get(endPoint, { params: request });  
  },

  async getFinancialResourceUpdateInfo(request: GetFinancialResourceUpdateInfoRequestDTO): Promise<FinancialResourceUpdateInfoResponseDTO | null> {
    const endPoint = `${BASE_URL}/GetFinancialResourceUpdateInfo`;
    return await moneyMapClient.get(endPoint, { params: request });  
  }
}