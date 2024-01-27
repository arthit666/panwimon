import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { createCustomer, editCustomerById } from "../../service/customer";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Customer {
  id?: string;
  name: string;
  address: string;
  phone: string;
}

const CustomerCreate: FC = () => {
  const location = useLocation();
  const { item } = location.state || { item: null };
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    address: "",
    phone: "",
  });
  const [loading,setLoading] = useState<boolean>(false)

  useEffect(() => {
    try {
      if (item != null) {
        setCustomer(item);
      }
    } catch (error) {
      console.log(error);
    }
  }, [item]);

  const handleOnChenge = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setCustomer((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    try {
      if (item == null) {
        await createCustomer(customer);
        toast.success("เพิ่มข้อมูลลูกค้าใหม่สำเร็จ", {
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
      } else {
        await editCustomerById(item.id, customer);
        toast.success("แก้ไขข้อมูลลูกค้าสำเร็จ", {
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
      }
      setLoading(false)
      navigate("/customers");
    } catch (error) {
      console.log("Error:", error);
    }
  };
 
  return (
    <div className="p-10">
      <p className="font-bold  text-2xl">เพิ่มลูกค้า</p>
      <form className="max-w-sm  mt-10" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <label
            form="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ชื่อลูกค้า
          </label>
          <input
            type="name"
            name="name"
            value={customer.name}
            onChange={handleOnChenge}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <label
          form="adress"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          ที่อยู่ลูกค้า
        </label>
        <textarea
          name="address"
          value={customer.address}
          rows={4}
          onChange={handleOnChenge}
          className="block p-2.5 w-full text-sm mb-5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        ></textarea>
        <div className="mb-5">
          <label
            form="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            เบอร์โทร
          </label>
          <input
            type="phone"
            name="phone"
            value={customer.phone}
            onChange={handleOnChenge}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {item != null ? "Edit" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CustomerCreate;
