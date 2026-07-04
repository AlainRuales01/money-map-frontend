import type { AddCatalogObjectDTO } from '@/types/services/common/AddCatalogObjectDTO';

export interface AddCategoryDTO extends AddCatalogObjectDTO {
    categoryTypeId: string;
}