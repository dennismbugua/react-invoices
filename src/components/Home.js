import React, { useContext, useState } from "react";
import { Invoices } from "../contexts/InvoiceContext";
import "../styles/Home.css";
import SearchInvoice from "./SearchInvoice";
// import PaidInvoices from "./PaidInvoices";
// import UnPaidInvoices from "./UnPaidInvoices";
import Paids from "./Paids";

function Home() {
  const [search, setSearch] = useState("");
  const { invoices } = useContext(Invoices);

  return (
    <div className="home-container container">
      <SearchInvoice setSearch={setSearch} />
      <Paids invoices={invoices} search={search} />
      {/* <UnPaidInvoices invoices={invoices} search={search} />
      <PaidInvoices invoices={invoices} search={search} /> */}
    </div>
  );
}

export default Home;
