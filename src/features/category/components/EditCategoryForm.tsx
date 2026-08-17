import { useUpdateCategoryMutation } from '../hooks/useCategoryHooks';
import { useAlert } from '@/components/context/AlertContext';
import { useCategoryTypesDropDownOptionsQuery } from "@featuresCategoryType/hooks/useCategoryTypeHooks";
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useEffect, useState } from 'react';

interface EditCategoryFormProps {
    id: string;
    name : string;
    description : string;
    typeId : string;
    isActive : boolean;
    onClose: () => void;
}

const EditCategoryForm = ({id, name, description, typeId, isActive, onClose}: EditCategoryFormProps) => {

    const [categoryId] = useState(id || "");
    const [categoryName, setCategoryName] = useState(name || "");
    const [categoryDescription, setCategoryDescription] = useState(description || "");
    const [categoryTypeId, setCategoryTypeId] = useState(typeId || "");
    const [categoryIsActive, setCategoryIsActive] = useState(isActive || false);

    const { data: categoryTypes = [], isError, error } = useCategoryTypesDropDownOptionsQuery();
    
    const { mutate } = useUpdateCategoryMutation();
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
                id: categoryId,
                name: categoryName,
                description: categoryDescription,
                categoryTypeId: categoryTypeId,
                isActive: categoryIsActive
            }, 
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
    };

    const validateInputs = () : boolean => {
        if (!categoryName || !categoryDescription || !categoryTypeId) {
            return false;
        }
        return true;
    };

    return (
        <form onSubmit={handleAdd}>
            <div className="flex flex-col gap-2 p-4">
                <div>
                    <label htmlFor="categoryName" className="text-black pr-2">Name</label>
                    <input
                    id="categoryName"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Name"
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="text-black pr-2">Description</label>
                    <input
                    id="description"
                    type="text"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="Description"
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="categoryType" className="text-black pr-2">Category Type</label>
                    <select
                    id="categoryType"
                    value={categoryTypeId}
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
                <div>
                    <label htmlFor="isActive" className="text-black pr-2">Active</label>
                    <input
                        id="isActive"
                        type="checkbox"
                        checked={categoryIsActive}
                        onChange={(e) => setCategoryIsActive(e.target.checked)}
                    />
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