import type { UpdateCatalogObjectDTO } from '@/types/services/common/UpdateCatalogObjectDTO';

export interface UpdateCategoryRequestDTO extends UpdateCatalogObjectDTO {
    categoryTypeId: string;
}