import { FC, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { Product } from "../bill/Bill";
import { deleteProductById, getAllProduct } from "../../service/product";
import Spinner from "../../components/spinner/Spinner";

const ProductList: FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  const loadCustomerList = async () => {
    try {
      getAllProduct().then((res: Product[]) => {
        setProductList(res);
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handelDeleteCustomer = async (productId: string) => {
    try {
      deleteProductById(productId).then(() => {
        toast.success("ลบข้อมูลสินค้าสำเร็จ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        loadCustomerList();
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    loadCustomerList();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-7">
        <p className="font-bold  text-2xl">ข้อมูลสินค้า</p>
        <Link to="/products/create">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            + เพิ่มสินค้า
          </button>
        </Link>
      </div>
      {productList.length === 0 ? (
        <Spinner />
      ) : (
        <table className="border-collapse border border-slate-500 table-fixed w-full">
          <thead className=" bg-gray-500">
            <tr>
              <th className="border border-slate-600 w-4/6 py-2">
                รายการสินค้า
              </th>
              <th className="border border-slate-600 w-1/6 py-2">ราคา/หน่วย</th>
              <th className="border border-slate-600 w-1/6 py-2">แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item: Product, index: number) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-700 py-2 px-4">
                    {item.product_name}
                  </td>
                  <td className="border border-slate-700 py-2  px-4">
                    {Number(item.price).toLocaleString("en-US")}
                  </td>
                  <td className="border border-slate-700 py-2  px-4 flex justify-center">
                    <Link to="/products/create" state={{ item }}>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                      >
                        <FiEdit className="text-xl" />
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handelDeleteCustomer(item.id ?? "")}
                      className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                    >
                      <RiDeleteBin5Line className="text-xl" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
