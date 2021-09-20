import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import MenuTop from "./MenuTop";

test("render component", () => {
  const component = render(<MenuTop />);
  console.log(component);
});