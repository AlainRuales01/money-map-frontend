import AddFinancialTransactionButton from "./AddFinancialTransactionButton";
import FilterFinancialTransactions from "./FilterFinancialTransactions";

interface ToolbarFinancialTransactionProps {
  onSearch: (
    description: string,
    startDate: string,
    endDate: string,
    categoryId: string,
    financialResourceId: string,
  ) => void;
}

const ToolbarFinancialTransaction = ({
  onSearch,
}: ToolbarFinancialTransactionProps) => (
  <div className="border-gray-300 py-4 justify-between flex gap-4">
    <FilterFinancialTransactions onSearch={onSearch} />
    <AddFinancialTransactionButton />
  </div>
);

export default ToolbarFinancialTransaction;
