import React from "react";
import CollapseWindow from "./CollapseWindow";
import ProfileForm from "../components/profile/ProfileForm";

const ProfileEditor = ({ windowName, windowState, setWindowState, zIndex, bringToFront }) => (
  <CollapseWindow
    windowName={windowName}
    windowState={windowState}
    setWindowState={setWindowState}
    zIndex={zIndex}
    bringToFront={bringToFront}
    height="78vh"
    width="58vw"
    x="360"
  >
    <ProfileForm />
  </CollapseWindow>
);

export default ProfileEditor;
