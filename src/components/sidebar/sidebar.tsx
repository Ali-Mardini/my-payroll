import { useAuth0 } from '@auth0/auth0-react';
import { ArrowLeftEndOnRectangleIcon, BanknotesIcon, UsersIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const { logout } = useAuth0();

	return (
		<div className="h-screen bg-gray-800 text-white w-64 flex flex-col justify-between pt-5 space-y-1">
        <ul className="flex flex-col grow h-full pt-5 ">

          <li className="px-4 py-2 mb-5 rounded-md hover:bg-gray-700">
            <Link className="flex" to="/">
              <UsersIcon className="w-6 h-6 mr-2" /> Employees</Link>
          </li>
          <li className="px-4 py-2 mb-5 rounded-md hover:bg-gray-700">
            <Link className="flex" to="/salaries">
              <BanknotesIcon className="w-6 h-6 mr-2" /> Salaries</Link>
          </li>
          <li className="px-4 py-2 rounded-md mt-auto hover:bg-gray-700">
            <a className="flex" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} href="#">
              <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-2" /> Logout</a>
          </li>
        </ul>
      </div>
	)
};

export default Sidebar;