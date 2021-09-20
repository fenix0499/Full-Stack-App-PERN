import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("render component", () => {
  const component = render(<LoginForm />);
  console.log(component);
});