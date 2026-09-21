import { useEffect, useState } from "react";
import { useAlert } from "@/components/context/AlertContext";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useFinancialTransactionsBasicInfoQuery } from "../hooks/useFinancialTransactionHooks";
import FinancialTransactionTable from "../components/FinancialTransactionTable";
import ToolbarFinancialTransaction from "../components/ToolbarFinancialTransaction";

import type { GetFinancialTransactionBasicInfoRequestDTO } from "@/types/services/financial-transaction";

const FinancialTransactionsPage = () => {
  const [filters, setFilters] = useState<GetFinancialTransactionBasicInfoRequestDTO>({
    description: "",
    startDate: "",
    endDate: "",
    categoryId: "",
    financialResourceId: "",
    destinationFinancialResourceId: "",
    categoryTypeId: "",
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
          destinationFinancialResourceId,
          categoryTypeId,
        ) =>
          setFilters({
            description: description || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            categoryId: categoryId || undefined,
            financialResourceId: financialResourceId || undefined,
            destinationFinancialResourceId: destinationFinancialResourceId || undefined,
            categoryTypeId: categoryTypeId || undefined,
          })
        }
      />
      <FinancialTransactionTable transactions={query.data ?? []} />
    </div>
  );
};

export default FinancialTransactionsPage;
