export interface AddFinancialTransactionRequestDTO {
    description : string,
    date: string,
    amount: number,
    categoryId: string,
    financialResourceId: string,
    destinationFinancialResourceId?: string,
    createAssociatedDebt: boolean,
    dueDate?: string,
    paidDebtId?: string,
}