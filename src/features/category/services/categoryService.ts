import { moneyMapClient } from "@/services/api/clients/moneyMapClient";
import type { AddCategoryRequestDTO, GetCategoryBasicInfoRequestDTO, CategoryBasicInfoResponseDTO, GetCategoryUpdateInfoRequestDTO, CategoryUpdateInfoResponseDTO } from "@/types/services/category";
import type { UpdateCategoryRequestDTO } from "@/types/services/category/request/UpdateCategoryRequestDTO";
import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";

const BASE_URL = '/Category';

export const categoryService = {
  async addCategory(category: AddCategoryRequestDTO): Promise<void> {
    const endPoint = `${BASE_URL}/AddCategory`;
    await moneyMapClient.post(endPoint, category);
  },
  
  async updateCategory(category: UpdateCategoryRequestDTO): Promise<void> {
    const endPoint = `${BASE_URL}/UpdateCategory`;
    await moneyMapClient.put(endPoint, category);
  },

  async getCategoryTypeDropDownOptions(): Promise<DropdownOptionDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoryDropDownOptions`;
    return await moneyMapClient.get(endPoint);
    
  },

  async getCategoryBasicInfo(request: GetCategoryBasicInfoRequestDTO): Promise<CategoryBasicInfoResponseDTO[]> {
    const endPoint = `${BASE_URL}/GetCategoriesBasicInfo`;
    return await moneyMapClient.get(endPoint, { params: request });  
  },

  async getCategoryUpdateInfo(request: GetCategoryUpdateInfoRequestDTO): Promise<CategoryUpdateInfoResponseDTO | null> {
    const endPoint = `${BASE_URL}/GetCategoryUpdateInfo`;
    return await moneyMapClient.get(endPoint, { params: request });  
  }
}