import Table from '@/components/common/Table';
import type { BudgetBasicInfoResponseDTO } from '@/types/services/budget';
import EditBudgetButton from '@/features/budget/components/EditBudgetButton';


export interface BudgetTableProps {
  budgets: BudgetBasicInfoResponseDTO[];
}

const COLUMNS = [
    { key: 'categoryName', label: 'Category' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'isActive', label: 'State', render: (value: unknown) => ( value === true ? <span className='"inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20"'>Active</span> : <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-500/20">Inactive</span>) },
];

const BudgetTable = ({ budgets }: BudgetTableProps) => {
  return (
    <div>
      <Table
        columns={COLUMNS}
        data={budgets}
        actionComponent={(row) => (
          <EditBudgetButton id={row.id} />
        )}
      />
    </div>
  );
}

export default BudgetTable