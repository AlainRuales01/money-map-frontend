import type { DropdownOptionDTO } from '@/types/services/common/DropdownOptionDTO';
import { categoryTypeService } from '@featuresCategoryType/services/categoryTypeService';
import { categoryService } from '@featuresCategory/services/categoryService';

import { useEffect, useState } from "react";

const AddCategoryModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryTypes, setCategoryTypes] = useState<DropdownOptionDTO[]>([]);
  const [categoryTypeId, setCategoryTypeId] = useState("");

  useEffect(() => {
    const initialData = async () => {
      const result = await categoryTypeService.getCategoryTypeDropDownOptions();
      setCategoryTypes(result);
    };
    initialData();
  }, []);

  const handleAdd = async () => {
    await categoryService.addCategory({
      name: name,
      description: description,
      categoryTypeId: categoryTypeId,
    });
  };

  return (
    <form>
      <div>
        <h1 className="text-black">Add Category</h1>
        <div>
          <label className="text-black">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>

        <div>
          <label className="text-black">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>
        <div>
          <label className="text-black">Category Type</label>
          <select
            className="border border-gray-300 p-1 rounded mb-2 text-black"
            onChange={(e) => setCategoryTypeId(e.target.value)}
          >
            <option value="1" className="text-black">
              Select a Category Type
            </option>
            {categoryTypes.map((categoryType) => (
              <option
                key={categoryType.id}
                className="text-black"
                value={categoryType.id}
              >
                {categoryType.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => handleAdd()}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default AddCategoryModal;