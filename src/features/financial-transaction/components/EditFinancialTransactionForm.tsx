import { useEffect, useState } from "react";
import { useAlert } from "@/components/context/AlertContext";
import type { FinancialTransactionUpdateInfoResponseDTO } from "@/types/services/financial-transaction";
import { useUpdateFinancialTransactionMutation } from "../hooks/useFinancialTransactionHooks";
import TransactionFormFields from "./TransactionFormFields";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useCategoriesDropDownOptionsQuery } from "@/features/category/hooks/useCategoryHooks";
import { useFinancialResourcesDropDownOptionsQuery } from "@/features/financial-resource/hooks/useFinancialResourceHooks";
import { useCategoryTypesDropDownOptionsQuery } from "@/features/category-type/hooks/useCategoryTypeHooks";

const EditFinancialTransactionForm = ({
  transaction,
  onClose,
}: {
  transaction: FinancialTransactionUpdateInfoResponseDTO;
  onClose: () => void;
}) => {
  const [form, setForm] = useState({
    description: transaction.description,
    date: transaction.date,
    amount: transaction.amount,
    categoryId: transaction.categoryId,
    categoryTypeId: transaction.categoryTypeId,
    financialResourceId: transaction.financialResourceId,
    destinationFinancialResourceId:
      transaction.destinationFinancialResourceId || "",
  });
  const { showAlert } = useAlert();
  const { mutate } = useUpdateFinancialTransactionMutation();

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

  const update = (field: string, value: string | number) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.description ||
      !form.date ||
      !form.amount ||
      !form.categoryId ||
      !form.financialResourceId
    ) {
      showAlert(
        "Description, Date, amount, category, and source resource are required",
        "info",
      );
      return;
    }

    const selectedCategoryType = categoryTypes.find(
      (ct) => ct.id === form.categoryTypeId,
    );
    const isTransfer =
      selectedCategoryType?.code?.toUpperCase() === "TRANSFER";

    if (isTransfer) {
      if (!form.destinationFinancialResourceId) {
        showAlert(
          "Destination Financial resource is required for transfer transactions",
          "info",
        );
        return;
      }

      if (form.financialResourceId === form.destinationFinancialResourceId) {
        showAlert(
          "Destination Financial resource cannot be the same as the Source Financial resource",
          "info",
        );
        return;
      }
    }

    if (form.amount <= 0) {
      showAlert("Amount must be greater than 0", "info");
      return;
    }

    mutate(
      {
        id: transaction.id,
        ...form,
        destinationFinancialResourceId:
          isTransfer && form.destinationFinancialResourceId
            ? form.destinationFinancialResourceId
            : undefined,
        isDeleted: false,
      },
      { onSuccess: onClose },
    );
  };
  return (
    <form onSubmit={submit}>
      <div className="flex flex-col gap-2 p-4">
        <TransactionFormFields
          {...form}
          categoryTypes={categoryTypes}
          categories={categories}
          financialResources={financialResources}
          onChange={update}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditFinancialTransactionForm;
