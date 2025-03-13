import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles["menu-header-container"]}>
      <div className={styles["menu-header"]}>
        <div className={styles["home-link"]}>
          <Link href="/#home" className={styles["menu-header-link"]}>
            HOME
          </Link>
        </div>

        <Link href="/#whenandwhere" className={styles["menu-header-link"]}>
          WHEN & WHERE
        </Link>
        <Link href="/#faqs" className={styles["menu-header-link"]}>
          FAQS
        </Link>

        <Link href="/rsvp" className={styles["menu-header-link"]}>
          RSVP
        </Link>
      </div>
    </div>
  );
}
