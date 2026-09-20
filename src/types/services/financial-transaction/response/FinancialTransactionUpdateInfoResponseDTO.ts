export interface FinancialTransactionUpdateInfoResponseDTO {
    id : string,
    description : string,
    date : string,
    amount : number,
    categoryTypeId : string,
    categoryId : string,
    financialResourceId : string,
    destinationFinancialResourceId : string
}