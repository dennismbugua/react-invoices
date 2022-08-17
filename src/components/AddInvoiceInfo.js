import React from "react";

function AddInvoiceInfo(props) {
  return (
    <>
      <h2>Invoice</h2>

      <label>Name & Surname</label>
      <input
        type="text"
        onChange={(e) => {
          props.setName(e.target.value);
        }}
        name="name"
      />
      <label>E-Mail</label>
      <input
        type="email"
        onChange={(e) => {
          props.setEmail(e.target.value);
        }}
        name="to_email"
      />
      <label>Customer ID</label>
      <input
        type="number"
        onChange={(e) => {
          props.setId(e.target.value);
        }}
        min="0"
        step="0"
        onKeyUp={(e) => {
          if (e.target.value < 0) e.target.value = Math.abs(e.target.value);
        }}
        name="customer_id"
      />

      <label>Bill To</label>
      <input
        type="text"
        onChange={(e) => {
          props.setBillTo(e.target.value);
        }}
        name="bill_to"
      />

      <label>Description</label>
      <textarea
        rows="4"
        cols="4"
        onChange={(e) => {
          props.setDescription(e.target.value);
        }}
        name="description"
      ></textarea>

      <label>Due Date</label>
      <input
        type="date"
        onChange={(e) => {
          props.setDueDate(e.target.value);
        }}
        name="due_date"
      />
    </>
  );
}

export default AddInvoiceInfo;
