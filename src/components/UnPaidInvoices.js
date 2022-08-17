import React from "react";
import HomeAccordion from "./HomeAccordion";

function UnPaidInvoices({ invoices, search }) {
  return (
    <>
      {invoices && (
        <div>
          <div className="base-header">
            <h2>Unpaid Invoices</h2>
            <div className="header-border"></div>
          </div>
          {invoices
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
            .filter((invoice) => {
              return invoice.paid === false;
            })
            .map((invoice) => {
              return <HomeAccordion invoice={invoice} key={invoice.id} />;
            })}
        </div>
      )}
    </>
  );
}

export default UnPaidInvoices;
