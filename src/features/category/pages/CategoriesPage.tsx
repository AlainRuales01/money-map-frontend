import CategoryTable from '@featuresCategory/components/CategoryTable'
import { useEffect, useState } from 'react'

import { useAlert } from '@/components/context/AlertContext';
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useCategoriesBasicInfoQuery } from '../hooks/useCategoryHooks';
import ToolbarCategory from '../components/ToolbarCategory';

const CategoriesPage = () => {

    const [categoryName, setCategoryName] = useState('');
    const [categoryTypeId, setCategoryTypeId] = useState('');

    const { showAlert } = useAlert();

    const { data: categories = [], isError, error } = useCategoriesBasicInfoQuery({ categoryName, categoryTypeId });

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiResponseMessageError(error);
            showAlert(errorMessage, "error");
        }
    }, [isError, error, showAlert]);

    const handleSearch = (categoryName: string, categoryTypeId: string) => {
        setCategoryName(categoryName);
        setCategoryTypeId(categoryTypeId);
        console.log("Searching for categories with name:", categoryName, "and type ID:", categoryTypeId);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <ToolbarCategory onSearch={handleSearch} />
            <main>
                <CategoryTable categories={categories} />
            </main>
        </div>
    )
}

export default CategoriesPage