export interface AddFinancialTransactionRequestDTO {
    description : string,
    date: string,
    amount: number,
    categoryId: string,
    financialResourceId: string,
    destinationFinancialResourceId?: string
}