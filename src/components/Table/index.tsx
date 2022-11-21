import React, { FC } from "react";
import { CountryItem } from "./interfaces/countryItem.interface";
import Row from "./Row";
import styles from "./table.module.scss";

interface TableProps {
  countries: CountryItem[];
}

const Table: FC<TableProps> = ({ countries }) => {
  if (countries.length === 0) {
    return <div className={styles.noResult}>No results to show</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableHead}>Country Code</th>
          <th className={styles.tableHead}>Country Name</th>
        </tr>
      </thead>

      <tbody>
        {countries.map((country) => {
          return (
            <Row
              key={country.code}
              code={country.code}
              name={country.name}
            ></Row>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
