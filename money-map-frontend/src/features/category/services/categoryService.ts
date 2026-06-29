import { moneyMapClient } from "../../../services/api/clients/moneyMapClient";
import type { AddCategoryDTO } from "../../../types/services/category/AddCategoryDTO";
import type { DropdownOptionDTO } from "../../../types/services/common/DropdownOptionDTO";

const BASE_URL = '/Category';

export const categoryTypeService = {
  async addCategoryType(category: AddCategoryDTO): Promise<void> {
    const endPoint = `${BASE_URL}/AddCategory`;
    await moneyMapClient.post(endPoint, category);
  },

  async getCategoryTypeDropDownOptions(): Promise<DropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoryDropDownOptions`;
    const response = await moneyMapClient.get(endPoint);
    return response.data.data;
  }
}