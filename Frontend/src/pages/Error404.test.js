import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Error404 from "./Error404";

test("render component", () => {
  const component = render(<Error404 />);
  console.log(component);
});