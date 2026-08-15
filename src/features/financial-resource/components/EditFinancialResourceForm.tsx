import { useUpdateFinancialResourceMutation } from '@featuresFinancialResource/hooks/useFinancialResourceHooks';
import { useAlert } from '@/components/context/AlertContext';
import { useState } from 'react';

interface EditFinancialResourceFormProps {
    id: string;
    name : string;
    description : string;
    onClose: () => void;
}

const EditFinancialResourceForm = ({id, name, description, onClose}: EditFinancialResourceFormProps) => {

    const [financialResourceId] = useState(id || "");
    const [financialResourceName, setFinancialResourceName] = useState(name || "");
    const [financialResourceDescription, setFinancialResourceDescription] = useState(description || "");
    
    const { mutate } = useUpdateFinancialResourceMutation();
    const { showAlert } = useAlert();

    const handleAdd = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInputs()) {
            showAlert("All fields are required", "info");
            return;
        }

        mutate(
            {
                id: financialResourceId,
                name: financialResourceName,
                description: financialResourceDescription
            }, 
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
    };

    const validateInputs = () : boolean => {
        if (!financialResourceName || !financialResourceDescription) {
            return false;
        }
        return true;
    };

    return (
        <form onSubmit={handleAdd}>
            <div className="flex flex-col gap-2 p-4">
                <div>
                    <label htmlFor="financialResourceName" className="text-black pr-2">Name</label>
                    <input
                    id="financialResourceName"
                    type="text"
                    value={financialResourceName}
                    onChange={(e) => setFinancialResourceName(e.target.value)}
                    placeholder="Name"
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="text-black pr-2">Description</label>
                    <input
                    id="description"
                    type="text"
                    value={financialResourceDescription}
                    onChange={(e) => setFinancialResourceDescription(e.target.value)}
                    placeholder="Description"
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
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

export default EditFinancialResourceForm;