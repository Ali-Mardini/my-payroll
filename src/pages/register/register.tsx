import { Link } from 'react-router-dom';
import AuthLeftSide from "../../components/auth-left-side/auth-left-side";

const Register = () => {
  return (
    <div className="flex px-4">
      <AuthLeftSide />
      <div className="flex bg-sky-50 flex-col w-full">
        <h1 className="text-3xl mt-[10%] text-center">
          Register with your free corporate account
        </h1>
        <form className="flex flex-col mt-[25%] mx-[10%] h-[30%] justify-between">
          <div className="mb-7">
            <label className="text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter work email address"
              type="text"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-7">
            <label className="text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter work email address"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="mb-7">
            <label
              className="text-gray-700 font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter work email address"
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <button className="w-full px-4 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-500">
            Get Started
          </button>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Do have an account?
              <Link to="/" className="text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
