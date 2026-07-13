import { Routes, Route } from "react-router";
import LandingPage from "@features/landing/pages/LandingPage";
import CategoryRoutes from "@featuresCategory/routes/CategoryRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/categories/*" element={<CategoryRoutes />} />
        </Routes>
    );
}

export default AppRoutes;