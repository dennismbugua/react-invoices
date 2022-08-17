import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

function SearchInvoice({ setSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search in All Invoices..."
        className="search-invoice"
      />
      <HiOutlineSearch size="22" className="search-icon" color="#222" />
    </div>
  );
}

export default SearchInvoice;
