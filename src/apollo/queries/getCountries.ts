import { gql } from "../__generated__/gql";

export const GET_COUNTRIES = gql(`
  query GetCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
    }
  }
`);
