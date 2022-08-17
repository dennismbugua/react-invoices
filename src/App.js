import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import AddInvoice from "./components/AddInvoice";
import Navbar from "./components/Navbar";
import { Invoices } from "./contexts/InvoiceContext";
import { useState } from "react";
import data from "./data";

function App() {
  const [invoices, setInvoices] = useState(data);

  return (
    <Invoices.Provider value={{ invoices, setInvoices }}>
      <div className="App">
        {/* <p id="animate" className="animate-success"></p> */}
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/add-invoice" component={AddInvoice} />
          </Switch>
        </Router>
      </div>
    </Invoices.Provider>
  );
}

export default App;
