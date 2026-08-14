import {Routes, Route } from "react-router";
import FinancialResourcePage from "@featuresFinancialResource/pages/FinancialResourcePage";
const FinancialResourceRoutes = () => {
  return (
        <Routes>
            <Route index element={<FinancialResourcePage />} />
        </Routes>
    );
}

export default FinancialResourceRoutes;