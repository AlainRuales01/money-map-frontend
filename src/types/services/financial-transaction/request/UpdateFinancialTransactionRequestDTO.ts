export interface UpdateFinancialTransactionRequestDTO {
    id : string,
    description : string
    date : string,
    amount : number,
    categoryId : string,
    financialResourceId : string,
    destinationFinancialResourceId? : string,
    isDeleted : boolean
}