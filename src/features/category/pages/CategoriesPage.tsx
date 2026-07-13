import AddCategoryButton from '@featuresCategory/components/AddCategoryButton'
import CategoryTable from '@featuresCategory/components/CategoryTable'
import { useEffect } from 'react'

import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useCategoriesBasicInfoQuery } from '../hooks/useCategoryHooks';

const CategoriesPage = () => {

    const { showAlert } = useAlert();

    const { data: categories = [], isLoading, isError, error } = useCategoriesBasicInfoQuery();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    }, [isError, error, showAlert]);

    return (
        <div>
            <AddCategoryButton />
            <main>
                <CategoryTable categories={categories} />
            </main>
        </div>
    )
}

export default CategoriesPage