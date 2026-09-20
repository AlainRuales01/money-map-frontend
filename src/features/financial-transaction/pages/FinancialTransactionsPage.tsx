import { useEffect, useState } from "react";
import { useAlert } from "@/components/context/AlertContext";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useFinancialTransactionsBasicInfoQuery } from "../hooks/useFinancialTransactionHooks";
import FinancialTransactionTable from "../components/FinancialTransactionTable";
import ToolbarFinancialTransaction from "../components/ToolbarFinancialTransaction";

const FinancialTransactionsPage = () => {
  const [filters, setFilters] = useState({
    description: "",
    startDate: "",
    endDate: "",
    categoryId: "",
    financialResourceId: "",
  });
  
  const { showAlert } = useAlert();
  const query = useFinancialTransactionsBasicInfoQuery(filters);

  useEffect(() => {
    if (query.isError)
      showAlert(getApiResponseMessageError(query.error), "error");
  }, [query.isError, query.error, showAlert]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Financial Transactions</h1>
      <ToolbarFinancialTransaction
        onSearch={(
          description,
          startDate,
          endDate,
          categoryId,
          financialResourceId,
        ) =>
          setFilters({
            description,
            startDate,
            endDate,
            categoryId,
            financialResourceId,
          })
        }
      />
      <FinancialTransactionTable transactions={query.data ?? []} />
    </div>
  );
};

export default FinancialTransactionsPage;
