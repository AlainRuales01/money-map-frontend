import { Routes, Route } from "react-router";
import CategoryTypeRoutes from "../features/category-type/routes/CategoryTypeRoutes";
import LandingPage from "../features/landing/pages/LandingPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/category-types/*" element={<CategoryTypeRoutes />} />
        </Routes>
    );
}

export default AppRoutes;