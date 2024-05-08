import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Accordian from "~/components/Accordion";

test("accordian", () => {
  render(<Accordian content="context" header="header" />);
  expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
});
