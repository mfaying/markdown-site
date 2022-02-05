import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import s from "./index.m.scss";

const Nav: React.FC = () => {
  return (
    <nav className={s.nav}>
      {config.map(({ title, children }) => {
        return (
          <div key={title}>
            <div>{title}</div>
            <div>
              {children.map((childConf) => {
                const { path, title } = childConf;

                return (
                  <div className={s.subNavItem} key={path}>
                    <Link to={path}>{title}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default Nav;
