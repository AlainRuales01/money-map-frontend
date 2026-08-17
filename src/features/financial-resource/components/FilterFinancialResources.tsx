import { useState } from "react";

interface FilterFinancialResourcesProps {
    onSearch: (financialResourceName: string, onlyActive: boolean) => void;
}

const FilterFinancialResources = ({onSearch}: FilterFinancialResourcesProps) => {
    const [financialResourceName, setFinancialResourceName] = useState('');
    const [onlyActive, setOnlyActive] = useState(false);

    return (
        <form className="flex flex-row gap-4 items-center ">
                <input 
                    type = "text" 
                    placeholder="Search financial resource..." 
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                    onChange={(e) => setFinancialResourceName(e.target.value)}
                />
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
                            onSearch(financialResourceName, onlyActive);
                        }
                    }
                >
                    Search
                </button>
        </form>
    )
}

export default FilterFinancialResources