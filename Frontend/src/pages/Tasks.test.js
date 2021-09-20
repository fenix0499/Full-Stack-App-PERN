import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Tasks from "./Tasks";

test("render component", () => {
  const component = render(<Tasks />);
  console.log(component);
});