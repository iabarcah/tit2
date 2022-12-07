import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        <img className={styles.img} src="/logo.png" />
      </Link>
    </header>
  );
};

export default Header;
