import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Customer } from "../../pages/customers/CustomerCreate";

interface CustomerSearchProps {
  value: string;
  customerList: Customer[];
  onSearch: (query: string, isSuggestion: boolean) => void;
}

const InputFilter: FC<CustomerSearchProps> = ({ onSearch, customerList,value }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query, false);

    setShowSuggestions(
      customerList.some((customer) =>
        customer.name.toLowerCase().includes(query)
      )
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (id: string, selectedValue: string) => {
    setSearchQuery(selectedValue);
    onSearch(id, true);
    setShowSuggestions(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-5 w-96 relative" ref={inputRef}>
      <label
        htmlFor="search"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        ชื่อลูกค้า
      </label>
      <input
        type="text"
        id="search"
        name="search"
        value={value}
        onChange={handleInputChange}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      />
      {showSuggestions && searchQuery && (
        <ul className="absolute top-20 left-0 bg-white border border-gray-300 w-full z-10 py-2 px-4 rounded-lg text-sm text-black">
          {customerList
            .filter((customer: Customer) =>
              customer.name.toLowerCase().includes(searchQuery)
            )
            .map((customer: Customer, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(customer.id ?? "", customer.name)
                  }
                >
                  {customer.name}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default InputFilter;
