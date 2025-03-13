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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { getPartyInfo, respond } from "./actions";
import styles from "./rsvp.module.css";

type RSVPFormProps = {
  initialPartyInfo: PartyInfo;
  onComplete: (partyInfo: PartyInfo) => void;
};

export default function RSVPForm({
  initialPartyInfo,
  onComplete,
}: RSVPFormProps) {
  const [partyInfo, setPartyInfo] = useState<PartyInfo>(initialPartyInfo);
  const [submitting, startSubmitting] = useTransition();
  const [error, setError] = useState("");

  const groupInvite =
    partyInfo.invitees.filter((i) => i.invitee_name !== null).length > 1;

  useEffect(() => {
    setPartyInfo(JSON.parse(JSON.stringify(initialPartyInfo)));
  }, [initialPartyInfo]);

  async function respondAction() {
    startSubmitting(async () => {
      setError("");
      console.log(partyInfo);
      if (partyInfo === null) {
        return;
      } else if (
        partyInfo?.invitees.some((invitee) => invitee.invitee_accepted === null)
      ) {
        if (groupInvite) {
          setError(
            "Please respond for all members of your party by clicking the options above"
          );
          return;
        } else {
          const mainInvitee = partyInfo.invitees.find(
            (i) => i.invitee_name !== null
          )!;
          if (
            mainInvitee.invitee_accepted === true ||
            mainInvitee.invitee_accepted === null
          ) {
            setError("Please select a response above");
            return;
          }
        }
      }
      try {
        await respond(partyInfo);
        console.log(partyInfo);
        onComplete({ ...partyInfo, completed: true });
      } catch (e) {
        setError("Something went wrong, please try again.");
      }
    });
  }

  const handleInviteeResponseChange = (
    inviteeId: string,
    attending: boolean
  ): void => {
    setError("");
    setPartyInfo((prevPartyInfo) => {
      if (!prevPartyInfo) return prevPartyInfo;

      return {
        ...prevPartyInfo,
        invitees: prevPartyInfo.invitees.map((invitee) =>
          invitee.invitee_id === inviteeId
            ? { ...invitee, invitee_accepted: attending }
            : invitee
        ),
      };
    });
  };

  const title = groupInvite
    ? `You're responding for ${partyInfo.party_name}`
    : partyInfo.party_name;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h1
        style={{ textAlign: "center", marginTop: 0 }}
        className={styles.title}
      >
        {title}
      </h1>
      <form
        action={respondAction}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "16rem",
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
          {partyInfo.invitees.map((invitee) => {
            if (invitee.invitee_name !== null) {
              return (
                <RSVPToggle
                  key={invitee.invitee_id}
                  inviteeName={invitee.invitee_name}
                  response={invitee.invitee_accepted}
                  setResponse={(r) => {
                    handleInviteeResponseChange(invitee.invitee_id, r);
                  }}
                  hideName={
                    partyInfo.invitees.filter((i) => i.invitee_name !== null)
                      .length === 1
                  }
                  plusOne={false}
                />
              );
            } else {
              const mainInvitee = partyInfo.invitees.find(
                (i) => i.invitee_name !== null
              )!;
              if (mainInvitee.invitee_accepted) {
                return (
                  <RSVPToggle
                    key={invitee.invitee_id}
                    inviteeName={
                      invitee.invitee_name ?? "Will you be bringing a guest?"
                    }
                    response={invitee.invitee_accepted}
                    setResponse={(r) => {
                      handleInviteeResponseChange(invitee.invitee_id, r);
                    }}
                    hideName={false}
                    plusOne={true}
                  />
                );
              }
            }
          })}
        </div>

        <p style={{ color: "#6C2F33", minHeight: "2rem", marginTop: "1rem" }}>
          {error}
        </p>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#3A475F",
            width: "16rem",
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
          disabled={submitting}
        >
          Continue
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

interface RSVPToggleProps {
  hideName: boolean;
  inviteeName: string;
  response: boolean | null;
  setResponse: (response: boolean) => void;
  plusOne: boolean;
}

// Create a styled ToggleButton that accepts a custom property for conditional styling
const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== "customValue",
})<{ customValue: RSVPResponse }>(({ customValue }) => ({
  borderRadius: "20px !important", // rounded on all corners
  textTransform: "none",
  fontFamily: "Lora",
  fontWeight: 500,
  backgroundColor: "#fdf7f2", // using one of your background colors
  color: "#15233C", // text color
  border: "2px solid #ccc !important",
  minWidth: "8rem",
  // add spacing between buttons (only margin to the left for non-first button)
  "&:not(:first-of-type)": {
    marginLeft: "8px",
  },
  // style for the selected state
  "&.Mui-selected": {
    color: "#ffffff",
    backgroundColor: customValue === "accept" ? "#4D7044" : "#737E82",
    "&:hover": {
      backgroundColor: customValue === "accept" ? "#4D7044" : "#737E82",
    },
  },
}));

const RSVPToggle: React.FC<RSVPToggleProps> = ({
  hideName,
  inviteeName,
  response,
  setResponse,
  plusOne,
}) => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newResponse: boolean
  ) => {
    if (newResponse !== null) {
      setResponse(newResponse);
    }
  };

  const acceptMessage = plusOne ? "Yes" : "Accepts with pleasure";
  const declineMessage = plusOne ? "No" : "Declines with regret";

  return (
    <div>
      {!hideName && (
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
          className={styles.text}
        >
          {inviteeName}
        </p>
      )}

      <ToggleButtonGroup
        value={response}
        exclusive
        onChange={handleChange}
        aria-label={`RSVP response for ${inviteeName}`}
      >
        <StyledToggleButton
          customValue="accept"
          value={true}
          aria-label="Accept"
        >
          {acceptMessage}
        </StyledToggleButton>
        <StyledToggleButton
          customValue="decline"
          value={false}
          aria-label="Decline"
        >
          {declineMessage}
        </StyledToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
