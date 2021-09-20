import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import TasksPanel from "./TasksPanel";

test("render component", () => {
  const component = render(<TasksPanel />);
  console.log(component);
});