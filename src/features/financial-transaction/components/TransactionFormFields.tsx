import { useEffect, useMemo } from "react";
import type { DropdownOptionDTO } from "@/types/services/common/DropdownOptionDTO";
import type { CategoryDropdownOptionDTO } from "@/types/services/category";
import type { CategoryTypeDropdownOptionDTO } from "@/types/services/category-type";
import { CategoryTypeCode } from "@/constants/categoryTypeCode";
import { useNotPaidDebtDropDownOptionsQuery } from "@/features/debt/hooks/useDebtHooks";
import { useAlert } from "@/components/context/AlertContext";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";

interface TransactionFormFieldsProps {
  description: string;
  date: string;
  amount: number;
  categoryTypeId?: string;
  categoryId: string;
  financialResourceId: string;
  destinationFinancialResourceId: string;
  createAssociatedDebt?: boolean;
  dueDate?: string;
  paidDebtId?: string;
  isPayDebt?: boolean;
  onPayDebtChange?: (isPayDebt: boolean) => void;
  categoryTypes?: CategoryTypeDropdownOptionDTO[];
  categories: (CategoryDropdownOptionDTO | DropdownOptionDTO)[];
  financialResources: DropdownOptionDTO[];
  onChange: (field: string, value: string | number | boolean) => void;
}

const TransactionFormFields = (props: TransactionFormFieldsProps) => {
  const isPayDebt = props.isPayDebt ?? Boolean(props.paidDebtId);
  const categoryTypeId = props.categoryTypeId ?? "";

  const selectedCategoryType = props.categoryTypes?.find(
    (ct) => ct.id === props.categoryTypeId,
  );

  const isTransferType =
    selectedCategoryType?.code?.toUpperCase() === CategoryTypeCode.TRANSFER;

  const showDestinationResource =
    props.categoryTypes && props.categoryTypes.length > 0
      ? isTransferType
      : true;

  const debtCheckboxEnable = Boolean(!isTransferType && props.categoryTypeId);

  const {
    data: debts = [],
    isError: isErrorDebts,
    error: errorDebts,
  } = useNotPaidDebtDropDownOptionsQuery(
    { categoryTypeId },
    { enabled: Boolean(debtCheckboxEnable && isPayDebt) },
  );

  const { showAlert } = useAlert();

  useEffect(() => {
    if (isErrorDebts) {
      const errorMessage = getApiResponseMessageError(errorDebts);
      showAlert(errorMessage, "error");
    }
  }, [isErrorDebts, errorDebts, showAlert]);

  const { categoryId, onChange, onPayDebtChange, createAssociatedDebt } = props;

  useEffect(() => {
    if (!debtCheckboxEnable) {
      if (createAssociatedDebt) {
        onChange("createAssociatedDebt", false);
        onChange("dueDate", "");
      }
      if (isPayDebt) {
        onPayDebtChange?.(false);
        onChange("paidDebtId", "");
      }
    }
  }, [
    debtCheckboxEnable,
    createAssociatedDebt,
    isPayDebt,
    onChange,
    onPayDebtChange,
  ]);

  const select = (
    id: string,
    value: string,
    label: string,
    options: DropdownOptionDTO[],
    hideEmptyOption = false,
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
        {!hideEmptyOption && <option value="">Select {label}</option>}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
  
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

  useEffect(() => {
    if (availableCategories.length === 1) {
      const singleCategoryId = availableCategories[0].id;
      if (categoryId !== singleCategoryId) {
        onChange("categoryId", singleCategoryId);
      }
    }
  }, [availableCategories, categoryId, onChange]);

  const handleCreateDebtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    props.onChange("createAssociatedDebt", checked);
    if (checked) {
      if (isPayDebt) {
        props.onPayDebtChange?.(false);
        props.onChange("paidDebtId", "");
      }
    } else {
      props.onChange("dueDate", "");
    }
  };

  const handlePayDebtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    props.onPayDebtChange?.(checked);
    if (checked) {
      if (props.createAssociatedDebt) {
        props.onChange("createAssociatedDebt", false);
        props.onChange("dueDate", "");
      }
    } else {
      props.onChange("paidDebtId", "");
    }
  };

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

              const filtered = newCategoryTypeId
                ? props.categories.filter((category) => {
                    if ("categoryTypeId" in category && category.categoryTypeId) {
                      return category.categoryTypeId === newCategoryTypeId;
                    }
                    return true;
                  })
                : [];

              if (filtered.length === 1) {
                props.onChange("categoryId", filtered[0].id);
              } else {
                props.onChange("categoryId", "");
              }

              props.onChange("destinationFinancialResourceId", "");

              const newSelectedCategoryType = props.categoryTypes?.find(
                (ct) => ct.id === newCategoryTypeId,
              );
              const isNewTransfer =
                newSelectedCategoryType?.code?.toUpperCase() ===
                CategoryTypeCode.TRANSFER;

              if (isNewTransfer || !newCategoryTypeId) {
                props.onChange("createAssociatedDebt", false);
                props.onChange("dueDate", "");
                props.onPayDebtChange?.(false);
                props.onChange("paidDebtId", "");
              } else {
                props.onChange("paidDebtId", "");
                props.onChange("dueDate", "");
              }
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
      {select(
        "categoryId",
        props.categoryId,
        "Category",
        availableCategories,
        availableCategories.length === 1,
      )}
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
      {debtCheckboxEnable && (
        <div className="flex items-center gap-6 my-2">
          <div className="flex items-center gap-2">
            <input
              id="createAssociatedDebt"
              type="checkbox"
              checked={Boolean(props.createAssociatedDebt)}
              onChange={handleCreateDebtChange}
              className="cursor-pointer"
            />
            <label htmlFor="createAssociatedDebt" className="text-black cursor-pointer">
              Create a debt from transaction
            </label>
          </div>
          <div className="flex items-center gap-2">
            
            <input
              id="isPayDebt"
              type="checkbox"
              checked={Boolean(isPayDebt)}
              onChange={handlePayDebtChange}
              className="cursor-pointer"
            />
            <label htmlFor="isPayDebt" className="text-black cursor-pointer">
              Pay a debt
            </label>
          </div>       
        </div>
      )}
      {debtCheckboxEnable && props.createAssociatedDebt && (
        <div>
          <label htmlFor="dueDate" className="text-black pr-2">
            Due Date (Optional)
          </label>
          <input
            id="dueDate"
            type="date"
            value={props.dueDate || ""}
            onChange={(event) => props.onChange("dueDate", event.target.value)}
            className="border border-gray-300 p-1 rounded mb-2 text-black"
          />
        </div>
      )}
      {debtCheckboxEnable && isPayDebt && (
        <div>
          <label htmlFor="paidDebtId" className="text-black pr-2">
            Debt to Pay
          </label>
          <select
            id="paidDebtId"
            value={props.paidDebtId || ""}
            onChange={(event) => props.onChange("paidDebtId", event.target.value)}
            className="border border-gray-300 p-1 rounded mb-2 text-black w-full"
          >
            <option value="">Select Debt to Pay</option>
            {debts.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name} (Pending: {option.pendingAmount})
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default TransactionFormFields;
