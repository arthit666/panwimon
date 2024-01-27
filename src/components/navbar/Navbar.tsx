import { FC } from "react";
import logo from '../../assets/logo.png'

const navbar: FC = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full  bg-gray-800 border-b  dark:border-gray-700">
        <div className="px-3  lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <a  className="flex">
                <img
                  src={logo}
                  className="h-20 py-5 pl-3"
                  alt="Logo"
                />
              </a>
            </div>
            <div className="flex items-center">
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default navbar;
