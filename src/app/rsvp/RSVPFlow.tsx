"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import InviteeLookup from "./InviteeLookup";
import RSVPForm from "./RSVPForm";
import { PartyInfo } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { getPartyInfo } from "./actions";
import { CircularProgress } from "@mui/material";
import { CompletedRSVP } from "./CompletedRSVP";

export default function RSVPFlow() {
  const [partyInfo, setPartyInfo] = useState<PartyInfo | null>(null);
  const [loadingPartyInfo, startLoadingPartyInfo] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync partyId state with the URL query param 'partyId'
  useEffect(() => {
    const idFromUrl = searchParams.get("partyId");
    if (partyInfo === null && idFromUrl) {
      startLoadingPartyInfo(async () => {
        const partyInfo = await getPartyInfo(idFromUrl);
        setPartyInfo(partyInfo);
      });
    } else if (partyInfo && !idFromUrl) {
      setPartyInfo(null);
    }
  }, [searchParams, partyInfo]);

  const handleLookupComplete = (partyInfo: PartyInfo) => {
    setPartyInfo(partyInfo);
    // Push a new URL with the partyId as a query param.
    router.push(`${window.location.pathname}?partyId=${partyInfo.party_id}`);
  };

  const handleRSVPComplete = (partyInfo: PartyInfo) => {
    setPartyInfo(partyInfo);
  };

  return (
    <Suspense>
      <div>
        {loadingPartyInfo && <CircularProgress />}
        {!loadingPartyInfo && partyInfo === null && (
          <InviteeLookup onComplete={handleLookupComplete} />
        )}
        {!loadingPartyInfo && partyInfo !== null && !partyInfo.completed && (
          <RSVPForm
            initialPartyInfo={partyInfo}
            onComplete={handleRSVPComplete}
          />
        )}
        {!loadingPartyInfo && partyInfo !== null && partyInfo.completed && (
          <CompletedRSVP partyInfo={partyInfo} />
        )}
      </div>
    </Suspense>
  );
}
