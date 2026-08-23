export interface GetBudgetBasicInfoRequestDTO {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
    onlyActive?: boolean;
}