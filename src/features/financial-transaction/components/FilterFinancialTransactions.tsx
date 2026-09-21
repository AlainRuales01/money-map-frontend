import { useEffect, useState } from "react";
import { useCategoriesDropDownOptionsQuery } from "@/features/category/hooks/useCategoryHooks";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useAlert } from "@/components/context/AlertContext";
import { useFinancialResourcesDropDownOptionsQuery } from "@/features/financial-resource/hooks/useFinancialResourceHooks";
import { useCategoryTypesDropDownOptionsQuery } from "@/features/category-type/hooks/useCategoryTypeHooks";
import type { CategoryDropdownOptionDTO } from "@/types/services/category";
import { TRANSFER_CATEGORY_TYPE_CODE } from "./TransactionFormFields";

interface FilterFinancialTransactionsProps {
  onSearch: (
    description: string,
    startDate: string,
    endDate: string,
    categoryId: string,
    financialResourceId: string,
    destinationFinancialResourceId?: string,
    categoryTypeId?: string,
  ) => void;
}

const FilterFinancialTransactions = ({
  onSearch,
}: FilterFinancialTransactionsProps) => {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryTypeId, setCategoryTypeId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [financialResourceId, setFinancialResourceId] = useState("");
  const [destinationFinancialResourceId, setDestinationFinancialResourceId] = useState("");
  const { showAlert } = useAlert();

  const {
    data: categoryTypes = [],
    isError: isErrorCategoryTypes,
    error: errorCategoryTypes,
  } = useCategoryTypesDropDownOptionsQuery();
  const {
    data: categories = [],
    isError: isErrorCategories,
    error: errorCategories,
  } = useCategoriesDropDownOptionsQuery();
  const {
    data: financialResources = [],
    isError: isErrorFinancialResources,
    error: errorFinancialResources,
  } = useFinancialResourcesDropDownOptionsQuery();

  useEffect(() => {
    if (isErrorCategoryTypes) {
      const errorMessage = getApiResponseMessageError(errorCategoryTypes);
      showAlert(errorMessage, "error");
    }
  }, [isErrorCategoryTypes, errorCategoryTypes, showAlert]);

  useEffect(() => {
    if (isErrorCategories) {
      const errorMessage = getApiResponseMessageError(errorCategories);
      showAlert(errorMessage, "error");
    }
  }, [isErrorCategories, errorCategories, showAlert]);

  useEffect(() => {
    if (isErrorFinancialResources) {
      const errorMessage = getApiResponseMessageError(errorFinancialResources);
      showAlert(errorMessage, "error");
    }
  }, [isErrorFinancialResources, errorFinancialResources, showAlert]);

  const handleCategoryTypeChange = (newCategoryTypeId: string) => {
    setCategoryTypeId(newCategoryTypeId);
    setCategoryId("");
    setDestinationFinancialResourceId("");
  };

  const selectedCategoryType = categoryTypes.find((ct) => ct.id === categoryTypeId);
  const isTransfer =
    selectedCategoryType?.code?.toUpperCase() === TRANSFER_CATEGORY_TYPE_CODE;

  const availableCategories = categoryTypeId
    ? categories.filter((category) => {
        if ("categoryTypeId" in category && (category as CategoryDropdownOptionDTO).categoryTypeId) {
          return (category as CategoryDropdownOptionDTO).categoryTypeId === categoryTypeId;
        }
        return true;
      })
    : categories;

  return (
    <form
      className="flex flex-row flex-wrap gap-4 items-center"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(
          description,
          startDate,
          endDate,
          categoryId,
          financialResourceId,
          isTransfer && destinationFinancialResourceId ? destinationFinancialResourceId : undefined,
          categoryTypeId || undefined,
        );
      }}
    >
      <input
        type="date"
        aria-label="Start date"
        className="border border-gray-300 rounded-md py-2 px-4"
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
      />
      <input
        type="date"
        aria-label="End date"
        className="border border-gray-300 rounded-md py-2 px-4"
        value={endDate}
        onChange={(event) => setEndDate(event.target.value)}
      />
      <input
        type="text"
        placeholder="Transaction description..."
        className="border border-gray-300 rounded-md py-2 px-4"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <select
        aria-label="Category Type"
        className="border border-gray-300 rounded-md py-2 px-4"
        value={categoryTypeId}
        onChange={(event) => handleCategoryTypeChange(event.target.value)}
      >
        <option value="">All category types</option>
        {categoryTypes.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <select
        aria-label="Category"
        className="border border-gray-300 rounded-md py-2 px-4"
        value={categoryId}
        onChange={(event) => setCategoryId(event.target.value)}
      >
        <option value="">All categories</option>
        {availableCategories.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <select
        aria-label="Financial resource"
        className="border border-gray-300 rounded-md py-2 px-4"
        value={financialResourceId}
        onChange={(event) => setFinancialResourceId(event.target.value)}
      >
        <option value="">All resources</option>
        {financialResources.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {isTransfer && (
        <select
          aria-label="Destination financial resource"
          className="border border-gray-300 rounded-md py-2 px-4"
          value={destinationFinancialResourceId}
          onChange={(event) => setDestinationFinancialResourceId(event.target.value)}
        >
          <option value="">All destination resources</option>
          {financialResources.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default FilterFinancialTransactions;
