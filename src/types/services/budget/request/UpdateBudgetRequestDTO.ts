export interface UpdateBudgetRequestDTO {
    id: string;
    amount: number;
    startDate: string;
    endDate: string;
    categoryId: string;
    isActive: boolean;
}