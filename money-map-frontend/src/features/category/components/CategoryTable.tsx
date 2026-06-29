import { useEffect, useState } from 'react';
import Table from '../../../components/common/Table';
import type { DropdownOptionDTO } from '../../../types/services/common/DropdownOptionDTO';
import { categoryTypeService } from '../services/categoryService';

const CategoryTable = () => {
    const [categories, setCategories] = useState<DropdownOptionDTO[]>([]);

  const columns = [
    { key: 'name', label: 'Name' }
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await categoryTypeService.getCategoryTypeDropDownOptions();
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