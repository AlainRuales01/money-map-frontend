import { useAddCategoryMutation } from '../hooks/useCategoryHooks';
import { useAlert } from '@/components/context/AlertContext';
import { useCategoryTypesDropDownOptionsQuery } from "@featuresCategoryType/hooks/useCategoryTypeHooks";
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useEffect, useState } from 'react';

interface EditCategoryFormProps {
    name : string;
    description : string;
    typeId : string;
    onClose: () => void;
}

const EditCategoryForm = ({name, description, typeId, onClose}: EditCategoryFormProps) => {

    const [categoryName, setCategoryName] = useState(name || "");
    const [categoryDescription, setCategoryDescription] = useState(description || "");
    const [categoryTypeId, setCategoryTypeId] = useState(typeId || "");

    const { data: categoryTypes = [], isError, error } = useCategoryTypesDropDownOptionsQuery();
    
    const { mutate } = useAddCategoryMutation();
    const { showAlert } = useAlert();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    }, [isError, error, showAlert]);

    const handleAdd = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInputs()) {
            showAlert("All fields are required", "info");
            return;
        }

        mutate(
            {
                name: categoryName,
                description: categoryDescription,
                categoryTypeId: categoryTypeId
            }, 
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
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
            <h1 className="text-black">Edit Category</h1>
            <div>
                <label className="text-black pr-2">Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Name"
                className="border border-gray-300 p-1 rounded mb-2 text-black"
                />
            </div>

            <div>
                <label className="text-black pr-2">Description</label>
                <input
                type="text"
                value={description}
                onChange={(e) => setCategoryDescription(e.target.value)}
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
                Save Changes
            </button>
            </div>
        </form>
    );
}

export default EditCategoryForm;