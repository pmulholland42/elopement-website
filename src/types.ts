export type Invitee = {
  invitee_id: string;
  invitee_name: string | null;
  invitee_accepted: boolean | null;
};

export type PartyInfo = {
  party_id: string;
  party_name: string;
  completed: boolean | null;
  invitees: Invitee[];
  contact: string | null;
};

export type RSVPResponse = "accept" | "decline";
export type InviteeResponse = "attending" | "not_attending";
