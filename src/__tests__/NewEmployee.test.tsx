import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NewEmployeeWithAuthentication from "../pages/employees/new-employees";

const renderNewEmployeePage = () =>{
	const { container } = render(
		<MemoryRouter>
        <ToastContainer />
        <NewEmployeeWithAuthentication />
      </MemoryRouter>
    );

	return container;
};

describe("Test ==>  New Employee page", () => {
  test("renders correctly", () => {
    const container  = renderNewEmployeePage();
    expect(container).toMatchSnapshot();
  });

  // TEST 3
  test("Valid username, password: ", async () => {
    const container  = renderNewEmployeePage();
    const emailInput = screen.getByLabelText("username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "kminchelle" } });
    fireEvent.change(passwordInput, { target: { value: "0lelplR" } });
    fireEvent.click(submitButton);

    expect(emailInput.value).toBe("kminchelle");
    expect(passwordInput.value).toBe("0lelplR");

    await waitFor(() => {
      const profilePageHeading = screen.getByText("Profile pages", {
        selector: "p",
      });
      expect(profilePageHeading).toBeInTheDocument();
    });
  });
});
