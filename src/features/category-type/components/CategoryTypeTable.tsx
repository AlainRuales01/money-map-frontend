// import { useEffect, useState } from 'react';
// import Table from '@/components/common/Table';
// import type { DropdownOptionDTO } from '@/types/services/common/DropdownOptionDTO';
// import { categoryTypeService } from '@featuresCategoryType/services/categoryTypeService';

// const CategoryTypeTable = () => {
//     const [categoryTypes, setCategoryTypes] = useState<DropdownOptionDTO[]>([]);

//   const columns = [
//     { key: 'name', label: 'Name' }
//   ];

//   useEffect(() => {
//     const fetchCategoryTypes = async () => {
//       const data = await categoryTypeService.getCategoryTypeDropDownOptions();
//       setCategoryTypes(data);
//     }

//     fetchCategoryTypes();
//   }, []);

//   return (
//     <div>
//       <Table
//         columns={columns}
//         data={categoryTypes}
//       />
//     </div>
//   );
// }

// export default CategoryTypeTable