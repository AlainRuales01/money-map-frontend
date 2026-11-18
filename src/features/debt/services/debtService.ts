import { moneyMapClient } from "@/services/api/clients/moneyMapClient";
import type { DebtDropdownOptionDTO, GetNotPaidDebtDropDownOptionsRequestDTO } from "@/types/services/debt";
import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";

const BASE_URL = "/Debt";

export const debtService = {
  async getNotPaidDebtDropDownOptions(request: GetNotPaidDebtDropDownOptionsRequestDTO): Promise<DebtDropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetNotPaidDebtDropDownOptions`;
    return await moneyMapClient.get(endPoint, { params: request });
  },

  async getDebtDropDownOptions(): Promise<DropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetDebtDropDownOptions`;
    return await moneyMapClient.get(endPoint);
  },
};
