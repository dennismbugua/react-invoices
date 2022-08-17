import React, { useEffect, useState, useContext } from "react";
import { Accordion, Card } from "react-bootstrap";
import { nFormatter } from "../functions";
import { MdPayment } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "../styles/HomeAccordion.css";
import { Invoices } from "../contexts/InvoiceContext";

function HomeAccordion(props) {
  const [dayDiff, setDayDiff] = useState(0);
  const { invoices, setInvoices } = useContext(Invoices);

  useEffect(() => {
    setDayDiff(
      parseInt(
        (new Date() - new Date(props.invoice.dueDate)) / (1000 * 60 * 60 * 24),
        10
      )
    );
  }, []);

  const dateDiffColor = () => {
    if (dayDiff <= 14 && dayDiff >= 8) {
      return "u-green-txt";
    } else if (dayDiff <= 7 && dayDiff >= 4) {
      return "u-orange-txt";
    } else if (dayDiff <= 3 && dayDiff >= 0) {
      return "u-yellow-txt";
    } else if (dayDiff < 0 || dayDiff >= 15) {
      return "u-red-txt";
    }
  };

  const payInvoice = () => {
    const index = invoices.indexOf(props.invoice);
    if (index !== -1) {
      props.invoice.paid = true;
      invoices.splice(index, 1);
      setInvoices([...invoices, props.invoice]);
    }
  };

  const deleteInvoice = () => {
    const index = invoices.indexOf(props.invoice);
    if (index !== -1) {
      invoices.splice(index, 1);
      setInvoices([...invoices]);
    }
  };

  return (
    <>
      <Accordion defaultActiveKey={props.invoice.id} className="container">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div className=" invoice-container  d-flex align-items-start justify-content-between">
              <div className="container-consumer ">
                <div className="consumer-info d-flex align-items-center">
                  <h3>{props.invoice.nameSurname}</h3>
                  <p>Consumer ID: {props.invoice.customerID}</p>
                  <svg viewBox="0 0 451.847 451.847">
                    <path
                      d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                    />
                  </svg>
                </div>
                <p className="bill-to">Bill To: {props.invoice.billTo}</p>
              </div>
              {props.invoice.paid === false ? (
                <div>
                  <div className={dateDiffColor()}>
                    {dayDiff >= 0 && dayDiff <= 14 ? (
                      <p>
                        Due Date: {props.invoice.dueDate} | Last {dayDiff} days.
                      </p>
                    ) : (
                      <p>The last payment date has passed.</p>
                    )}
                  </div>
                  <div className="actions d-flex align-items-center justify-content-end">
                    {dayDiff < 0 || dayDiff > 14 ? (
                      ""
                    ) : (
                      <button onClick={payInvoice}>
                        <MdPayment size="24" />
                      </button>
                    )}
                    <button onClick={() => deleteInvoice()}>
                      <AiFillDelete size="24" />
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p className="description">{props.invoice.description}</p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Piece</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {props.invoice.lines.map((line) => {
                    return (
                      <tr key={line.id}>
                        <td>{line.name}</td>
                        <td>{line.piece}</td>
                        <td>{parseFloat(line.price).toLocaleString()} $</td>
                        <td>
                          {nFormatter(line.piece * line.price).toLocaleString()}{" "}
                          $
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <b>
                        {nFormatter(props.invoice.total.toLocaleString())} $
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default HomeAccordion;
