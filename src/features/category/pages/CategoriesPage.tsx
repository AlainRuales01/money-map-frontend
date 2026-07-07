import type { GetCategoryBasicInfoDTO } from '@/types/services/category/response/GetCategoryBasicInfoDTO'
import AddCategoryButton from '@featuresCategory/components/AddCategoryButton'
import CategoryTable from '@featuresCategory/components/CategoryTable'
import { useEffect, useState } from 'react'
import { categoryService } from '@featuresCategory/services/categoryService';

const CategoriesPage = () => {

    const [categories, setCategories] = useState<GetCategoryBasicInfoDTO[]>([])

    useEffect(() => {
        const fetchCategory = async () => {
        const data = await categoryService.getCategoryBasicInfo();
        setCategories(data);
        }

        fetchCategory();
    }, []);

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