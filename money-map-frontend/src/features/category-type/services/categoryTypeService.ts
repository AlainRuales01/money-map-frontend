import { moneyMapClient } from "../../../services/api/clients/moneyMapClient";
import type { AddCategoryTypeDTO } from "../../../types/services/category-type/AddCategoryTypeDTO";
import type { DropdownOptionDTO } from "../../../types/services/common/DropdownOptionDTO";

const BASE_URL = '/CategoryType';

export const categoryTypeService = {
  async addCategoryType(categoryType: AddCategoryTypeDTO): Promise<void> {
    const endPoint = `${BASE_URL}/AddCategoryType`;
    await moneyMapClient.post(endPoint, categoryType);
  },

  async getCategoryTypeDropDownOptions(): Promise<DropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoryTypeDropDownOptions`;
    const response = await moneyMapClient.get(endPoint);
    return response.data;
  }
}