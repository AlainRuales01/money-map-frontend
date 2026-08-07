import { useAlert } from '@/components/context/AlertContext';

import { useEffect } from "react";
import { getApiResponseMessageError } from '@/utils/moneyMapApiUtil';
import { useCategoriesModifyInfoQuery } from '@featuresCategory/hooks/useCategoryHooks';
import EditCategoryForm from '@featuresCategory/components/EditCategoryForm';

interface EditCategoryModalProps {
    id: string;
    onClose: () => void;
}

const EditCategoryModal = ({id, onClose}: EditCategoryModalProps) => {

    const { data: categoryData, isError: isCategoryError, error: categoryError, isLoading: isCategoryLoading } = useCategoriesModifyInfoQuery({ id });

    const { showAlert } = useAlert();

    useEffect(() => {
        if (isCategoryError) {
            const errorMessage = getApiResponseMessageError(categoryError);
            showAlert(errorMessage, "error");
            onClose();
        }
    }, [isCategoryError, categoryError, showAlert, onClose]);


    if (isCategoryLoading) {
        return null; // Or a loading spinner modal backdrop
    }

    if (isCategoryError || !categoryData) {
        return null;
    }
    
    return (
        <EditCategoryForm
            name={categoryData.name}
            description={categoryData.description}
            typeId={categoryData.categoryTypeId}
            onClose={onClose}
        />
    )
    
};

export default EditCategoryModal;