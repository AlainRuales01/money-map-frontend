import {Routes, Route } from "react-router";
import CategoriesPage from "@featuresCategory/pages/CategoriesPage";
const CategoryRoutes = () => {
  return (
        <Routes>
            <Route index element={<CategoriesPage />} />
        </Routes>
    );
}

export default CategoryRoutes;