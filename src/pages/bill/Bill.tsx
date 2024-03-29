import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import ProductInput from "../../components/productInput/ProductInput";
import { Customer } from "../customers/CustomerCreate";
import { useLocation, useNavigate } from "react-router-dom";
import InputFilter from "../../components/inputFilter/InputFilter";
import { getAllCustomer } from "../../service/customer";
import { getAllProduct } from "../../service/product";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../components/spinner/Spinner";
import { queryBillByDate } from "../../service/bill";
export interface Bill {
  id?: string
  bill_number?: string;
  customer: Customer;
  car_name: string;
  car_number: string;
  product_list: Product[];
}

export interface Product {
  id?: string;
  product_name: string;
  price: number;
  quantity?: number;
}

const Bill: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { billPayload } = location.state || { billPayload: null };
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [billNumber, setBillNumber] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<Bill>({
    customer: {
      name: "",
      address: "",
      phone: "",
    },
    car_name: "",
    car_number: "",
    product_list: [
      {
        id: "",
        product_name: "",
        price: 0,
        quantity: 0,
      },
    ],
  });

  useEffect(() => {
    try {
      setLoading(true);
      if (billPayload != null) {
        setBill(billPayload);
      }
      loadCustomerList();
      loadProductList();
      loadBill();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadBill = () => {
    const prefix = "INV";
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    queryBillByDate(currentDate)
      .then((invoices: Bill[]) => {
        if (invoices.length == 0) {
          console.log('bill num',invoices.length)
          return setBillNumber(`${prefix}-${currentDate}-${1}`);
        } else {
         let formattedCount = getBillNumber(invoices[invoices.length-1].bill_number ?? '')
         console.log('bill num',(formattedCount ?? 0) + 1)
          return setBillNumber(`${prefix}-${currentDate}-${(formattedCount ?? 0) + 1}`);
        }
      })
      .catch((error) => {
        console.error("Error querying invoices by date:", error);
      });
  };

  const getBillNumber = (bill_number: string): number | undefined => {
    const matchResult = bill_number.match(/INV-\d{8}-(\d+)/);

    if (matchResult && matchResult[1]) {
      const invoiceCount = parseInt(matchResult[1], 10);
      return invoiceCount;
    } else {
      console.error("Invalid invoice number format");
    }
  };

  const handleOnChangeCustomer = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBill((perv) => {
      return {
        ...perv,
        customer: {
          ...perv.customer,
          [name]: value,
        },
      };
    });
  };

  const handleOnChangeCar = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBill((perv) => {
      return {
        ...perv,
        [name]: value,
      };
    });
  };

  const handleOnClickAddProduct = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (bill.product_list.length == 5) return;
    setBill((prev) => {
      return {
        ...prev,
        product_list: [
          ...prev.product_list,
          {
            id: "",
            product_name: "",
            price: 0,
            quantity: 0,
          },
        ],
      };
    });
  };

  const handleOnClickSummit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const listBill = bill.product_list.filter(
      (product: Product) => product.product_name != ""
    );
    navigate("/print", {
      state: {
        bill: {
          ...bill,
          bill_number: billNumber,
          product_list: listBill,
        },
      },
    });
  };

  const handleDeleteProduct = (index: number) => {
    setBill((prev) => {
      const listTmp = [...prev.product_list];
      listTmp.splice(index, 1);
      return {
        ...prev,
        product_list: listTmp,
      };
    });
  };

  const handleChangeProduct = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setBill((prev) => {
      const updatedProductList = [...prev.product_list];
      const updatedProduct = { ...updatedProductList[index], [name]: value };
      updatedProductList[index] = updatedProduct;

      return {
        ...prev,
        product_list: updatedProductList,
      };
    });
  };

  const handleSelectProduct = (index: number, productId: string) => {
    setBill((prev) => {
      const selectedProduct: Product | undefined = productList.find(
        (product: Product) => product.id === productId
      );
      if (selectedProduct === undefined) return prev;
      const updatedProductList = [...prev.product_list];
      updatedProductList[index] = selectedProduct;

      console.log(updatedProductList);
      return {
        ...prev,
        product_list: updatedProductList,
      };
    });
  };

  const handleSearch = (query: string, isSuggestion: boolean) => {
    if (isSuggestion) {
      setBill((perv) => {
        const selectedCustomer = customerList.find(
          (customer: Customer) => customer.id === query
        );
        return {
          ...perv,
          customer: selectedCustomer || { name: "", address: "", phone: "" },
        };
      });
    } else {
      setBill((perv) => {
        return {
          ...perv,
          customer: {
            ...perv.customer,
            name: query,
          },
        };
      });
    }
  };

  const loadCustomerList = async () => {
    try {
      getAllCustomer().then((res: Customer[]) => {
        setCustomerList(res);
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const loadProductList = async () => {
    try {
      getAllProduct().then((res: Product[]) => {
        setProductList(res);
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="p-10">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <p className="font-bold  text-2xl mb-5">สร้างบิล</p>
          <div className="mb-5 border-b-2 border-slate-500 flex items-start justify-start gap-10 ">
            <div>
              <div className="mb-5 w-96">
                <InputFilter
                  value={bill.customer.name}
                  onSearch={handleSearch}
                  customerList={customerList}
                />
              </div>
              <div className="mb-5">
                <label form="adress" className="block mb-2 text-sm font-medium">
                  ที่อยู่ลูกค้า
                </label>
                <textarea
                  name="address"
                  rows={4}
                  value={bill.customer.address}
                  onChange={handleOnChangeCustomer}
                  className="shadow-sm-light bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white"
                ></textarea>
              </div>
              <div className="mb-5">
                <label form="phone" className="block mb-2 text-sm font-medium">
                  เบอร์โทร
                </label>
                <input
                  type="phone"
                  name="phone"
                  value={bill.customer.phone}
                  onChange={handleOnChangeCustomer}
                  className="shadow-sm-light bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white"
                />
              </div>
              <button
                onClick={handleOnClickAddProduct}
                className="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                + เพิ่มสินค้า
              </button>
            </div>
            <div>
              <div className="mb-5 w-96">
                <label
                  form="truck_name"
                  className="block mb-2 text-sm font-medium "
                >
                  ชื่อรถ
                </label>
                <input
                  type="text"
                  name="car_name"
                  value={bill.car_name}
                  onChange={handleOnChangeCar}
                  className="shadow-sm-light bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white"
                />
              </div>

              <div className="mb-5 w-96">
                <label
                  form="truck_name"
                  className="block mb-2 text-sm font-medium"
                >
                  เลขทะเบียนรถ
                </label>
                <input
                  type="text"
                  name="car_number"
                  value={bill.car_number}
                  onChange={handleOnChangeCar}
                  className="shadow-sm-light bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white"
                />
              </div>
            </div>
          </div>

          <div className="mb-5 pb-4 border-b-2 border-slate-500 ">
            {bill.product_list.map((product: Product, index: number) => (
              <ProductInput
                key={uuidv4()}
                product={product}
                index={index}
                product_list={productList}
                onDeleteProduct={handleDeleteProduct}
                onSelectedProduct={handleSelectProduct}
                onChangeProduct={handleChangeProduct}
              />
            ))}
          </div>

          <button
            onClick={handleOnClickSummit}
            className="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            สร้างบิล
          </button>
        </div>
      )}
    </div>
  );
};

export default Bill;
