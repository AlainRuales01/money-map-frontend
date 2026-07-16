import CategoryTable from '@featuresCategory/components/CategoryTable'
import { useEffect } from 'react'

import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useCategoriesBasicInfoQuery } from '../hooks/useCategoryHooks';
import ToolbarCategory from '../components/ToolbarCategory';

const CategoriesPage = () => {

    const { showAlert } = useAlert();

    const { data: categories = [], isError, error } = useCategoriesBasicInfoQuery();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    }, [isError, error, showAlert]);

    return (
        <div>
            <ToolbarCategory />
            <main>
                <CategoryTable categories={categories} />
            </main>
        </div>
    )
}

export default CategoriesPage