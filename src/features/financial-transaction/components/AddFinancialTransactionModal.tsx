import { useEffect, useState } from "react";
import { useAlert } from "@/components/context/AlertContext";
import { useAddFinancialTransactionMutation } from "../hooks/useFinancialTransactionHooks";
import TransactionFormFields from "./TransactionFormFields";
import { getApiResponseMessageError } from "@/utils/moneyMapApiUtil";
import { useCategoriesDropDownOptionsQuery } from "@/features/category/hooks/useCategoryHooks";
import { useFinancialResourcesDropDownOptionsQuery } from "@/features/financial-resource/hooks/useFinancialResourceHooks";

const AddFinancialTransactionModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({
    description: "",
    date: "",
    amount: 0,
    categoryId: "",
    financialResourceId: "",
    destinationFinancialResourceId: "",
  });
  const { showAlert } = useAlert();
  const { mutate } = useAddFinancialTransactionMutation();
  

  const { data: categories = [], isError: isErrorCategories, error: errorCategories } = useCategoriesDropDownOptionsQuery();
  const { data: financialResources = [], isError: isErrorFinancialResources, error: errorFinancialResources } = useFinancialResourcesDropDownOptionsQuery();

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
      !form.date ||
      !form.amount ||
      !form.categoryId ||
      !form.financialResourceId
    ) {
      showAlert(
        "Date, amount, category, and source resource are required",
        "info",
      );
      return;
    }

    if (form.amount <= 0) {
      showAlert("Amount must be greater than 0", "info");
      return;
    }
    mutate(
      {
        ...form,
        destinationFinancialResource:
          form.destinationFinancialResourceId || undefined,
      },
      { onSuccess: onClose },
    );
  };
  return (
    <form onSubmit={submit}>
      <div className="flex flex-col gap-2 p-4">
        <TransactionFormFields
          {...form}
          categories={categories}
          financialResources={financialResources}
          onChange={update}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddFinancialTransactionModal;
