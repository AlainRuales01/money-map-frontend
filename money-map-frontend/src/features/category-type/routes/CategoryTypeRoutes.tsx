import {Routes, Route } from "react-router";
import CategoryTypesPage from "../pages/CategoryTypesPage";
const CategoryTypeRoutes = () => {
  return (
        <Routes>
            <Route index element={<CategoryTypesPage />} />
        </Routes>
    );
}

export default CategoryTypeRoutes;