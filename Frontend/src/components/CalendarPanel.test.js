import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import CalendarPanel from "./CalendarPanel";

test("render component", () => {
  const component = render(<CalendarPanel />);
  console.log(component);
});