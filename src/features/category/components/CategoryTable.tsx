import Table from '@/components/common/Table';
import type { GetCategoryBasicInfoResponseDTO } from "@/types/services/category";
import EditCategoryButton from './EditCategoryButton';


export interface CategoryTableProps {
  categories: GetCategoryBasicInfoResponseDTO[];
}

const COLUMNS = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'categoryTypeName', label: 'Category Type' },
    { key: 'isActive', label: 'State', render: (value: unknown) => ( value === true ? <span className='"inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20"'>Active</span> : <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-500/20">Inactive</span>) },
];

const CategoryTable = ({ categories }: CategoryTableProps) => {
  return (
    <div>
      <Table
        columns={COLUMNS}
        data={categories}
        actionComponent={(row) => (
          <EditCategoryButton id={row.id} />
        )}
      />
    </div>
  );
}

export default CategoryTable