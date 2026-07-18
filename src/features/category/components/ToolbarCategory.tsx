import AddCategoryButton from "./AddCategoryButton";
import FilterCategories from "./FilterCategories";

interface ToolbarCategoryProps {
    onSearch: (searchTerm: string, categoryTypeId: string) => void;
}

const ToolbarCategory = ({onSearch}: ToolbarCategoryProps) => {
    return (
        <div className="border-gray-300 py-4 justify-between flex">
            <FilterCategories onSearch={onSearch} />
            <AddCategoryButton />
        </div>
    )
}

export default ToolbarCategory;