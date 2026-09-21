import { useMemo } from "react";
import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";
import type { CategoryDropdownOptionDTO } from "@/types/services/category";
import type { CategoryTypeDropdownOptionDTO } from "@/types/services/category-type";

export const TRANSFER_CATEGORY_TYPE_CODE = "TRANSFER";

interface TransactionFormFieldsProps {
  description: string;
  date: string;
  amount: number;
  categoryTypeId?: string;
  categoryId: string;
  financialResourceId: string;
  destinationFinancialResourceId: string;
  categoryTypes?: CategoryTypeDropdownOptionDTO[];
  categories: (CategoryDropdownOptionDTO | DropdownOptionDTO)[];
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

  const selectedCategoryType = props.categoryTypes?.find(
    (ct) => ct.id === props.categoryTypeId,
  );

  const isTransferType =
    selectedCategoryType?.code?.toUpperCase() === TRANSFER_CATEGORY_TYPE_CODE;

    
  const showDestinationResource =
    props.categoryTypes && props.categoryTypes.length > 0
      ? isTransferType
      : true;

  const availableCategories = useMemo(() => {
    if (!props.categoryTypeId) {
      return props.categoryTypes && props.categoryTypes.length > 0
        ? []
        : props.categories;
    }

    return props.categories.filter((category) => {
      if ("categoryTypeId" in category && category.categoryTypeId) {
        return category.categoryTypeId === props.categoryTypeId;
      }
      return true;
    });
  }, [props.categories, props.categoryTypeId, props.categoryTypes]);

  return (
    <>
      <div>
        <label htmlFor="description" className="text-black pr-2">
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="Transaction description"
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
      {props.categoryTypes && (
        <div>
          <label htmlFor="categoryTypeId" className="text-black pr-2">
            Category Type
          </label>
          <select
            id="categoryTypeId"
            value={props.categoryTypeId || ""}
            onChange={(event) => {
              const newCategoryTypeId = event.target.value;
              props.onChange("categoryTypeId", newCategoryTypeId);
              props.onChange("categoryId", "");
              props.onChange("destinationFinancialResourceId", "");
            }}
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          >
            <option value="">Select Category Type</option>
            {props.categoryTypes.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {select("categoryId", props.categoryId, "Category", availableCategories)}
      {select(
        "financialResourceId",
        props.financialResourceId,
        "Source Financial resource",
        props.financialResources,
      )}
      {showDestinationResource &&
        select(
          "destinationFinancialResourceId",
          props.destinationFinancialResourceId,
          "Destination Financial resource",
          props.financialResources,
        )}
    </>
  );
};

export default TransactionFormFields;
