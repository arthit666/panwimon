import { FC } from "react";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/Sidebar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Bill from "./pages/bill/Bill";
import CustomerCreate from "./pages/customers/CustomerCreate";
import PrintBill from "./pages/bill/PrintBill";
import CustomersList from "./pages/customers/CustomersList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./pages/products/ProductList";
import ProductCreate from "./pages/products/ProductCreate";

const App: FC = () => {
  const Layout = () => {
    return (
      <div>
        <ToastContainer />
        <div className=" text-white">
          <Navbar />
          <SideBar />
          <div className="pt-20 fixed right-0 bottom-0 pl-64 h-full w-full overflow-y-auto  bg-gray-800 text-white pr-3 bg">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Bill />,
        },
        {
          path: "/print",
          element: <PrintBill />,
        },
        {
          path: "/customers",
          element: <CustomersList />,
        },
        {
          path: "/customers/create",
          element: <CustomerCreate />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/create",
          element: <ProductCreate />,
        },
      ],
    },
    // {
    //   path: "/login",
    //   element: <div />,
    // },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
