import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import NewTransaction from "../pages/Transaction/New";
import EditTransaction from "../pages/Transaction/Edit";
import Transactions from "../pages/Transaction/Transactions";
import Account from "../pages/Account";
import NotFound from "../pages/NotFound";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Auth type="signin" />} />
      <Route path="/signup" element={<Auth type="signup" />} />

      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/account" element={<Account />} />

        <Route path="/transacoes">
          <Route index element={<Transactions />} />
          <Route path="nova" element={<NewTransaction />} />
          <Route path=":id/editar" element={<EditTransaction />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
