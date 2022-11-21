import React, { FC, useCallback, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import styles from "./app.module.scss";
import { GET_COUNTRIES } from "src/apollo/queries/getCountries";
import TextField from "src/components/TextField";
import Table from "src/components/Table";
import debounce from "lodash.debounce";

const App: FC = () => {
  const [getCountries, { data: countriesData, loading, error }] =
    useLazyQuery(GET_COUNTRIES);

  const countries = countriesData?.countries;

  const [searchPattern, setSearchPattern] = useState("");

  const handleSearch = useCallback(
    debounce((value: string) => {
      void getCountries({
        variables: {
          filter: {
            code: {
              regex: value,
            },
          },
        },
      });
    }, 250),
    []
  );

  const handleChange = (value: string): void => {
    const upperCaseValue = value.toUpperCase();

    setSearchPattern(upperCaseValue);

    if (upperCaseValue.length > 0) {
      handleSearch(upperCaseValue);
    }
  };

  return (
    <div className={styles.app}>
      <p className={styles.paragraph}>SEARCH BY COUNTRY CODE</p>

      <TextField
        value={searchPattern}
        placeholder="Start Searching"
        onChange={(value) => handleChange(value)}
      ></TextField>

      {loading && <div className={styles.loading}>Loading...</div>}

      {error !== null && error !== undefined && (
        <div className={styles.somethingWentWrong}>
          Something went wrong, please try again
        </div>
      )}

      {countries !== undefined && <Table countries={countries} />}
    </div>
  );
};

export default App;
