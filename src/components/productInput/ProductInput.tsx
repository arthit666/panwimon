import {  ChangeEvent, FC } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Product } from "../../pages/bill/Bill";

interface ProductDetail {
  index: number;
  product: Product;
  product_list: Product[];
  onDeleteProduct: (index: number) => void;
  onSelectedProduct: (index: number, productId: string) => void;
  onChangeProduct: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
}

const ProductInput: FC<ProductDetail> = ({
  index,
  onDeleteProduct,
  product,
  product_list,
  onSelectedProduct,
  onChangeProduct,
}) => {
  return (
    <div className="flex items-end justify-start gap-10 mb-2">
      <div className=" w-2/4">
        <label
          form="default"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          สินค้ารายการที่ {index + 1}
        </label>
        <select
          id="default"
          value={product.id}
          onChange={(e) => onSelectedProduct(index, e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">
            เลือกสินค้า
          </option>
          {product_list.map((product: Product) => (
            <option key={product.id} value={product.id}>
              {product.product_name}
            </option>
          ))}
        </select>
      </div>

      <div className=" w-1/4">
        <label
          form="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          ราคา/หน่วย
        </label>
        <input
          type="number"
          name="price"
          value={product.price}     
          disabled
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>

      <div className=" w-1/4">
        <label
          form="quantity"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          จำนวน
        </label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={(e) => onChangeProduct(index, e)}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <button
        type="button"
        onClick={() => onDeleteProduct(index)}
        className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
      >
        <RiDeleteBin5Line className="text-xl" />
      </button>
    </div>
  );
};

export default ProductInput;
