import Modal from "@/components/common/Modal";

import { useState } from "react";
import EditBudgetModal from "./EditBudgetModal";

interface EditBudgetButtonProps {
    id: string;
}

const EditBudgetButton = ({id}: EditBudgetButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div>
            <button 
                type="button"
                onClick={() => setShowModal(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Edit Budget
            </button>
            <Modal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Edit Budget"
            >
                <EditBudgetModal
                    id={id}
                    onClose={() => setShowModal(false)} 
                />
            </Modal>
        </div>
    );
}

export default EditBudgetButton;