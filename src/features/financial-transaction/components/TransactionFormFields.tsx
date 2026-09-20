import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";


interface TransactionFormFieldsProps {
  description: string;
  date: string;
  amount: number;
  categoryId: string;
  financialResourceId: string;
  destinationFinancialResourceId: string;
  categories: DropdownOptionDTO[];
  financialResources: DropdownOptionDTO[];
  onChange: (field: string, value: string | number) => void;
}

const TransactionFormFields = (props: TransactionFormFieldsProps) => {
  const select = (
    id: string,
    value: string,
    label: string,
    options: DropdownOptionDTO[],
  ) => (
    <div>
      <label htmlFor={id} className="text-black pr-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => props.onChange(id, event.target.value)}
        className="border border-gray-300 p-1 rounded mb-2 text-black"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <div>
        <label htmlFor="description" className="text-black pr-2">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={props.description}
          onChange={(event) =>
            props.onChange("description", event.target.value)
          }
          className="border border-gray-300 p-1 rounded mb-2 text-black"
        />
      </div>
      <div>
        <label htmlFor="date" className="text-black pr-2">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={props.date}
          onChange={(event) => props.onChange("date", event.target.value)}
          className="border border-gray-300 p-1 rounded mb-2 text-black"
        />
      </div>
      <div>
        <label htmlFor="amount" className="text-black pr-2">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={props.amount}
          onChange={(event) =>
            props.onChange("amount", parseFloat(event.target.value) || 0)
          }
          className="border border-gray-300 p-1 rounded mb-2 text-black"
        />
      </div>
      {select("categoryId", props.categoryId, "Category", props.categories)}
      {select(
        "financialResourceId",
        props.financialResourceId,
        "Source resource",
        props.financialResources,
      )}
      {select(
        "destinationFinancialResourceId",
        props.destinationFinancialResourceId,
        "Destination resource",
        props.financialResources,
      )}
    </>
  );
};

export default TransactionFormFields;
