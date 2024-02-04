import React, { useEffect, useState } from "react";
import { Bill, Product } from "../bill/Bill";
import Spinner from "../../components/spinner/Spinner";
import { queryBillByDate } from "../../service/bill";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard: React.FC = () => {
  const [billList, setBillList] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const loadBillList = async (payload: string | null) => {
    try {
      setLoading(true);
      const currentDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      queryBillByDate(payload == null ? currentDate : payload).then(
        (res: Bill[]) => {
          setBillList(res);
          setLoading(false);
        }
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date == null) return;
    setSelectedDate(date);
    loadBillList(formatDate(date));
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  useEffect(() => {
    loadBillList(null);
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-7">
        <p className="font-bold  text-2xl">ข้อมูลบิล</p>
 
        <div className="flex items-center gap-2">
        <p className="font-bold text-lg">เลือกวันที่ :</p>
        <div className="relative w-36">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-non z-50">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <DatePicker
            id="datepicker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            className=" border text-sm rounded-lg w-full ps-10 p-2.5  bg-gray-700 border-gray-600 text-white text-center"
          />
        </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="border-collapse border border-slate-500 table-fixed w-full">
          <thead className=" bg-gray-500">
            <tr>
              <th className="border border-slate-600 py-2">เลขที่บิล</th>
              <th className="border border-slate-600 py-2">ทะเบียรรถ</th>
              <th className="border border-slate-600 py-2">ชื่อลูกค้า</th>
              <th className="border border-slate-600 py-2">รายการสินค้า</th>
              <th className="border border-slate-600 py-2">จำนวน</th>
              <th className="border border-slate-600 py-2">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {billList.map((item: Bill) => {
              return (
                <tr key={uuidv4()}>
                  <td
                    className="border border-slate-700 py-2 px-4"
                    style={{ verticalAlign: "top" }}
                  >
                    {item.bill_number}
                  </td>
                  <td
                    className="border border-slate-700 py-2 px-4"
                    style={{ verticalAlign: "top" }}
                  >
                    {item.car_number}
                  </td>
                  <td
                    className="border border-slate-700 py-2 px-4"
                    style={{ verticalAlign: "top" }}
                  >
                    {item.customer.name}
                  </td>
                  <td
                    className="border border-slate-700 py-2 px-4"
                    style={{ verticalAlign: "top" }}
                  >
                    {item.product_list.map((product: Product) => {
                      return <div key={uuidv4()}>{product.product_name}</div>;
                    })}
                  </td>

                  <td
                    className="border border-slate-700 py-2 px-4"
                    style={{ verticalAlign: "top" }}
                  >
                    {item.product_list.map((product: Product) => {
                      return (
                        <div key={uuidv4()}>
                          {Number(product.quantity).toLocaleString("en-US")}
                        </div>
                      );
                    })}
                  </td>
                  <td
                    className="border border-slate-700 py-2 px-4"
                    style={{ verticalAlign: "top" }}
                  >
                    {item.product_list.map((product: Product) => {
                      return (
                        <div key={uuidv4()}>
                          {Number(product.price).toLocaleString("en-US")}
                        </div>
                      );
                    })}
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

export default Dashboard;
