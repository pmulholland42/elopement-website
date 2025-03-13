"use client";

import { Invitee, PartyInfo, RSVPResponse } from "@/types";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { FormEvent, useEffect, useState, useTransition } from "react";
import styles from "./cookies.module.css";
import { useSearchParams } from "next/navigation";
import { cookieRespond } from "./actions";
import Link from "next/link";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CookiesForm() {
  const searchParams = useSearchParams();
  const [submitting, startSubmitting] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  console.log(searchParams.get("name"));

  async function respondAction(formData: FormData) {
    console.log("respondAction");
    startSubmitting(async () => {
      setError("");
      try {
        await cookieRespond(formData);
        setSubmitted(true);
      } catch (e) {
        setError("Something went wrong, please try again.");
      }
    });
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <div
        className={styles["icon-text-container"]}
        style={{ alignItems: "center" }}
      >
        <FontAwesomeIcon icon={faCookieBite} size={"2x"} color="#8F6C52" />
        <h1
          style={{ textAlign: "center", marginTop: 0 }}
          className={styles.title}
        >
          Cookie Table Response Form
        </h1>
      </div>

      {submitted && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p
            className={styles.text}
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Thank you! If you change your plans, just let us know.
          </p>
          <Link href="/" className={styles.text}>
            Return to home
          </Link>
        </div>
      )}
      <form
        action={respondAction}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "16rem",
          margin: "1rem",
          opacity: submitted ? 0 : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
            alignItems: "center",
          }}
        >
          <TextField
            disabled={submitting || submitted}
            id="name"
            name="name"
            required
            defaultValue={searchParams.get("name") ?? undefined}
            label="Your Name"
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
          <p className={styles.text}>
            Tell us what type(s) of cookies you plan to make, and approximately
            how many:
          </p>
          <TextField
            disabled={submitting || submitted}
            id="cookies"
            name="cookies"
            required
            label="Cookies"
            multiline
            rows={6}
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
        </div>

        <p style={{ color: "#6C2F33", minHeight: "2rem", marginTop: "1rem" }}>
          {error}
        </p>
        <Button
          disabled={submitting || submitted}
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#3A475F",
            width: "16rem",
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          Submit
          {submitting && (
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
  );
}
