import AddFinancialResourceButton from "./AddFinancialResourceButton";
import FilterFinancialResources from "./FilterFinancialResources";

interface ToolbarFinancialResourceProps {
    onSearch: (searchTerm: string, onlyActive: boolean) => void;
}

const ToolbarFinancialResource = ({onSearch}: ToolbarFinancialResourceProps) => {
    return (
        <div className="border-gray-300 py-4 justify-between flex">
            <FilterFinancialResources onSearch={onSearch} />
            <AddFinancialResourceButton />
        </div>
    )
}

export default ToolbarFinancialResource;