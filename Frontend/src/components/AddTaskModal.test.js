import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import AddTaskModal from "./AddTaskModal";

test("render component", () => {
  const component = render(<AddTaskModal />);
  console.log(component);
});
