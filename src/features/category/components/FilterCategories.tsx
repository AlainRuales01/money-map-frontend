import { useAlert } from "@/components/context/AlertContext";
import { useCategoryTypesDropDownOptionsQuery } from "@/features/category-type/hooks/useCategoryTypeHooks";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useEffect } from "react";

const FilterCategories = () => {
    const { showAlert } = useAlert();
    const { data: categoryTypes = [], isError, error } = useCategoryTypesDropDownOptionsQuery();

    useEffect(() => {
        if (isError) {
          const errorMessage = getApiResponseMessageError(error);
          showAlert(errorMessage, "error");
        }
      }, [isError, error, showAlert]);

    return (
        <form>
            <div className="flex flex-row gap-4 align-center">
                <input type = "text" placeholder="Search categories..." className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"></input>
                <select className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80">
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search</button>
            </div>
        </form>
    )
}

export default FilterCategories