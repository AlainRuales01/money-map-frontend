import type { AddCatalogObjectDTO } from "../../common/AddCatalogObjectDTO";

export interface AddCategoryDTO extends AddCatalogObjectDTO {
    categoryTypeId: string;
}