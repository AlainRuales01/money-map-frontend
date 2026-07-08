import type { GetCategoryBasicInfoDTO } from '@/types/services/category/response/GetCategoryBasicInfoDTO'
import AddCategoryButton from '@featuresCategory/components/AddCategoryButton'
import CategoryTable from '@featuresCategory/components/CategoryTable'
import { useEffect, useState } from 'react'
import { categoryService } from '@featuresCategory/services/categoryService';
import { useAlert } from '@/components/context/AlertContext';
import type { ApiError } from '@/types/api/ApiError';

const CategoriesPage = () => {

    const { showAlert } = useAlert();

    const [categories, setCategories] = useState<GetCategoryBasicInfoDTO[]>([])

    useEffect(() => {
        const fetchCategory = async () => {
            try{
                const data = await categoryService.getCategoryBasicInfo();
                setCategories(data);
            } catch (error: unknown) {
                const errorMessage = 
                error && typeof error === 'object' && 'message' in error
                    ? (error as ApiError).message
                    : 'An unexpected error occurred while fetching categories.';

                showAlert(errorMessage, "error");
            }
        }
        fetchCategory();
    }, [showAlert]);

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