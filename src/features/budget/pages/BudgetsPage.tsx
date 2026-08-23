import { useEffect, useState } from 'react'

import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';

import { useBudgetsBasicInfoQuery } from '../hooks/useBudgetHooks';
import BudgetTable from '../components/BudgetTable';
import ToolbarBudget from '../components/ToolbarBudget';

const BudgetsPage = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [onlyActive, setOnlyActive] = useState(false);

    const { showAlert } = useAlert();

    const { data: budgets = [], isError, error } = useBudgetsBasicInfoQuery({ startDate, endDate, categoryId, onlyActive });

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    }, [isError, error, showAlert]);

    const handleSearch = (startDate: string, endDate: string, categoryId: string, onlyActive: boolean) => {
        setStartDate(startDate);
        setEndDate(endDate);
        setCategoryId(categoryId);
        setOnlyActive(onlyActive);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Budgets</h1>
            <ToolbarBudget onSearch={handleSearch} />
            <div>
                <BudgetTable budgets={budgets} />
            </div>
        </div>
    )
}

export default BudgetsPage