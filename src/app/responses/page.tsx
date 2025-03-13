import { auth, allowList } from "@/auth";
import { getDatabaseConnection } from "@/database";
import Link from "next/link";

export default async function ResponsesPage() {
  const session = await auth();

  if (
    !session?.user ||
    !session.user.email ||
    !allowList.includes(session.user.email)
  ) {
    return (
      <div style={{ margin: "6rem" }}>
        <Link href="/login">Please click here to log in first</Link>
      </div>
    );
  }

  const db = getDatabaseConnection();

  const responses = await db.any(
    "select p.name as party_name, p.completed as responded, coalesce(i.name, p.name || '''s Guest') as invitee_name, i.accepted from party p left join invitee i on i.party_id = p.id order by p.completed desc, p.name, i.accepted desc, i.name"
  );

  return (
    <div style={{ margin: "6rem" }}>
      Logged in as {session.user.email}
      <Link href="/manage" style={{ margin: "1rem" }}>
        Click here to add invitees
      </Link>
      <div>Responses</div>
      <table border={1}>
        <thead>
          <tr>
            <th>Party Name</th>
            <th>Responded Yet?</th>
            <th>Invitee</th>
            <th>Accepted</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((row, index) => (
            <tr key={index}>
              <td>{row.party_name}</td>
              <td>{row.responded ? "Yes" : "No"}</td>
              <td>{row.invitee_name}</td>
              <td>{row.responded ? (row.accepted ? "Yes" : "No") : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{responses.filter((r) => r.accepted).length} total attendees so far</p>
      <p>
        Awaiting response from {responses.filter((r) => !r.responded).length}{" "}
        individuals
      </p>
    </div>
  );
}
