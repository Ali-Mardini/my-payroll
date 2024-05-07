import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import './index.css';
import Dashboard from './pages/dashboard/dashboard';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path:"/register",
		element: <Register />
	},
	{
		path:"/dashboard",
		element: <Dashboard />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<RouterProvider router={router} />
  </React.StrictMode>,
)
