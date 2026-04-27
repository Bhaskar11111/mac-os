import React from 'react'
import Terminal from 'react-console-emulator'
import { useAuth } from '../context/UserContext'
import { useProfile } from '../context/ProfileContext'
import CollapseWindow from './CollapseWindow'

const CLI = ({ windowState, setWindowState, windowName, zIndex, bringToFront }) => {
  const { user } = useAuth()
  const { profile } = useProfile()
  const displayName = profile?.name || user?.name || 'Portfolio User'
  const username = profile?.username || user?.email?.split('@')[0] || 'portfolio'
  const skills = profile?.skills?.length ? profile.skills.join(', ') : 'No skills added yet'
  const projects = profile?.projects?.length
    ? profile.projects
        .map((project) => `${project.title}\n- ${(project.techStack || []).join(' | ') || project.description || 'Project details pending'}`)
        .join('\n\n')
    : 'No projects added yet'

  const commands = {
    intro: {
      description: 'Show introduction',
      usage: 'intro',
      fn: () => `
${displayName}
${profile?.bio || 'Personal macOS portfolio workspace.'}
`
    },
    skills: {
      description: 'List technical skills',
      usage: 'skills',
      fn: () => skills
    },
    projects: {
      description: 'Show projects',
      usage: 'projects',
      fn: () => projects
    },
    contact: {
      description: 'Show contact info',
      usage: 'contact',
      fn: () => `
Email   : ${profile?.socials?.email || user?.email || 'Not added'}
GitHub  : ${profile?.socials?.github || 'Not added'}
LinkedIn: ${profile?.socials?.linkedin || 'Not added'}
Spotify : ${profile?.socials?.spotify || 'Not added'}
`
    }
  }

  const welcomeMessages = `
+----------------------------------------------+
|   ACCESSING: ${username.toUpperCase()}@PORTFOLIO_SYS   |
+----------------------------------------------+

[+] Loading user profile...
[+] Preparing command registry...
[+] System ready.

AVAILABLE COMMANDS:

> intro       :: display identity
> skills      :: list technical skills
> projects    :: enumerate active builds
> contact     :: show communication channels
> clear       :: purge terminal buffer

TYPE COMMAND AND PRESS ENTER
`

  return (
    <CollapseWindow
      windowName={windowName}
      windowState={windowState}
      setWindowState={setWindowState}
      zIndex={zIndex}
      bringToFront={bringToFront}
      width="42vw"
      height="52vh"
      x="450"
      y="180"
    >
      <div className="w-[40.7vw] h-[50vh]">
        <Terminal
          style={{
            color: '#00C950',
            backgroundColor: 'transparent',
            fontSize: '12px',
            width: '100%',
            height: '100%'
          }}
          contentStyle={{
            color: '#00C950',
            fontSize: '13px'
          }}
          commands={commands}
          welcomeMessage={welcomeMessages}
          promptLabel={`${username}~$%`}
        />
      </div>
    </CollapseWindow>
  )
}

export default CLI
