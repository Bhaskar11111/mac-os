import React from 'react'
import CollapseWindow from './CollapseWindow'
import Terminal from 'react-console-emulator'

const CLI = ({ windowState, setWindowState, windowName }) => {

  const commands = {
    intro: {
      description: "Show introduction",
      usage: "intro",
      fn: () => `
Bhaskar Mishra
MERN Stack Developer | UI/UX Engineering

Passionate developer building responsive,
efficient and user-centered web applications.
`
    },

    skills: {
      description: "List technical skills",
      usage: "skills",
      fn: () => `
Languages:
HTML, CSS, SCSS, JavaScript, C, C++

Frameworks & Tools:
React, Node.js, Express, MongoDB
Tailwind CSS, GSAP, Framer Motion
`
    },

    projects: {
      description: "Show projects",
      usage: "projects",
      fn: () => `
Arcade Movie Database
- React | Tailwind | TMDb API

Sac-Ville E-Commerce
- MongoDB | Express | Node.js | EJS
`
    },

    contact: {
      description: "Show contact info",
      usage: "contact",
      fn: () => `
Email   : bhaskarmishra911@gmail.com
Phone   : +91 9522508486
GitHub  : github.com/bhaskar11111
LinkedIn: linkedin.com/in/dummylink
`
    },
  };

  const welcomeMessages = `
┌──────────────────────────────────────────────┐
│   ACCESSING: BHASKAR_MISHRA@PORTFOLIO_SYS   │
└──────────────────────────────────────────────┘

[+] Establishing secure connection...
[+] Loading user profile...
[+] Decrypting command registry...
[+] System ready.

AVAILABLE COMMANDS:

> intro       :: display identity
> skills      :: list technical arsenal
> projects    :: enumerate active builds
> contact     :: show communication channels
> clear       :: purge terminal buffer

TYPE COMMAND AND PRESS ENTER
`;

  return (
    <CollapseWindow
      windowName={windowName}
      windowState={windowState}
      setWindowState={setWindowState}
      width="42vw"
      height="52vh"
      x="450"
      y="180"
    >
      <div className="w-[40.7vw] h-[50vh]">
        <Terminal
          style={{
            color: "#00C950",
            backgroundColor: "transparent",
            fontSize: "12px",
            width: "100%",
            height: "100%"
          }}
          contentStyle={{
            color: "#00C950",
            fontSize: "13px"
          }}
          commands={commands}
          welcomeMessage={welcomeMessages}
          promptLabel="bhaskarmishra~$%"
        />
      </div>
    </CollapseWindow>
  )
}

export default CLI
