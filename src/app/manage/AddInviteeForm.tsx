"use client";

import { useState } from "react";
import { Button, TextField, Card, CardContent } from "@mui/material";
import { addInviteeAction } from "./actions";

interface Invitee {
  invitee_name: string | null;
  alternate_name: string | null;
  invitee_accepted: boolean | null;
}

export default function AddInviteeForm() {
  const [partyName, setPartyName] = useState("");
  const [contact, setContact] = useState("");
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [error, setError] = useState("");

  const addInvitee = () => {
    setInvitees([
      ...invitees,
      { invitee_name: "", alternate_name: "", invitee_accepted: null },
    ]);
  };

  const updateInvitee = (
    index: number,
    key: keyof Invitee,
    value: string | boolean | null
  ) => {
    const newInvitees = invitees.map((invitee, i) =>
      i === index ? { ...invitee, [key]: value } : invitee
    );
    setInvitees(newInvitees);
  };

  const removeInvitee = (index: number) => {
    setInvitees(invitees.filter((_, i) => i !== index));
  };

  const submitForm = async () => {
    const partyInfo = {
      party_name: partyName,
      contact,
      completed: null,
      invitees,
    };

    try {
      await addInviteeAction(partyInfo);

      alert("Invitation submitted successfully!");
      setPartyName("");
      setContact("");
      setInvitees([]);
      setError("");
    } catch (error) {
      console.error("Error submitting invitation:", error);
      setError(error + "");
    }
  };

  return (
    <Card sx={{ p: 4, maxWidth: 600 }}>
      <CardContent>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Invite a Party
        </h2>
        <TextField
          fullWidth
          label="Party Name"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          margin="normal"
        />

        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "bold",
            marginTop: "1rem",
          }}
        >
          Invitees
        </h3>
        {invitees.map((invitee, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <TextField
              fullWidth
              label="Invitee Name (or leave blank for unnamed guest)"
              value={invitee.invitee_name || ""}
              onChange={(e) =>
                updateInvitee(index, "invitee_name", e.target.value)
              }
            />
            <TextField
              fullWidth
              label="Alternate Name (optional)"
              value={invitee.alternate_name || ""}
              onChange={(e) =>
                updateInvitee(index, "alternate_name", e.target.value)
              }
            />
            <Button variant="outlined" onClick={() => removeInvitee(index)}>
              Remove
            </Button>
          </div>
        ))}

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={addInvitee}
        >
          Add Invitee
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
          onClick={submitForm}
        >
          Submit
        </Button>
        {error.length > 0 && <p>{error}</p>}
      </CardContent>
    </Card>
  );
}
