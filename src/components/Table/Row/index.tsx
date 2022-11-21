import React, { FC } from "react";
import styles from "./row.module.scss";

interface RowProps {
  code: string;
  name: string;
}

const Row: FC<RowProps> = ({ code, name }) => {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableData}>{code}</td>
      <td className={styles.tableData}>{name}</td>
    </tr>
  );
};

export default Row;
