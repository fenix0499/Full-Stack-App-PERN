import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import StatsPanel from "./StatsPanel";

test("render component", () => {
  const component = render(<StatsPanel />);
  console.log(component);
});