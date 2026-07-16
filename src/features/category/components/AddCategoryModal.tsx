import { useAlert } from '@/components/context/AlertContext';

import { useEffect, useState } from "react";
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useAddCategoryMutation } from '../hooks/useCategoryHooks';
import { useCategoryTypesDropDownOptionsQuery } from "@/features/category-type/hooks/useCategoryTypeHooks";

interface AddCategoryModalProps {
    onClose: () => void;
}

const AddCategoryModal = ({onClose}: AddCategoryModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryTypeId, setCategoryTypeId] = useState("");
  const { showAlert } = useAlert();

  const { data: categoryTypes = [], isError, error } = useCategoryTypesDropDownOptionsQuery();

  useEffect(() => {
    if (isError) {
      const errorMessage = getApiResponseMessageError(error);
      showAlert(errorMessage, "error");
    }
  }, [isError, error, showAlert]);

  const { mutate } = useAddCategoryMutation();

  const handleAdd = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) {
      showAlert("All fields are required", "info");
      return;
    }

    mutate({
      name: name,
      description: description,
      categoryTypeId: categoryTypeId
    }, 
    {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const validateInputs = () : boolean => {
    if (!name || !description || !categoryTypeId) {
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleAdd}>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-black">Add Category</h1>
        <div>
          <label className="text-black pr-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>

        <div>
          <label className="text-black pr-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>
        <div>
          <label className="text-black pr-2">Category Type</label>
          <select
            className="border border-gray-300 p-1 rounded mb-2 text-black"
            onChange={(e) => setCategoryTypeId(e.target.value)}
          >
            <option value="" className="text-black">
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
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default AddCategoryModal;