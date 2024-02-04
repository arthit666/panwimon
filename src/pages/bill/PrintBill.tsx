import { FC, useEffect, useRef, useState } from "react";
import InvoiceTemplate from "../../components/invoiceTemplate/InvoiceTemplate";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { Bill} from "./Bill";
import { createBill } from "../../service/bill";

const PrintBill: FC = () => {
  const [billPayload, setBillPayload] = useState<Bill>();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onPrintError: (e) => console.log(e),
    pageStyle: `@media print {
      @page {
        size: 9.5in 5.5in;
        margin: 0;
      }
    }`,
    onAfterPrint:async ()=>{
      try {
        if (bill === null || billPayload === undefined) return;
        await createBill(billPayload)
        navigate("/create_bill", {
          state: {
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
          },
        });
      } catch (error) {
        console.log("Error:", error);
      }
    }
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { bill } = location.state || { bill: null };

  const handleOnClickEdit = () => {
    navigate("/create_bill", { state: { billPayload } });
  };

  useEffect(() => {
    try {
      if (bill != null) {
        setBillPayload(bill);
      }
    } catch (error) {
      console.log(error);
    }
  }, [bill]);

  return (
    <div className="p-10">
      <div className="gap-5 flex">
        <button
          onClick={handleOnClickEdit}
          disabled={!billPayload}
          className="text-white mb-2 bg-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          แก้ไข
        </button>
        <button
          onClick={handlePrint}
          disabled={!billPayload}
          className="text-white mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          พิมพ์
        </button>
      </div>

      <InvoiceTemplate
        bill={bill}
        forwardRef={componentRef}
      />
    </div>
  );
};

export default PrintBill;
