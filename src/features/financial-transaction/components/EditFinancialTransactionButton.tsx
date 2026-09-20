import Modal from "@/components/common/Modal";
import { useState } from "react";
import EditFinancialTransactionModal from "./EditFinancialTransactionModal";

const EditFinancialTransactionButton = ({ id }: { id: string }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Edit Transaction
      </button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Financial Transaction"
      >
        <EditFinancialTransactionModal
          id={id}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default EditFinancialTransactionButton;
