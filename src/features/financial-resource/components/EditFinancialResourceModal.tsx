import { useAlert } from '@/components/context/AlertContext';

import { useEffect } from "react";
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import EditFinancialResourceForm from './EditFinancialResourceForm';
import { useFinancialResourcesModifyInfoQuery } from '../hooks/useFinancialResourceHooks';

interface EditFinancialResourceModalProps {
    id: string;
    onClose: () => void;
}

const EditFinancialResourceModal = ({id, onClose}: EditFinancialResourceModalProps) => {

    const { data: financialResourceData, isError: isFinancialResourceError, error: financialResourceError, isLoading: isFinancialResourceLoading } = useFinancialResourcesModifyInfoQuery({ id });

    const { showAlert } = useAlert();

    useEffect(() => {
        if (isFinancialResourceError) {
            const errorMessage = getApiResponseMessageError(financialResourceError);
            showAlert(errorMessage, "error");
            onClose();
        }
    }, [isFinancialResourceError, financialResourceError, showAlert, onClose]);


    if (isFinancialResourceLoading) {
        return null; // Or a loading spinner modal backdrop
    }

    if (isFinancialResourceError || !financialResourceData) {
        return null;
    }
    
    return (
        <EditFinancialResourceForm
            id={id}
            name={financialResourceData.name}
            onClose={onClose}
        />
    )
    
};

export default EditFinancialResourceModal;