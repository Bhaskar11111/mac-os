import React, { useState } from "react";
import CollapseWindow from "./CollapseWindow";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";


const Hercules = ({ windowState, setWindowState, windowName }) => {

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

  const reviewCode = async () => {

    if (!code.trim()) {
      alert("Please paste code first");
      return;
    }

    try {

      setLoading(true);
      setReview("");

      const res = await fetch("http://localhost:5000/api/review-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: code,
          language: language
        })
      });

      const data = await res.json();

      console.log("AI Response:", data);

      setReview(data.review);

    } catch (error) {

      console.error("Error:", error);
      setReview("Error reviewing code.");

    } finally {

      setLoading(false);

    }

  };

  return (
    <CollapseWindow
      windowState={windowState}
      setWindowState={setWindowState}
      windowName={windowName}
      height="75vh"
      width="65vw"
    >

      <div className="flex flex-col h-full w-full p-6 gap-6 backdrop-blur-sm shadow-xl rounded-2xl">

        <div className="flex items-center gap-5">

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-5 py-2 rounded-2xl backdrop-blur-sm cursor-pointer border border-white/20 text-white"
          >
            <option value="javascript" className="text-black">JavaScript</option>
            <option value="python" className="text-black">Python</option>
            <option value="cpp" className="text-black">C++</option>
            <option value="java" className="text-black">Java</option>
            <option value="csharp" className="text-black">C#</option>
          </select>

          <button
            onClick={reviewCode}
            className="px-6 py-2 rounded-2xl text-white cursor-pointer border border-white/20 hover:bg-cyan-300/60 transition"
          >
            {loading ? "Reviewing..." : "Review Code"}
          </button>

        </div>

        <div className="flex-1 rounded-2xl overflow-hidden border border-white/20">

          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
          />

        </div>

        <div className="flex-1 overflow-auto rounded-2xl border border-white/20 p-6 text-white text-sm whitespace-pre-wrap">

          {loading ? (
  <p className="animate-pulse text-blue-300 tracking-wide">
    Hercules is reviewing your code...
  </p>
) : (
  <div className="relative">
    
    {review && (
      <button
        onClick={copyToClipboard}
        className="absolute cursor-pointer active:scale-95 right-0 top-0 px-3 py-1 text-xs rounded-lg bg-white/10 border border-white/20 z-99 backdrop-blur-sm hover:bg-white/20"
      >
        Copy
      </button>
    )}

    <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{

    h1: ({children}) => (
      <h1 className="text-xl font-semibold text-cyan-300 mt-4 mb-2">
        {children}
      </h1>
    ),

    h2: ({children}) => (
      <h2 className="text-lg font-semibold text-cyan-200 mt-4 mb-2">
        {children}
      </h2>
    ),

    h3: ({children}) => (
      <h3 className="text-md font-semibold text-blue-200 mt-3 mb-1">
        {children}
      </h3>
    ),

    ul: ({children}) => (
      <ul className="list-disc ml-6 space-y-1 text-zinc-200">
        {children}
      </ul>
    ),

    p: ({children}) => (
      <p className="text-zinc-200 leading-relaxed mb-2">
        {children}
      </p>
    ),

    code({inline, className, children}) {

      const match = /language-(\w+)/.exec(className || "")

      return !inline ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match ? match[1] : "javascript"}
          PreTag="div"
          customStyle={{
            borderRadius: "12px",
            padding: "16px",
            marginTop: "12px"
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-black/40 px-1 py-0.5 rounded text-green-300">
          {children}
        </code>
      )
    }

  }}
>
  {review || "AI review output will appear here..."}
</ReactMarkdown>

  </div>
)}

        </div>

      </div>

    </CollapseWindow>
  );
};

export default Hercules;