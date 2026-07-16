import { moneyMapClient } from "@/services/api/clients/moneyMapClient";
import type { AddCategoryDTO, GetCategoryBasicInfoRequestDTO, GetCategoryBasicInfoResponseDTO } from "@/types/services/category";
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

  async getCategoryBasicInfo(request: GetCategoryBasicInfoRequestDTO): Promise<GetCategoryBasicInfoResponseDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoriesBasicInfo`;
    return await moneyMapClient.get(endPoint, { params: request });  
  }
}