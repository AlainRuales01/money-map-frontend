import { useAlert } from "@/components/context/AlertContext";
import { useCategoriesDropDownOptionsQuery } from "@/features/category/hooks/useCategoryHooks";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useEffect, useState } from "react";

interface FilterCategoriesProps {
    onSearch: (startDate: string, endDate: string, categoryId: string, onlyActive: boolean) => void;
}

const FilterBudgets = ({onSearch}: FilterCategoriesProps) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [onlyActive, setOnlyActive] = useState(false);

    const { showAlert } = useAlert();
    const { data: categories = [], isError, error } = useCategoriesDropDownOptionsQuery();

    useEffect(() => {
        if (isError) {
          const errorMessage = getApiResponseMessageError(error);
          showAlert(errorMessage, "error");
        }
      }, [isError, error, showAlert]);

    return (
        <form className="flex flex-row gap-4 items-center ">
                <input 
                    type = "date" 
                    placeholder="Start date..." 
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-60"
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input 
                    type = "date" 
                    placeholder="End date..." 
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-60"
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <select 
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-70" 
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            className="text-black"
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="flex items-center gap-2 border border-gray-300 rounded-md py-2 px-4">
                    <label>Only actives</label>
                    <input
                        type="checkbox"
                        checked={onlyActive}
                        onChange={(e) => setOnlyActive(e.target.checked)}
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={
                        (e) => {
                            e.preventDefault();
                            onSearch(startDate, endDate, categoryId, onlyActive);
                        }
                    }
                >
                    Search
                </button>
        </form>
    )
}

export default FilterBudgets