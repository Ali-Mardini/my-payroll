import logo from "../../assets/logo.png";
import leftImg from "../../assets/left-img.png";
const AuthLeftSide = () =>{
	return (
		<div className="flex flex-col w-full">
        <div className="flex items-center mb-4">
          <img src={logo} className="logo" />
          <h1 className='text-3xl'>Payroll</h1>
        </div>
        <h1 className='text-lg mb-4'>Effortless payroll access at your fingertips.</h1>
        <p>
          Experience the convenience of effortless payroll management with our
          intuitive platform, giving you seamless access to all your payroll
          needs right at your fingertips. Say goodbye to manual processes and
          hello to streamlined efficiency, ensuring accuracy and ease in
          managing your payroll tasks.
        </p>
		<img src={leftImg} />
      </div>
	)
};

export default AuthLeftSide;