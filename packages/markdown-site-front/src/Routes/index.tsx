import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
