export interface GetBudgetBasicInfoRequestDTO {
    description? : string;
    startDate?: string;
    endDate?: string;
    categoryId?: string;
    onlyActive?: boolean;
}