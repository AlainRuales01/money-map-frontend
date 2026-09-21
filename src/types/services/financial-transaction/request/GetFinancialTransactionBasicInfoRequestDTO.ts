export interface GetFinancialTransactionBasicInfoRequestDTO {
    description? : string,
    startDate? : string,
    endDate? : string, 
    categoryId? : string,
    financialResourceId? : string,
    destinationFinancialResourceId? : string,
    categoryTypeId? : string
}