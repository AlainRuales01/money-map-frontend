import { useAlert } from '@/components/context/AlertContext';

import { useEffect } from "react";
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import EditBudgetForm from './EditBudgetForm';
import { useBudgetsUpdateInfoQuery } from '../hooks/useBudgetHooks';

interface EditBudgetModalProps {
    id: string;
    onClose: () => void;
}

const EditBudgetModal = ({id, onClose}: EditBudgetModalProps) => {

    const { data: budgetData, isError: isBudgetError, error: budgetError, isLoading: isBudgetLoading } = useBudgetsUpdateInfoQuery({ id });

    const { showAlert } = useAlert();

    useEffect(() => {
        if (isBudgetError) {
            const errorMessage = getApiResponseMessageError(budgetError);
            showAlert(errorMessage, "error");
            onClose();
        }
    }, [isBudgetError, budgetError, showAlert, onClose]);


    if (isBudgetLoading) {
        return null; // Or a loading spinner modal backdrop
    }

    if (isBudgetError || !budgetData) {
        return null;
    }
    
    return (
        <EditBudgetForm
            id={id}
            amount={budgetData.amount}
            startDate={budgetData.startDate}
            endDate={budgetData.endDate}
            categoryId={budgetData.categoryId}
            isActive={budgetData.isActive}
            onClose={onClose}
        />
    )
    
};

export default EditBudgetModal;