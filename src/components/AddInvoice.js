import React, { useState, useContext, useRef } from "react";
import "../styles/AddInvoice.css";
import AddLineOutput from "./AddLineOutput";
import AddInvoiceInfo from "./AddInvoiceInfo";
import AddLineTable from "./AddLineTable";
import { Invoices } from "../contexts/InvoiceContext";
import { useHistory } from "react-router-dom";
import { makeID } from "../functions";
import emailjs from "emailjs-com";

function AddInvoice() {
  const history = useHistory();
  const animateEl = useRef();
  //error-success animation
  const [infoText, setInfoText] = useState("");
  const [infoType, setInfoType] = useState(""); //error-success

  //customer info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [billTo, setBillTo] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  //line info
  const [lineName, setLineName] = useState("");
  const [linePiece, setLinePiece] = useState(0);
  const [linePrice, setLinePrice] = useState(0);
  const [lines, setLines] = useState([]);

  const [total, setTotal] = useState(0);
  const [isThere, setIsThere] = useState(false);

  //context
  const { invoices, setInvoices } = useContext(Invoices);

  console.log(invoices);

  const sendEmail = (e) => {
    e.preventDefault();
    if (isThere) {
      setIsThere(true);
    } else {
      emailjs
        .sendForm(
          "service_td6fkhk",
          "template_n2sjqnn",
          e.target,
          "user_UrNq4jgNRJV4drABIeLwL"
        )
        .then(
          (result) => {
            history.push("/");
          },
          (error) => {
            console.log(error.text);
          }
        );
      e.target.reset();
      setIsThere(false);
    }
  };

  //info-error animation
  const triggerAnimation = () => {
    if (animateEl.current) {
      animateEl.current.style.animation = "move 3s ease";
      setTimeout(() => {
        if (animateEl.current.style.animation === "") {
          return;
        } else {
          animateEl.current.style.animation = "";
        }
      }, 3000);
    }
  };

  //add new line to invoice
  const newLine = (e) => {
    e.preventDefault();
    if (
      lineName !== "" &&
      linePrice !== 0 &&
      linePrice !== "" &&
      linePiece !== 0 &&
      linePiece !== ""
    ) {
      const findName = lines.find((line) => lineName === line.name);
      if (findName) {
        setInfoText("There is already a line with the same name.");
        setInfoType("error");
        triggerAnimation();
      } else {
        const newObj = {
          id: makeID(50, 0, 1000000000),
          name: lineName,
          price: linePrice,
          piece: linePiece,
        };

        setLines([...lines, newObj]);
        setTotal(total + linePrice * linePiece);
      }
    } else {
      setInfoText("Cannot be empty!");
      setInfoType("error");
      triggerAnimation();
    }
  };

  //create invoice
  const newInvoice = () => {
    if (
      name === "" ||
      id === 0 ||
      email === "" ||
      billTo === "" ||
      dueDate === "" ||
      description === ""
    ) {
      setInfoText("Cannot be empty!");
      setInfoType("error");
      triggerAnimation();
    } else {
      const findID = invoices.find((invoice) => id === invoice.customerID);
      if (findID) {
        setIsThere(true);
        setInfoText("This customer id already exists.");
        setInfoType("error");
        triggerAnimation();
      } else {
        setIsThere(false);
        const newObj = {
          id: makeID(50, 0, 1000000),
          nameSurname: name,
          customerID: id,
          email: email,
          billTo: billTo,
          dueDate: dueDate,
          lines: [...lines],
          total: total,
          paid: false,
          description: description,
        };
        setInvoices([...invoices, newObj]);
      }
    }
  };

  return (
    <form
      className="container d-flex justify-content-center"
      onSubmit={(e) => sendEmail(e)}
    >
      <p
        id="animate"
        className={infoType === "error" ? "animate-error" : "animate-success"}
        ref={animateEl}
      >
        {infoText}
      </p>
      <div className="add-invoice-container ">
        <AddInvoiceInfo
          setName={setName}
          setEmail={setEmail}
          setId={setId}
          setBillTo={setBillTo}
          setDueDate={setDueDate}
          setDescription={setDescription}
        />
        <AddLineTable
          setLineName={setLineName}
          setLinePiece={setLinePiece}
          setLinePrice={setLinePrice}
          total={total}
          newLine={newLine}
        />

        {lines.map((line) => {
          return (
            <AddLineOutput
              key={line.id}
              id={line.id}
              name={line.name}
              piece={line.piece}
              price={line.price}
              lines={lines}
              setLines={setLines}
              total={total}
              setTotal={setTotal}
            />
          );
        })}
        <button
          onClick={newInvoice}
          disabled={
            lines.length === 0 ||
            name === "" ||
            id === 0 ||
            billTo === "" ||
            email === "" ||
            dueDate === ""
              ? true
              : false
          }
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
}

export default AddInvoice;
