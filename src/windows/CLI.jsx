import React from 'react'
import CollapseWindow from './CollapseWindow'
import Terminal from 'react-console-emulator'

const CLI = () => {
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
const welcomeMessages =  `
=====================================
 Bhaskar Mishra - Portfolio Terminal
=====================================

Available Commands:

intro     → About me
skills    → Technical skills
projects  → My projects
contact   → Contact information
clear     → Clear terminal

Type a command and press Enter.
`

  return (
    <>
    <CollapseWindow width='42vw' height='40vh'>
    <div className="w-[40.7vw]">
        <Terminal  terminalStyle={{
    backgroundColor: 'transparent',
    color: "#00ff9c",
    fontSize: "10px",
    fontFamily: "JetBrains Mono"
  }}

  contentStyle={{
    backgroundColor:'transparent',
    color: "#00C950",
    fontSize: "14px"
  }}

  promptLabelStyle={{
    color: "#FB2C36"
  }}
    commands={commands}
        welcomeMessage={welcomeMessages}
        promptLabel={'bhaskarmishra~$%'}
    />
    </div>
    </CollapseWindow>
    </>
  )
}

export default CLI
