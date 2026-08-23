import { useAlert } from '@/components/context/AlertContext';

import { useEffect, useState } from "react";
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useCategoriesDropDownOptionsQuery } from "@/features/category/hooks/useCategoryHooks";
import { useAddBudgetMutation } from '../hooks/useBudgetHooks';

interface AddBudgetModalProps {
    onClose: () => void;
}

const AddBudgetModal = ({onClose}: AddBudgetModalProps) => {
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { showAlert } = useAlert();

  const { data: categories = [], isError, error } = useCategoriesDropDownOptionsQuery();

  useEffect(() => {
    if (isError) {
      const errorMessage = getApiResponseMessageError(error);
      showAlert(errorMessage, "error");
    }
  }, [isError, error, showAlert]);

  const { mutate } = useAddBudgetMutation();

  const handleAdd = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) {
      showAlert("All fields are required", "info");
      return;
    }

    mutate({
      amount: amount,
      startDate: startDate,
      endDate: endDate,
      categoryId: categoryId
    }, 
    {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const validateInputs = () : boolean => {
    if (!amount || !startDate || !endDate || !categoryId) {
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
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            placeholder="Amount"
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="text-black pr-2">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="text-black pr-2">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="category" className="text-black pr-2">Category</label>
          <select
            id="category"
            className="border border-gray-300 p-1 rounded mb-2 text-black"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" className="text-black">
              Select a Category
            </option>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddBudgetModal;