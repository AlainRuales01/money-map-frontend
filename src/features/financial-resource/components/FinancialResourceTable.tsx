import Table from '@/components/common/Table';

import EditFinancialResourceButton from './EditFinancialResourceButton';
import type { GetFinancialResourceBasicInfoResponseDTO } from '@/types/services/financial-resource/response/GetFinancialResourceBasicInfoResponseDTO';


export interface FinancialResourceTableProps {
  financialResources: GetFinancialResourceBasicInfoResponseDTO[];
}

const COLUMNS = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount' },
    { key: 'isActive', label: 'State', render: (value: unknown) => (value === true ? <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">Active</span> : <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-500/20">Inactive</span>) },
];

const FinancialResourceTable = ({ financialResources }: FinancialResourceTableProps) => {
  return (
    <div>
      <Table
        columns={COLUMNS}
        data={financialResources}
        actionComponent={(row) => (
          <EditFinancialResourceButton id={row.id} />
        )}
      />
    </div>
  );
}

export default FinancialResourceTable;