import React, { useEffect, useState } from "react";
import CollapseWindow from "./CollapseWindow";
import PortfolioView from "../components/profile/PortfolioView";
import { useProfile } from "../context/ProfileContext";
import { getPublicProfile } from "../api/profileApi";

const Portfolio = ({ windowName, windowState, setWindowState, zIndex, bringToFront }) => {
  const { profile } = useProfile();
  const [publicProfile, setPublicProfile] = useState(null);

  useEffect(() => {
    const username = new URLSearchParams(window.location.search).get("username");
    if (!username) return;

    getPublicProfile(username)
      .then(setPublicProfile)
      .catch(() => setPublicProfile(null));
  }, []);

  return (
    <CollapseWindow
      windowName={windowName}
      windowState={windowState}
      setWindowState={setWindowState}
      zIndex={zIndex}
      bringToFront={bringToFront}
      height="72vh"
      width="58vw"
      x="330"
    >
      <PortfolioView profile={publicProfile || profile} />
    </CollapseWindow>
  );
};

export default Portfolio;
