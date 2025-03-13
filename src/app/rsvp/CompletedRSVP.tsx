import type { PartyInfo } from "@/types";
import {
  faCalendar,
  faCalendarCheck,
  faCheck,
  faCookie,
  faCookieBite,
  faRoute,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./rsvp.module.css";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

type CompletedRSVPProps = {
  partyInfo: PartyInfo;
};

export const CompletedRSVP = ({ partyInfo }: CompletedRSVPProps) => {
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);

  const coming = partyInfo.invitees.some((i) => i.invitee_accepted);

  const groupInvite =
    partyInfo.invitees.filter((i) => i.invitee_name !== null).length > 1;

  const singleInviteeFullName = partyInfo.invitees.find(
    (i) => i.invitee_name !== null
  )!.invitee_name;
  const singleInviteeName = singleInviteeFullName?.split(" ")[0];

  const plusOneComing = partyInfo.invitees.some(
    (i) => i.invitee_name === null && i.invitee_accepted
  );
  const plusOneNotComing = partyInfo.invitees.some(
    (i) => i.invitee_name === null && !i.invitee_accepted
  );
  let thankYou = "Thanks for responding";
  if (!groupInvite && singleInviteeName) {
    thankYou = `Thanks for responding, ${singleInviteeName}`;
  }
  if (coming) {
    thankYou += "!";
  }
  const message = coming
    ? "We can't wait to celebrate with you."
    : "We'll miss you.";

  let cookiesHref = "/cookies";
  if (!groupInvite && singleInviteeFullName) {
    cookiesHref += `?name=${encodeURIComponent(singleInviteeFullName)}`;
  }
  console.log(cookiesHref);
  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 className={styles.title}>{thankYou}</h2>
      <>
        <p className={styles.text}>{message}</p>
        {groupInvite && (
          <div className={styles["section-container"]}>
            <div className={styles.text}>
              You responded for {partyInfo.party_name}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {partyInfo.invitees
                .filter((i) => i.invitee_accepted)
                .map((i) => (
                  <div
                    key={i.invitee_id}
                    className={styles["icon-text-container"]}
                  >
                    <FontAwesomeIcon icon={faCheck} color="#4D7044" />
                    {i.invitee_name} accepted
                  </div>
                ))}
              {partyInfo.invitees
                .filter((i) => !i.invitee_accepted)
                .map((i) => (
                  <div
                    key={i.invitee_id}
                    className={styles["icon-text-container"]}
                  >
                    <FontAwesomeIcon icon={faX} color="#737E82" />
                    {i.invitee_name} declined
                  </div>
                ))}
            </div>
            <p className={styles.contact}>
              If you need to make any changes, contact{" "}
              {partyInfo.contact ?? "us"} before April 15th.
            </p>
          </div>
        )}
        {!groupInvite && coming && (
          <div className={styles["section-container"]}>
            <div className={styles["icon-text-container"]}>
              <FontAwesomeIcon icon={faCheck} color="#4D7044" />
              You responded yes
            </div>
            {plusOneComing && (
              <div className={styles["icon-text-container"]}>
                <FontAwesomeIcon icon={faCheck} color="#4D7044" />
                You&apos;re bringing a guest
              </div>
            )}
            {plusOneNotComing && (
              <div className={styles["icon-text-container"]}>
                <FontAwesomeIcon icon={faX} color="#737E82" />
                You&apos;re not bringing a guest
              </div>
            )}

            <p className={styles.contact}>
              If you need to make any changes, contact{" "}
              {partyInfo.contact ?? "us"} before April 15th.
            </p>
          </div>
        )}
        {!groupInvite && !coming && (
          <div className={styles["section-container"]}>
            <div className={styles["icon-text-container"]}>
              <FontAwesomeIcon icon={faX} color="#737E82" />
              You responded no
            </div>
            <p className={styles.contact}>
              If you need to make any changes, contact{" "}
              {partyInfo.contact ?? "us"} before April 15th.
            </p>
          </div>
        )}
      </>

      {coming && (
        <>
          <div className={styles["section-container-lite"]}>
            <p className={styles.text}>
              We&apos;ll see you at Phipps on June 14th!
            </p>
            <Button
              variant="outlined"
              endIcon={<FontAwesomeIcon icon={faCalendar} />}
              sx={{
                flexDirection: "row-reverse",
                gap: "1rem",
                color: "#3A475F",
                borderColor: "#3A475F",
              }}
              onClick={() => setCalendarDialogOpen(true)}
            >
              Add to Calendar
            </Button>
          </div>
          <div className={styles["section-container-lite"]}>
            <div className={styles["icon-text-container"]}>
              <FontAwesomeIcon
                icon={faCookieBite}
                size={"2x"}
                color="#8F6C52"
              />
              <p className={styles.text} style={{ fontWeight: "500" }}>
                One last thing...
              </p>
            </div>

            <p className={styles.text} style={{ textAlign: "center" }}>
              We'll be having a cookie table! If you want to bring homemade
              cookies,{" "}
              <Link href={cookiesHref} style={{ textDecoration: "underline" }}>
                click here{" "}
              </Link>
              to let us know what you're making.
            </p>
          </div>
        </>
      )}
      <Dialog
        open={calendarDialogOpen}
        onClose={() => setCalendarDialogOpen(false)}
      >
        <DialogTitle>Add to Calendar</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Riley%20%26%20Peter%27s%20Elopement%20Celebration&dates=20250614T220000Z/20250615T020000Z&details=Join%20us%20to%20celebrate!&location=Phipps%20Conservatory%20and%20Botanical%20Gardens%2C%201%20Schenley%20Drive%2C%20Pittsburgh%2C%20PA%2015213&sf=true&output=xml"
            target="_blank"
          >
            <Button
              variant="outlined"
              endIcon={<FontAwesomeIcon icon={faCalendar} />}
              sx={{
                flexDirection: "row-reverse",
                gap: "1rem",
                color: "#3A475F",
                borderColor: "#3A475F",
              }}
            >
              Google Calendar
            </Button>
          </a>
          <a href="./elopement-celebration.ics" download>
            <Button
              variant="outlined"
              endIcon={<FontAwesomeIcon icon={faCalendar} />}
              sx={{
                flexDirection: "row-reverse",
                gap: "1rem",
                color: "#3A475F",
                borderColor: "#3A475F",
              }}
            >
              Other Calendar (iCal)
            </Button>
          </a>
          <Button
            variant="text"
            sx={{
              gap: "1rem",
              color: "#3A475F",
              borderColor: "#3A475F",
            }}
            onClick={() => setCalendarDialogOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
