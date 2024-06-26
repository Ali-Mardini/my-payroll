import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import EmployeesWithAuthentication from "./pages/employees/employees";
import SalariesWithAuthentication from "./pages/salaries/salaries";
import { Auth0Provider } from "@auth0/auth0-react";
import NewEmployeeWithAuthentication from "./pages/employees/new-employees";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeesWithAuthentication />,
  },
  {
    path: "/salaries",
    element: <SalariesWithAuthentication />,
  },
  {
    path: "/new-staff",
    element: <NewEmployeeWithAuthentication />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer autoClose={1000}
 />
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
