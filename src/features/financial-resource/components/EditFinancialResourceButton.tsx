import Modal from "@/components/common/Modal";

import { useState } from "react";
import EditFinancialResourceModal from "./EditFinancialResourceModal";

interface EditFinancialResourceButtonProps {
    id: string;
}

const EditFinancialResourceButton = ({id}: EditFinancialResourceButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div>
            <button 
                type="button"
                onClick={() => setShowModal(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Edit Financial Resource    
            </button>
            <Modal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Edit Financial Resource"
            >
                <EditFinancialResourceModal
                    id={id}
                    onClose={() => setShowModal(false)} 
                />
            </Modal>
        </div>
    );
}

export default EditFinancialResourceButton;