import { useAlert } from "@/components/context/AlertContext";
import { useCategoryTypesDropDownOptionsQuery } from "@/features/category-type/hooks/useCategoryTypeHooks";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useEffect, useState } from "react";

interface FilterCategoriesProps {
    onSearch: (categoryName: string, categoryTypeId: string) => void;
}

const FilterCategories = ({onSearch}: FilterCategoriesProps) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryTypeId, setCategoryTypeId] = useState('');

    const { showAlert } = useAlert();
    const { data: categoryTypes = [], isError, error } = useCategoryTypesDropDownOptionsQuery();

    useEffect(() => {
        if (isError) {
          const errorMessage = getApiResponseMessageError(error);
          showAlert(errorMessage, "error");
        }
      }, [isError, error, showAlert]);

    return (
        <form className="flex flex-row gap-4 items-center ">
                <input 
                    type = "text" 
                    placeholder="Search categories..." 
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select 
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80" 
                    onChange={(e) => setCategoryTypeId(e.target.value)}>
                    <option value="">All Categories</option>
                    {categoryTypes.map((categoryType) => (
                        <option
                            key={categoryType.id}
                            className="text-black"
                            value={categoryType.id}
                        >
                            {categoryType.name}
                        </option>
                    ))}
                </select>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={
                        (e) => {
                            e.preventDefault();
                            onSearch(categoryName, categoryTypeId);
                        }
                    }
                >
                    Search
                </button>
        </form>
    )
}

export default FilterCategories