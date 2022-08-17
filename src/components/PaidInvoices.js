import React from "react";
import HomeAccordion from "./HomeAccordion";

function PaidInvoices({ invoices, search }) {
  return (
    <>
      {invoices && (
        <div>
          <div className="base-header">
            <h2>Paid Invoices</h2>
            <div className="header-border"></div>
          </div>
          {invoices
            .filter((invoice) => {
              return invoice.paid === true;
            })
            // eslint-disable-next-line array-callback-return
            .filter((invoice) => {
              if (search === "") {
                return invoice;
              } else if (
                invoice.nameSurname.toUpperCase().includes(search.toUpperCase())
              ) {
                return invoice;
              }
            })
            .map((invoice) => {
              return <HomeAccordion invoice={invoice} key={invoice.id} />;
            })}
        </div>
      )}
    </>
  );
}

export default PaidInvoices;
