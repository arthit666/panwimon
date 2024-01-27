import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { Product } from '../bill/Bill';
import { createProduct, editProductById } from '../../service/product';

const ProductCreate: FC = () => {
  const location = useLocation();
  const { item } = location.state || { item: null };
  const navigate = useNavigate();
  const [product, setProductList] = useState<Product>({
    product_name: "",
    price: 0,
  });

const [loading,setLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log(item);
    try {
      if (item != null) {
        setProductList(item);
      }
    } catch (error) {
      console.log(error);
    }
  }, [item]);

  const handleOnChenge = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setProductList((prevState) => {
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
        await createProduct(product);
        toast.success("เพิ่มข้อมูลสินค้าใหม่สำเร็จ", {
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
        await editProductById(item.id, product);
        toast.success("แก้ไขข้อมูลสินค้าสำเร็จ", {
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
      navigate("/products");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="p-10">
    <p className="font-bold  text-2xl">เพิ่มสินค้า</p>
    <form className="max-w-sm  mt-10" onSubmit={handleOnSubmit}>
      <div className="mb-5">
        <label
          form="product_name"
          className="block mb-2 text-sm font-medium text-white"
        >
          ชื่อสินค้า
        </label>
        <input
          type="name"
          name="product_name"
          value={product.product_name}
          onChange={handleOnChenge}
          className="shadow-sm-light bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white"
          required
        />
      </div>
      
      <div className="mb-5">
        <label
          form="price"
          className="block mb-2 text-sm font-medium text-white"
        >
          ราคา/หน่วย
        </label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleOnChenge}
          className="shadow-sm-light bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white"
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
  )
}

export default ProductCreate