import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route path={path} element={element} key={index} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
