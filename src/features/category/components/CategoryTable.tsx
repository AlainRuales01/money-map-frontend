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