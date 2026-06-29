import { useEffect, useState } from 'react';
import Table from '../../../components/common/Table';
import type { DropdownOptionDTO } from '../../../types/services/common/DropdownOptionDTO';
import { categoryTypeService } from '../services/categoryTypeService';

const CategoryTypesPage = () => {
  const [categoryTypes, setCategoryTypes] = useState<DropdownOptionDTO[]>([]);

  const columns = [
    { key: 'name', label: 'Name' }
  ];

  useEffect(() => {
    // Fetch category types from an API or service
    const fetchCategoryTypes = async () => {
      const data = await categoryTypeService.getCategoryTypeDropDownOptions();
      setCategoryTypes(data);
    }

    fetchCategoryTypes();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={categoryTypes}
      />
    </div>
  );
};

export default CategoryTypesPage;