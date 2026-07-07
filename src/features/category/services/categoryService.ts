import { moneyMapClient } from "@/services/api/clients/moneyMapClient";
import type { AddCategoryDTO } from "@/types/services/category/request/AddCategoryDTO";
import type { GetCategoryBasicInfoDTO } from "@/types/services/category/response/GetCategoryBasicInfoDTO";
import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";

const BASE_URL = '/Category';

export const categoryService = {
  async addCategory(category: AddCategoryDTO): Promise<void> {
    const endPoint = `${BASE_URL}/AddCategory`;
    await moneyMapClient.post(endPoint, category);
  },

  async getCategoryTypeDropDownOptions(): Promise<DropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoryDropDownOptions`;
    return await moneyMapClient.get(endPoint);
    
  },

  async getCategoryBasicInfo(): Promise<GetCategoryBasicInfoDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoriesBasicInfo`;
    return await moneyMapClient.get(endPoint);  
  }
}