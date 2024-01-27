import { FC, RefObject, useEffect, useState } from "react";
import logo from "../../assets/logo_blue.png";
import { Bill, Product } from "../../pages/bill/Bill";
import { getCurrentDateTimeFormatted } from "../../utils/DateTime";

interface IInvoice {
  forwardRef: RefObject<HTMLDivElement>;
  bill: Bill;
  bill_number: string
}

const InvoiceTemplate: FC<IInvoice> = ({ forwardRef, bill, bill_number }) => {
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    const totalSum = bill.product_list.reduce(
      (accumulator, product) => accumulator + product.price * (product.quantity ?? 0),
      0
    );
    setSumPrice(totalSum);
  }, [bill.product_list]);


  return (
    <div className="p-10 bg-gray-300 mt-5">
      <div ref={forwardRef} className="mx-auto bg-white text-black p-10">
        <div className="flex justify-between items-end border-b-2 pb-4 px-2 mb-2 text-sm">
          <div className="w-48">
            <img alt="panwimon" src={logo} />
          </div>
          <div className="text-2xl">ใบส่งของ</div>
          <div>เลขที่ใบส่งของ {bill_number}</div>
        </div>

        <div className="flex justify-between pb-1 border-b-2 px-2 mb-2 text-sm">
          <div>
            <div>ชื่อบริษัทลูกค้า {bill.customer.name}</div>
            <div>ที่อยู่ลูกค้า {bill.customer.address}</div>
            <div>เบอร์โทร {bill.customer.phone}</div>
          </div>
          <div>
            <div>วันที่ {getCurrentDateTimeFormatted(true)}</div>
            <div>ชื่อรถ {bill.car_name}</div>
            <div>ทะเบียนรถ {bill.car_number}</div>
            <div>เวลาออกรถ {getCurrentDateTimeFormatted()}</div>
          </div>
        </div>

        <table className="border-collapse border border-slate-500 table-fixed w-full text-sm">
          <thead className=" bg-gray-200">
            <tr>
              <th className="border border-slate-600 py-2">รายการที่</th>
              <th className="border border-slate-600 py-2 w-3/6">รายการ</th>
              <th className="border border-slate-600 py-2">จำนวน</th>
              <th className="border border-slate-600 py-2">ราคา/หน่วย</th>
              <th className="border border-slate-600 py-2">จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            {bill.product_list.map((product: Product, index: number) => {
              return (
                <tr key={index} className="align-text-top">
                  <td className="px-4 py-1">{index + 1}</td>
                  <td className="border-x border-slate-600 px-4 py-1 w-3/6">
                    {product.product_name}
                  </td>
                  <td className="px-4 py-1"> {product.quantity}</td>
                  <td className="border-x border-slate-600 px-4 py-1">
                    {Number(product.price).toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-1">
                    {((product.quantity?? 0) * product.price).toLocaleString("en-US")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="relative">
          <table className="border-collapse table-fixed w-full text-sm">
            <thead className=" bg-white">
              <tr>
                <th className=" py-2"></th>
                <th className=" py-2 w-3/6"></th>
                <th className=" py-2"></th>
                <th className="border-x border-b border-slate-600 py-2">
                  รวมเงิน
                </th>
                <th className="border-x border-b border-slate-600 py-2 text-left px-4">
                  {sumPrice.toLocaleString("en-US")}
                </th>
              </tr>
            </thead>
          </table>
          <div className="text-base justify-between flex mb-5 absolute top-2">
            <div className="text-sm">
              โปรดตรวจรับสินค้าดังกล่าวให้ถูกต้องก่อนเซ็นรับ
            </div>
          </div>
        </div>

        <div className="text-sm pt-11 flex justify-between items-center">
          <div>ผู้ออกบิล ..................................</div>
          <div>ผู้ส่งของ ..................................</div>
          <div>ผู้รับของ ..................................</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
