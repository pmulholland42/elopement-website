import { Suspense } from "react";
import styles from "./cookies.module.css";
import CookiesForm from "./CookiesForm";

export default async function CookiesPage() {
  return (
    <div>
      <main className={styles.main}>
        <Suspense>
          <CookiesForm />
        </Suspense>
      </main>
    </div>
  );
}
