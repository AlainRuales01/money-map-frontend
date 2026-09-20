import Table from "@/components/common/Table";
import type { FinancialTransactionBasicInfoResponseDTO } from "@/types/services/financial-transaction";
import EditFinancialTransactionButton from "./EditFinancialTransactionButton";

interface FinancialTransactionTableProps {
  transactions: FinancialTransactionBasicInfoResponseDTO[];
}

const COLUMNS = [
  { key: "date", label: "Date" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  { key: "categoryName", label: "Category" },
  { key: "financialResourceName", label: "Source" },
  { key: "destinationFinancialResourceName", label: "Destination" },
];

const FinancialTransactionTable = ({
  transactions,
}: FinancialTransactionTableProps) => (
  <Table
    columns={COLUMNS}
    data={transactions}
    actionComponent={(row) => <EditFinancialTransactionButton id={row.id} />}
    getRowKey={(row) => row.id}
  />
);

export default FinancialTransactionTable;
