import { useEffect, useState } from 'react'

import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useFinancialResourcesBasicInfoQuery } from '../hooks/useFinancialResourceHooks';
import ToolbarFinancialResource from '../components/ToolbarFinancialResource';
import FinancialResourceTable from '../components/FinancialResourceTable';

const FinancialResourcePage = () => {

    const [financialResourceName, setFinancialResourceName] = useState('');

    const { showAlert } = useAlert();

    const { data: financialResource = [], isError, error } = useFinancialResourcesBasicInfoQuery({ financialResourceName: financialResourceName });

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    }, [isError, error, showAlert]);

    const handleSearch = (financialResourceName: string) => {
        setFinancialResourceName(financialResourceName);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Financial Resources</h1>
            <ToolbarFinancialResource onSearch={handleSearch} />
            <div>
                <FinancialResourceTable financialResources={financialResource} />
            </div>
        </div>
    )
}

export default FinancialResourcePage