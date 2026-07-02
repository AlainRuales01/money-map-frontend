import Modal from "@/app/shared/components/Modal";
import AddCategory from "./add-category";
import { useState } from "react";

const AddCategoryButton = () => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-2 py-1 rounded">Agregar Categoría</button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <AddCategory />
            </Modal>
        </>
    );
}

export default AddCategoryButton;