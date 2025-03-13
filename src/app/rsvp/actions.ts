"use server";

import { getDatabaseConnection } from "@/database";
import { PartyInfo } from "@/types";

const titles = ["mr", "mrs", "ms", "dr", "drs"];

export async function lookupInvitee(
  formData: FormData
): Promise<PartyInfo | null> {
  let name = formData.get("fullName")?.toString().trim();
  if (!name) {
    throw "empty-name";
  }
  name = name.replaceAll(".", "");
  name = name.toLocaleLowerCase();
  for (const title of titles) {
    if (name.startsWith(`${title} `)) {
      name = name.replace(`${title} `, "");
      break;
    }
  }

  console.log(name);
  const db = getDatabaseConnection();
  try {
    const invitee = await db.oneOrNone(
      "select party_id from invitee where name ilike $1 or alt_name ilike $1",
      [name]
    );
    if (invitee) {
      return await getPartyInfo(invitee.party_id);
    } else {
      const party = await db.oneOrNone(
        "select id from party where name ilike $1",
        [name]
      );
      if (party) {
        return await getPartyInfo(party.id);
      } else {
        return null;
      }
    }
  } catch (e) {
    throw e;
  }
}

export async function getPartyInfo(partyId: string): Promise<PartyInfo> {
  //await new Promise((r) => setTimeout(r, 1000));
  const db = getDatabaseConnection();

  const partyResult = await db.many(
    "select i.id, p.id as party_id, p.name as party_name, p.completed as completed, p.contact as contact, i.id as invitee_id, i.name as invitee_name, i.accepted as invitee_accepted from party p left join invitee i on i.party_id = p.id where party_id = $1 order by i.created_at asc",
    [partyId]
  );
  return {
    party_id: partyResult[0].party_id,
    party_name: partyResult[0].party_name,
    completed: partyResult[0].completed,
    invitees: partyResult.map((row) => ({
      invitee_id: row.invitee_id,
      invitee_name: row.invitee_name,
      invitee_accepted: row.invitee_accepted,
    })),
    contact: partyResult[0].contact,
  };
}

export async function respond(partyInfo: PartyInfo): Promise<void> {
  //await new Promise((r) => setTimeout(r, 1000));
  let noPlusOne = false;

  if (
    partyInfo?.invitees.some((invitee) => invitee.invitee_accepted === null)
  ) {
    if (
      partyInfo.invitees.filter((i) => i.invitee_name !== null).length === 1
    ) {
      const mainInvitee = partyInfo.invitees.find(
        (i) => i.invitee_name !== null
      )!;
      if (mainInvitee.invitee_accepted) {
        throw "Please select a response";
      } else {
        noPlusOne = true;
      }
    } else {
      throw "Please respond for all members of your party";
    }
  }
  const db = getDatabaseConnection();

  db.tx("repond-tx", (tx) => {
    for (const invitee of partyInfo.invitees) {
      let accepted = invitee.invitee_accepted;
      if (invitee.invitee_name === null && noPlusOne) {
        accepted = false;
      }
      tx.none("update invitee set accepted = $1 where id = $2", [
        accepted,
        invitee.invitee_id,
      ]);
    }
    tx.none("update party set completed = true where id = $1", [
      partyInfo.party_id,
    ]);
  });
}
