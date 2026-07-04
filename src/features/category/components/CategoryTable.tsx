import { useEffect, useState } from 'react';
import Table from '@/components/common/Table';
import { categoryService } from '@featuresCategory/services/categoryService';
import type { GetCategoryBasicInfoDTO } from '@/types/services/category/response/GetCategoryBasicInfoDTO';

const CategoryTable = () => {
    const [categories, setCategories] = useState<GetCategoryBasicInfoDTO[]>([]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'categoryTypeId', label: 'Category Type ID' },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await categoryService.getCategoryBasicInfo();
      setCategories(data);
    }

    fetchCategory();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={categories}
      />
    </div>
  );
}

export default CategoryTable