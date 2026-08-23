export interface AddBudgetRequestDTO {
    description : string;
    amount : number;
    startDate : string;
    endDate : string;
    categoryId : string;
}