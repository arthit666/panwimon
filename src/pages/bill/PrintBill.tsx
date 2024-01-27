import { FC, useEffect, useRef, useState } from "react";
import InvoiceTemplate from "../../components/invoiceTemplate/InvoiceTemplate";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { Bill } from "./Bill";

const PrintBill: FC = () => {
  const [billPayload, setBillPayload] = useState<Bill>();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@media print {
      @page {
        size: 9.5in 5.5in;
        margin: 0;
      }
    }`,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { bill } = location.state || { bill: null };

  const handleOnClickEdit = () => {
    navigate("/", { state: { billPayload } });
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
          className="text-white mb-2 bg-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          แก้ไข
        </button>
        <button
          onClick={handlePrint}
          className="text-white mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          พิมพ์
        </button>
      </div>

      <InvoiceTemplate bill={bill} forwardRef={componentRef} />
    </div>
  );
};

export default PrintBill;
