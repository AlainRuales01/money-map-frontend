import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";

export interface CategoryDropdownOptionDTO extends DropdownOptionDTO {
  categoryTypeId: string;
}
