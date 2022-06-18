import logoImg from "../../assets/logo.svg";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src={logoImg} alt="ToDo" />
    </header>
  );
}