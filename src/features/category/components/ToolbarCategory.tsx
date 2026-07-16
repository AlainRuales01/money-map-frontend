import AddCategoryButton from "./AddCategoryButton";
import FilterCategories from "./FilterCategories";

const ToolbarCategory = () => {
    return (
        <div className="border-gray-300 py-4 px-2 justify-between flex flex-row">
            <FilterCategories />
            <AddCategoryButton />
        </div>
    )
}

export default ToolbarCategory;