import { Routes, Route } from "react-router";
import LandingPage from "@features/landing/pages/LandingPage";
import CategoryRoutes from "@featuresCategory/routes/CategoryRoutes";
import { MainLayout } from "@/components/layouts/MainLayout";


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />} >
                <Route index element={<LandingPage />} />
                <Route path="/categories/*" element={<CategoryRoutes />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;