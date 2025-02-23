import styles from "./page.module.css";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationPin,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
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
            <Link href="#faqs" className={styles["menu-header-link"]}>
              FAQS
            </Link>
            <Link href="#aboutus" className={styles["menu-header-link"]}>
              ABOUT US
            </Link>

            <Link href="/rsvp" className={styles["menu-header-link"]}>
              RSVP
            </Link>
          </div>
        </div>
        <section id="home" className={styles["home-section"]}>
          <div className={styles["main-header"]}>
            <h1 className={styles["main-header-title"]}>Peter & Riley</h1>
            <hr className={styles["main-header-divider"]}></hr>
            <p className={styles["main-header-subtitle"]}>
              We invite you to join us in celebrating our elopement.
            </p>
            <p className={styles["main-header-subtitle"]}>
              <Link href="/rsvp">Click here to RSVP</Link>
            </p>
          </div>
        </section>
        <section id="whenandwhere" className={styles["content-section"]}>
          <div className={styles["section-container"]}>
            <div className={styles["where-and-when-info"]}>
              <div className={styles["icon-text-container"]}>
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="fa-fw"
                  size="xl"
                />
                <p>Saturday, June 14th 2025</p>
              </div>

              <div className={styles["icon-text-container"]}>
                <FontAwesomeIcon icon={faClock} className="fa-fw" size="xl" />
                <p>X:00 PM</p>
              </div>
              <div className={styles["icon-text-container"]}>
                <FontAwesomeIcon
                  icon={faLocationPin}
                  className="fa-fw"
                  size="xl"
                />
                <p>Phipps Conservatory and Botanical Gardens</p>
              </div>
            </div>

            <iframe
              title="Map to Phipp"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12146.551904903497!2d-79.95825201272963!3d40.439014566759575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f189f8429905%3A0x28a12fe50786460d!2sPhipps%20Conservatory%20and%20Botanical%20Gardens!5e0!3m2!1sen!2sus!4v1740178296669!5m2!1sen!2sus"
              className={styles["map-container"]}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
        <section id="faqs" className={styles["content-section"]}>
          <div className={styles["section-container"]}>
            <h2>Frequently Asked Questions</h2>
            <dl>
              <dt className={styles["faq-question"]}>
                Is this a wedding ceremony?
              </dt>
              <dd className={styles["faq-answer"]}>
                Nope! We will have already eloped as of May 1st, so this is
                purely a celebration. No ceremony—just good food, drinks, and a
                great time with our favorite people!
              </dd>

              <dt className={styles["faq-question"]}>
                What should I wear to the celebration?
              </dt>
              <dd className={styles["faq-answer"]}>
                Cocktail attire, please! Think semi-formal—suits or dress shirts
                with slacks for men, and cocktail dresses or dressy separates
                for women. Dress to impress, but most importantly, be
                comfortable and ready to celebrate!
              </dd>

              <dt className={styles["faq-question"]}>
                Can we bring our kids to the wedding?
              </dt>
              <dd className={styles["faq-answer"]}>
                We love your little ones, but our wedding will be an adults-only
                celebration. We hope you can enjoy a fun night out with us!
              </dd>

              <dt className={styles["faq-question"]}>
                Will there be a cookie table
              </dt>
              <dd className={styles["faq-answer"]}>
                Yes! Bring cookies if you want. Or dont, idc
              </dd>
            </dl>
          </div>
        </section>
        <section id="aboutus" className={styles["content-section"]}>
          <div className={styles["section-container"]}>
            <h2>About us</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
