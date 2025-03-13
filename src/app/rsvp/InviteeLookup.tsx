"use client";

import { FormEvent, useState, useTransition } from "react";
import TextField from "@mui/material/TextField";
import { lookupInvitee } from "./actions";
import { Button, CircularProgress } from "@mui/material";
import { PartyInfo } from "@/types";
import styles from "./rsvp.module.css";

type InviteeAutocompleteProps = {
  onComplete: (partyInfo: PartyInfo) => void;
};

export default function InviteeAutocomplete({
  onComplete,
}: InviteeAutocompleteProps) {
  const [lookingUp, startLookingUp] = useTransition();
  const [error, setError] = useState("");

  async function lookupNameFormAction(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const formData = new FormData(formEvent.currentTarget);
    startLookingUp(async () => {
      try {
        const partyInfo = await lookupInvitee(formData);
        if (partyInfo === null) {
          setError(
            "Sorry, we couldn't find you. Make sure you enter your full first and last name exactly as printed on your invite."
          );
        } else {
          onComplete(partyInfo);
        }
      } catch (_) {
        setError("Something went wrong, please try again.");
      }
    });
  }

  return (
    <div
      style={{
        height: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className={styles["section-container"]}
      >
        <p className={styles.instructions}>
          Please enter your first and last name below.
        </p>
        <p className={styles["instructions-small"]}>
          You&apos;ll be able to RSVP for your entire group on the next page.
        </p>
        <form
          onSubmit={lookupNameFormAction}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            name="fullName"
            required
            label="Your Full Name"
            sx={{
              width: { xs: "100%", md: "32rem" },
              my: "1rem",
              color: "#3A475F !important",
              borderColor: "#3A475F",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#3A475F", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3A475F", // Border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#3A475F", // Label color when focused
              },
            }}
          />
          <p style={{ color: "#6C2F33", minHeight: "2rem" }}>{error}</p>

          <Button
            type="submit"
            variant="contained"
            disabled={lookingUp}
            sx={{
              backgroundColor: "#3A475F",
              width: "16rem",
              fontFamily: "Poppins",
              fontWeight: "bold",
            }}
          >
            Continue
            {lookingUp && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
