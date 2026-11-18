import { useQuery } from "@tanstack/react-query";
import { debtService } from "../services/debtService";
import { MONEY_MAP_KEY_CONSTANTS } from "@/constants/moneyMapKeys";
import type { GetNotPaidDebtDropDownOptionsRequestDTO } from "@/types/services/debt/request/GetNotPaidDebtDropDownOptionsRequestDTO";

const DEBTS_KEY = MONEY_MAP_KEY_CONSTANTS.DEBTS;

export const useNotPaidDebtDropDownOptionsQuery = (request: GetNotPaidDebtDropDownOptionsRequestDTO, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [DEBTS_KEY, "notPaidDebtDropDownOptions", request.categoryTypeId],
    queryFn: () => debtService.getNotPaidDebtDropDownOptions(request),
    enabled: options?.enabled,
  });
};

export const useDebtDropDownOptionsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [DEBTS_KEY, "dropDownOptions"],
    queryFn: () => debtService.getDebtDropDownOptions(),
    enabled: options?.enabled,
  });
};
