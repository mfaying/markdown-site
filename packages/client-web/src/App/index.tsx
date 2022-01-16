import React from "react";
import { BrowserRouter } from "react-router-dom";
import s from "./index.m.scss";
import Nav from "./Nav";
import Routes from "../Routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={s.page}>
        <Nav />
        <main className={s.main}>{<Routes />}</main>
      </div>
    </BrowserRouter>
  );
};

export default App;
