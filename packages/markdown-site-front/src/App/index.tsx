import React from "react";
import { HashRouter } from "react-router-dom";
import Nav from "./Nav";
import Routes from "../Routes";
import s from "./index.m.scss";

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className={s.page}>
        <Nav />
        <main className={s.main}>{<Routes />}</main>
      </div>
    </HashRouter>
  );
};

export default App;
