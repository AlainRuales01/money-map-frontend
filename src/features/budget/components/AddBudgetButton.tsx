import Modal from "@/components/common/Modal";

import { useState } from "react";
import AddBudgetModal from "./AddBudgetModal";

const AddBudgetButton = () => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div className="flex justify-end items-center p-2">
            <button 
                type="button"
                onClick={() => setShowModal(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Add Budget    
            </button>
            <Modal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Add Budget"
            >
                <AddBudgetModal
                    onClose={() => setShowModal(false)} 
                />
            </Modal>
        </div>
    );
}

export default AddBudgetButton;