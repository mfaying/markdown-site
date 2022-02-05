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
      const { path, MDPath } = childConf;

      routes.push({
        path,
        element: <Markdown path={MDPath} key={path} />,
      });
    });
  });

  return routes;
};

const routes = getRoutes();

export default routes;
