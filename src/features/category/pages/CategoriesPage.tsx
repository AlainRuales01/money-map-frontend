import AddCategoryButton from '@featuresCategory/components/AddCategoryButton'
import CategoryTable from '@featuresCategory/components/CategoryTable'

const CategoriesPage = () => {
    return (
        <div>
            <AddCategoryButton />
            <main>
                <CategoryTable />
            </main>
        </div>
    )
}

export default CategoriesPage