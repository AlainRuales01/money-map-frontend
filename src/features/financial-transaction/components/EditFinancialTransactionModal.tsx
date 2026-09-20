import { useEffect } from "react";
import { useAlert } from "@/components/context/AlertContext";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useFinancialTransactionUpdateInfoQuery } from "../hooks/useFinancialTransactionHooks";
import EditFinancialTransactionForm from "./EditFinancialTransactionForm";

const EditFinancialTransactionModal = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const query = useFinancialTransactionUpdateInfoQuery({ id });
  const { showAlert } = useAlert();
  useEffect(() => {
    if (query.isError) {
      showAlert(getApiResponseMessageError(query.error), "error");
      onClose();
    }
  }, [query.isError, query.error, showAlert, onClose]);
  if (query.isLoading || query.isError || !query.data) return null;
  return (
    <EditFinancialTransactionForm transaction={query.data} onClose={onClose} />
  );
};

export default EditFinancialTransactionModal;
