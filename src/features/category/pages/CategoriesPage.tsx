import AddCategoryButton from "../components/AddCategoryButton"
import CategoryTable from "../components/CategoryTable"

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