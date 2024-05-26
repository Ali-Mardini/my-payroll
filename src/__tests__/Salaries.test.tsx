import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { render } from '@testing-library/react';
import SalarieseWithAuthentication from '../pages/salaries/salaries';

const renderSalariesPage = () =>{
	const { container } = render(
	<MemoryRouter>
        <ToastContainer />
        <SalarieseWithAuthentication />
	</MemoryRouter>
    );

	return container;
};

describe("Test ==>  Salaries page", () => {
  test("renders correctly", () => {
    const container  = renderSalariesPage();
    expect(container).toMatchSnapshot();
  });
});