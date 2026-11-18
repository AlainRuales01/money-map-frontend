import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";

export interface DebtDropdownOptionDTO extends DropdownOptionDTO {
  pendingAmount: number;
}
