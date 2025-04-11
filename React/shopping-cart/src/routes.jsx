import { Children, Component } from "react";
import App from "./App";
import Home from "./Pages/Home/Home";
import Shopping from "./Pages/Shopping/Shopping";

const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        Component: Shopping,
        path: "shopping-cart",
      },
    ],
  },
];

export default routes;
