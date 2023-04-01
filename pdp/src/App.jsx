import React from "react";
import ReactDOM from "react-dom";

import Header from "home/Header";
import Footer from "home/Footer";

import SafeComponent from "./SafeComponent";


import "./index.scss";

/* THe component is wrapped within an error broundary to analyze and handle the error here in the os React, and
appropriate measures can be used in case of any other frameworks to handle any issues, like missing props...etc*/

const App = () => (

  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <SafeComponent>
      <Header />
    </SafeComponent>
    <h1 className="mt-1 mb-10">PDP Page Content</h1>
    <Footer />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));