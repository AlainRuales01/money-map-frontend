import { moneyMapClient } from '@/services/api/clients/moneyMapClient';
import type { AddCategoryTypeDTO, CategoryTypeDropdownOptionDTO } from '@/types/services/category-type';

const BASE_URL = '/CategoryType';

export const categoryTypeService = {
  async addCategoryType(categoryType: AddCategoryTypeDTO): Promise<void> {
    const endPoint = `${BASE_URL}/AddCategoryType`;
    await moneyMapClient.post(endPoint, categoryType);
  },

  async getAddableCategoryTypeDropDownOptions(): Promise<CategoryTypeDropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetAddableCategoryTypeDropDownOptions`;
    return await moneyMapClient.get(endPoint);
  },

  async getDropDownOptions(): Promise<CategoryTypeDropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoryTypeDropDownOptions`;
    return await moneyMapClient.get(endPoint);
  }
}