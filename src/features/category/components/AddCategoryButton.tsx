import Modal from '@/components/common/Modal';

import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

const AddCategoryButton = () => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-2 py-1 rounded">Add Category</button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <AddCategoryModal onClose={() => setShowModal(false)} />
            </Modal>
        </>
    );
}

export default AddCategoryButton;