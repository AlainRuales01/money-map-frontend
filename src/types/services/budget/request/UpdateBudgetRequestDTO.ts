export interface UpdateBudgetRequestDTO {
    id: string;
    description : string;
    amount: number;
    startDate: string;
    endDate: string;
    categoryId: string;
    isActive: boolean;
}