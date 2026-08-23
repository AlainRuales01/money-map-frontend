import AddBudgetButton from "./AddBudgetButton";
import FilterBudgets from "./FilterBudgets";

interface ToolbarBudgetProps {
    onSearch: ( description: string, startDate: string, endDate: string, categoryId: string, onlyActive: boolean) => void;
}

const ToolbarBudget = ({onSearch}: ToolbarBudgetProps) => {
    return (
        <div className="border-gray-300 py-4 justify-between flex">
            <FilterBudgets onSearch={onSearch} />
            <AddBudgetButton />
        </div>
    )
}

export default ToolbarBudget;