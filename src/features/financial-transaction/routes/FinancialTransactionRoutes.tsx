import { Route, Routes } from 'react-router';
import FinancialTransactionsPage from '../pages/FinancialTransactionsPage';

const FinancialTransactionRoutes = () => <Routes><Route index element={<FinancialTransactionsPage />} /></Routes>;

export default FinancialTransactionRoutes;