import { FC } from "react";
import { Link } from "react-router-dom";

const Sidebar: FC = () => {
  return (
    <>
      <aside className="fixed top-0 text-white left-0 z-30 h-full w-64 pt-20 border-r border-gray-700">
        <div className="px-3 pt-2">
          <ul className="font-medium">
            <Link
              to="/"
              className="flex items-center py-3 px-2 text-gray-900 rounded-lg hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="flex-1 ms-3 text-white">รายงาน</span>
            </Link>
            <Link
              to="/create_bill"
              className="flex items-center py-3 px-2 text-gray-900 rounded-lg hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
              </svg>
              <span className="flex-1 ms-3 text-white">สร้างบิล</span>
            </Link>
            <Link
              to="/customers"
              className="flex items-center py-3 px-2 text-gray-900 rounded-lg hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span className="flex-1 ms-3 text-white">ลูกค้า</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center py-3 px-2 text-gray-900 rounded-lg hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="flex-1 ms-3 text-white">สินค้า</span>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
