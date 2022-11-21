import React, { FC } from "react";
import styles from "./textField.module.scss";

interface TextFieldProps {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

const TextField: FC<TextFieldProps> = ({ onChange, placeholder, value }) => {
  return (
    <input
      autoFocus
      className={styles.textField}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default TextField;
