export interface FinancialTransactionBasicInfoResponseDTO {
    id : string,
    description : string,
    date : string,
    amount : number,
    categoryName : string,
    financialResourceName : string,
    destinationFinancialResourceName : string
}