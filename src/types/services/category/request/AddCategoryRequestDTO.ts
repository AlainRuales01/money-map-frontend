import type { AddCatalogObjectDTO } from '@/types/services/common/AddCatalogObjectDTO';

export interface AddCategoryRequestDTO extends AddCatalogObjectDTO {
    categoryTypeId: string;
}