"use server";
import { allowList, auth } from "@/auth";
import { getDatabaseConnection } from "@/database";

export type Invitee = {
  invitee_name: string | null;
  invitee_accepted: boolean | null;
  alternate_name: string | null;
};

export type PartyInfo = {
  party_name: string;
  completed: boolean | null;
  invitees: Invitee[];
  contact: string | null;
};

export const addInviteeAction = async (partyInfo: PartyInfo) => {
  console.log("addInviteeAction");
  console.log(partyInfo);
  const session = await auth();
  if (
    !session?.user ||
    !session.user.email ||
    !allowList.includes(session.user.email)
  ) {
    throw "unauthorized";
  }

  if (partyInfo.invitees.length === 0) {
    throw "no-invitees";
  }

  if (!partyInfo.invitees.some((i) => !!i.invitee_name)) {
    throw "no-names";
  }

  const db = getDatabaseConnection();

  await db.any(`
    CREATE TABLE IF NOT EXISTS party (
    id TEXT DEFAULT left(md5(random()::text), 8) PRIMARY KEY,
    name TEXT NOT NULL,
	completed BOOLEAN DEFAULT false,
	contact TEXT DEFAULT 'Jacqui'
);

CREATE TABLE IF NOT EXISTS invitee (
    id TEXT DEFAULT left(md5(random()::text), 8) PRIMARY KEY,
    party_id TEXT NOT NULL,
    name TEXT,
	alt_name TEXT,
    accepted BOOLEAN,
	created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (party_id) REFERENCES party(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cookie_response (
	id TEXT DEFAULT left(md5(random()::text), 8) PRIMARY KEY,
	name TEXT,
	cookies TEXT
);
`);

  await db.tx("add-invitee-tx", async (t) => {
    console.log("addInviteeAction tx");
    const insParty = await t.one(
      "insert into party (name, contact) values ($1, $2) returning id",
      [partyInfo.party_name, partyInfo.contact || null]
    );

    for (const invitee of partyInfo.invitees) {
      await t.none(
        "INSERT INTO invitee (party_id, name, alt_name) VALUES ($1, $2, $3)",
        [
          insParty.id,
          invitee.invitee_name || null,
          invitee.alternate_name || null,
        ]
      );
    }
    console.log(insParty);
  });
};
