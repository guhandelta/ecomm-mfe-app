import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'


import Header from "home/Header";
import Footer from "home/Footer";
import PDPContent from "./PDPContent";

// import SafeComponent from "./SafeComponent";


import "./index.scss";

/* THe component is wrapped within an error broundary to analyze and handle the error here in the os React, and
appropriate measures can be used in case of any other frameworks to handle any issues, like missing props...etc*/

const App = () => (
  <Router>
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
        <Header />
        <div className="my-10">
          <Switch>
            <Route path="/product/:id" component={PDPContent} />
          </Switch>
        </div>
      <Footer />
    </div>
  </Router>
);
ReactDOM.render(<App />, document.getElementById("app"));