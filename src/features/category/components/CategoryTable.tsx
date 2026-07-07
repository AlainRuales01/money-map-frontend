import Table from '@/components/common/Table';
import type { GetCategoryBasicInfoDTO } from '@/types/services/category/response/GetCategoryBasicInfoDTO';


export interface CategoryTableProps {
  categories: GetCategoryBasicInfoDTO[];
}

const COLUMNS = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'categoryTypeId', label: 'Category Type ID' },
];

const CategoryTable = ({ categories }: CategoryTableProps) => {
  return (
    <div>
      <Table
        columns={COLUMNS}
        data={categories}
      />
    </div>
  );
}

export default CategoryTable