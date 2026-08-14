import { useState } from "react";

interface FilterFinancialResourcesProps {
    onSearch: (financialResourceName: string) => void;
}

const FilterFinancialResources = ({onSearch}: FilterFinancialResourcesProps) => {
    const [financialResourceName, setFinancialResource] = useState('');

    return (
        <form className="flex flex-row gap-4 items-center ">
                <input 
                    type = "text" 
                    placeholder="Search financial resource..." 
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                    onChange={(e) => setFinancialResource(e.target.value)}
                />
                
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={
                        (e) => {
                            e.preventDefault();
                            onSearch(financialResourceName);
                        }
                    }
                >
                    Search
                </button>
        </form>
    )
}

export default FilterFinancialResources