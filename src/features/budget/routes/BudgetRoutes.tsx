import {Routes, Route } from "react-router";
import BudgetsPage from "../pages/BudgetsPage";

const BudgetRoutes = () => {
  return (
        <Routes>
            <Route index element={<BudgetsPage />} />
        </Routes>
    );
}

export default BudgetRoutes;