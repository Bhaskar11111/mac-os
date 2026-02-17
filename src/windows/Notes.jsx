import React, { useEffect, useState } from 'react'
import CollapseWindow from './CollapseWindow'
import Markdown from 'react-markdown'
import { atelierLakesideDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import notes from '../assets/Notes.txt'
import SyntaxHighlighter from 'react-syntax-highlighter';

const Notes = () => {

  const [markdown, setMarkdown] = useState("")

  useEffect(() => {
    fetch(notes)
      .then(res => res.text())
      .then(text => setMarkdown(text))
      .catch(err => console.log(err))
  }, [])

  return (
    <CollapseWindow height='70vh' width='45vw' x='20' y='70'>
      <div className="p-3">
    
        <SyntaxHighlighter style={atelierLakesideDark}>{markdown}</SyntaxHighlighter>  
      </div>
    </CollapseWindow>
  )
}

export default Notes
