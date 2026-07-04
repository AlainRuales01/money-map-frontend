import { Routes, Route } from "react-router";
import CategoryTypeRoutes from "@featuresCategoryType/routes/CategoryTypeRoutes";
import LandingPage from "@features/landing/pages/LandingPage";
import CategoryRoutes from "@featuresCategory/routes/CategoryRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/category-types/*" element={<CategoryTypeRoutes />} />
            <Route path="/categories/*" element={<CategoryRoutes />} />
        </Routes>
    );
}

export default AppRoutes;