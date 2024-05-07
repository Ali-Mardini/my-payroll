const Sidebar = () => {
	return (
		<div className="fixed h-screen bg-gray-800 text-white w-64 flex flex-col justify-between pt-5 space-y-1">
        <ul className="flex flex-col flex-grow h-full pt-5 space-y-1">
          <li className="px-4 py-2 rounded-md hover:bg-gray-700">
            <a href="#">Dashboard</a>
          </li>
          <li className="px-4 py-2 rounded-md hover:bg-gray-700">
            <a href="#">Employees</a>
          </li>
          <li className="px-4 py-2 rounded-md hover:bg-gray-700">
            <a href="#">Salaries</a>
          </li>
          <li className="px-4 py-2 rounded-md mt-auto hover:bg-gray-700">
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
	)
};

export default Sidebar;