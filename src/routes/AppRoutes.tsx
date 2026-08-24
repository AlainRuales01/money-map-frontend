import { Routes, Route } from "react-router";
import LandingPage from "@features/landing/pages/LandingPage";
import CategoryRoutes from "@featuresCategory/routes/CategoryRoutes";
import { MainLayout } from "@/components/layouts/MainLayout";
import FinancialResourceRoutes from "@/features/financial-resource/routes/FinancialResourceRoutes";
// import BudgetRoutes from "@/features/budget/routes/BudgetRoutes";


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />} >
                <Route index element={<LandingPage />} />
                <Route path="/categories/*" element={<CategoryRoutes />} />
                <Route path="/financial-resources/*" element={<FinancialResourceRoutes />} />
                {/* <Route path="/budgets/*" element={<BudgetRoutes />} /> */}
            </Route>
        </Routes>
    );
}

export default AppRoutes;