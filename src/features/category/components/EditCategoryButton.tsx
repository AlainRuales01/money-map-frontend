import Modal from "@/components/common/Modal";

import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";

interface EditCategoryButtonProps {
    id: string;
}

const EditCategoryButton = ({id}: EditCategoryButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div>
            <button 
                type="button"
                onClick={() => setShowModal(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Edit Category    
            </button>
            <Modal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Edit Category"
            >
                <EditCategoryModal
                    id={id}
                    onClose={() => setShowModal(false)} 
                />
            </Modal>
        </div>
    );
}

export default EditCategoryButton;