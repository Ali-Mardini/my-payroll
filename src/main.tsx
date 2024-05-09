import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import DashboardWithAuthentication from "./pages/dashboard/dashboard";
import EmployeesWithAuthentication from "./pages/employees/employees";
import SalariesWithAuthentication from "./pages/salaries/salaries";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardWithAuthentication />,
  },
  {
    path: "/employees",
    element: <EmployeesWithAuthentication />,
  },
  {
    path: "/salaries",
    element: <SalariesWithAuthentication />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="payroll-app.us.auth0.com"
      clientId="j2ZtO8upYPg8hgdduBSnbagNMbwuWROi"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
