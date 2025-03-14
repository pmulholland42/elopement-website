import { Suspense } from "react";
import styles from "./rsvp.module.css";
import RSVPFlow from "./RSVPFlow";

export default function RSVPPage() {
  return (
    <div>
      <main className={styles.main}>
        <Suspense>
          <RSVPFlow />
        </Suspense>
      </main>
    </div>
  );
}
