import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import CreateAcountForm from "./CreateAcountForm";

test("render component", () => {
  const component = render(<CreateAcountForm />);
  console.log(component);
});