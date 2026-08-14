import Table from '@/components/common/Table';

import EditFinancialResourceButton from './EditFinancialResourceButton';
import type { GetFinancialResourceBasicInfoResponseDTO } from '@/types/services/financial-resource/response/GetFinancialResourceBasicInfoResponseDTO';


export interface FinancialResourceTableProps {
  financialResources: GetFinancialResourceBasicInfoResponseDTO[];
}

const COLUMNS = [
    { key: 'name', label: 'Name' }
];

const FinancialResourceTable = ({ financialResources: categories }: FinancialResourceTableProps) => {
  return (
    <div>
      <Table
        columns={COLUMNS}
        data={categories}
        actionComponent={(row) => (
          <EditFinancialResourceButton id={row.id} />
        )}
      />
    </div>
  );
}

export default FinancialResourceTable;