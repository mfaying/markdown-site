import React from "react";
import Markdown from "../Markdown";
import config from "../config";

interface IRoute {
  path: string;
  element: React.ReactNode;
}

const getRoutes = () => {
  const routes: IRoute[] = [];

  config.forEach((conf) => {
    conf.children.forEach((childConf) => {
      routes.push({
        path: childConf.path,
        element: <Markdown path={childConf.md} key={childConf.md} />,
      });
    });
  });

  return routes;
};

const routes = getRoutes();

export default routes;
