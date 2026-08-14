import { useAlert } from '@/components/context/AlertContext';

import { useState } from "react";
import { useAddFinancialResourceMutation } from '../hooks/useFinancialResourceHooks';

interface AddFinancialResourceModalProps {
    onClose: () => void;
}

const AddFinancialResourceModal = ({onClose}: AddFinancialResourceModalProps) => {
  const [name, setName] = useState("");
  const { showAlert } = useAlert();

  const { mutate } = useAddFinancialResourceMutation();

  const handleAdd = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) {
      showAlert("All fields are required", "info");
      return;
    }

    mutate({
      name: name
    }, 
    {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const validateInputs = () : boolean => {
    if (!name) {
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleAdd}>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-black">Add Financial Resource</h1>
        <div>
          <label htmlFor="financialResourceName" className="text-black pr-2">Name</label>
          <input
            id="financialResourceName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
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

export default AddFinancialResourceModal;