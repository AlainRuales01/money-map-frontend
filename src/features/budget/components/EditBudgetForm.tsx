import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useEffect, useState } from 'react';
import { useUpdateBudgetMutation } from '../hooks/useBudgetHooks';
import { useCategoriesDropDownOptionsQuery } from '@/features/category/hooks/useCategoryHooks';

interface EditBudgetFormProps {
    id: string;
    amount: number;
    startDate: string;
    endDate: string;
    categoryId: string;
    isActive: boolean;
    onClose: () => void;
}

const EditBudgetForm = ({id, amount, startDate, endDate, categoryId, isActive, onClose}: EditBudgetFormProps) => {

    const [budgetId] = useState(id || "");
    const [budgetAmount, setBudgetAmount] = useState(amount || 0);
    const [budgetStartDate, setBudgetStartDate] = useState(startDate || "");
    const [budgetEndDate, setBudgetEndDate] = useState(endDate || "");
    const [budgetCategoryId, setBudgetCategoryId] = useState(categoryId || "");
    const [budgetIsActive, setBudgetIsActive] = useState(isActive || false);

    const { data: categories = [], isError, error } = useCategoriesDropDownOptionsQuery();
    
    const { mutate } = useUpdateBudgetMutation();
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
                id: budgetId,
                amount: budgetAmount,
                startDate: budgetStartDate,
                endDate: budgetEndDate,
                categoryId: budgetCategoryId,
                isActive: budgetIsActive
            }, 
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
    };

    const validateInputs = () : boolean => {
        if (!budgetAmount || !budgetStartDate || !budgetEndDate || !budgetCategoryId) {
            return false;
        }
        return true;
    };

    return (
        <form onSubmit={handleAdd}>
            <div className="flex flex-col gap-2 p-4">
                <div>
                    <label htmlFor="amount" className="text-black pr-2">Amount</label>
                    <input
                    id="amount"
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(parseFloat(e.target.value) || 0)}
                    placeholder="Amount"
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="startDate" className="text-black pr-2">Start Date</label>
                    <input
                    id="startDate"
                    type="date"
                    value={budgetStartDate}
                    onChange={(e) => setBudgetStartDate(e.target.value)}
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="text-black pr-2">End Date</label>
                    <input
                    id="endDate"
                    type="date"
                    value={budgetEndDate}
                    onChange={(e) => setBudgetEndDate(e.target.value)}
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="text-black pr-2">Category</label>
                    <select
                    id="category"
                    value={budgetCategoryId}
                    className="border border-gray-300 p-1 rounded mb-2 text-black"
                    onChange={(e) => setBudgetCategoryId(e.target.value)}
                    >
                    {categories.map((category) => (
                        <option
                        key={category.id}
                        className="text-black"
                        value={category.id}
                        >
                        {category.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="isActive" className="text-black pr-2">Active</label>
                    <input
                        id="isActive"
                        type="checkbox"
                        checked={budgetIsActive}
                        onChange={(e) => setBudgetIsActive(e.target.checked)}
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

export default EditBudgetForm;