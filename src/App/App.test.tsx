import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import App from "../App";
import { GET_COUNTRIES } from "src/apollo/queries/getCountries";

describe("testing search functionality", () => {
  it("renders without error", async () => {
    const mocks: MockedResponse[] = [];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(
      await screen.findByText("SEARCH BY COUNTRY CODE")
    ).toBeInTheDocument();
  });

  it("should render country", async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_COUNTRIES,
          variables: {
            filter: {
              code: {
                regex: "EE",
              },
            },
          },
        },
        result: {
          data: {
            countries: [
              {
                code: "EE",
                name: "Estonia",
              },
            ],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText("Start Searching");

    fireEvent.change(input, {
      target: { value: "ee" },
    });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByTestId("table")).toBeInTheDocument();
  });

  it("should show empty message", async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_COUNTRIES,
          variables: {
            filter: {
              code: {
                regex: "EE",
              },
            },
          },
        },
        result: {
          data: {
            countries: [],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText("Start Searching");

    fireEvent.change(input, {
      target: { value: "ee" },
    });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("No results to show")).toBeInTheDocument();
  });

  it("should show error", async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_COUNTRIES,
          variables: {
            filter: {
              code: {
                regex: "EE",
              },
            },
          },
        },
        error: new Error("Error"),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText("Start Searching");

    fireEvent.change(input, {
      target: { value: "ee" },
    });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(
      await screen.findByText("Something went wrong, please try again")
    ).toBeInTheDocument();
  });
});
