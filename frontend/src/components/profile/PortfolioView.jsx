import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const tabs = ["About", "Projects", "Blogs", "GitHub"];

const EmptyState = ({ children }) => (
  <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/50">
    {children}
  </p>
);

const PortfolioView = ({ profile }) => {
  const [activeTab, setActiveTab] = useState("About");

  if (!profile) {
    return (
      <div className="p-6 text-sm text-white/60">
        No profile loaded. Save your portfolio profile first.
      </div>
    );
  }

  return (
    <div className="p-5 text-white">
      <header className="mb-5 flex items-center gap-4">
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-16 w-16 rounded-2xl object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-sm text-white/50">@{profile.username}</p>
        </div>
      </header>

      <div className="mb-5 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3 py-1 text-xs transition ${
              activeTab === tab ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "About" && (
        <section className="space-y-4">
          <p className="text-sm leading-relaxed text-white/80">{profile.bio}</p>
          {profile.location && <p className="text-sm text-white/50">{profile.location}</p>}
          <div className="flex flex-wrap gap-2">
            {profile.skills?.map((skill) => (
              <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {activeTab === "Projects" && (
        <section className="grid grid-cols-2 gap-3">
          {!profile.projects?.length && <EmptyState>No projects added.</EmptyState>}
          {profile.projects?.map((project) => (
            <article key={project.title} className="rounded-lg border border-white/10 bg-white/8 p-4">
              <h2 className="font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm text-white/60">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack?.map((tech) => (
                  <span key={tech} className="rounded-full bg-black/30 px-2 py-1 text-[11px] text-white/60">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="mt-3 block truncate text-xs text-cyan-300">
                  {project.link}
                </a>
              )}
            </article>
          ))}
        </section>
      )}

      {activeTab === "Blogs" && (
        <section className="space-y-4">
          {!profile.blogs?.length && <EmptyState>No blogs added.</EmptyState>}
          {profile.blogs?.map((blog) => (
            <article key={blog.title} className="rounded-lg border border-white/10 bg-white/8 p-4">
              <h2 className="mb-2 font-semibold">{blog.title}</h2>
              <div className="prose prose-invert max-w-none text-sm text-white/70">
                <ReactMarkdown>{blog.content}</ReactMarkdown>
              </div>
            </article>
          ))}
        </section>
      )}

      {activeTab === "GitHub" && (
        <section className="grid grid-cols-2 gap-3">
          {!profile.githubRepos?.length && <EmptyState>No GitHub repositories cached.</EmptyState>}
          {profile.githubRepos?.map((repo) => (
            <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/8 p-4 transition hover:bg-white/12">
              <h2 className="font-semibold text-cyan-200">{repo.name}</h2>
              <p className="mt-2 min-h-10 text-sm text-white/60">{repo.description}</p>
              <div className="mt-3 flex gap-3 text-xs text-white/50">
                {repo.language && <span>{repo.language}</span>}
                <span>{repo.stars} stars</span>
                <span>{repo.forks} forks</span>
              </div>
            </a>
          ))}
        </section>
      )}
    </div>
  );
};

export default PortfolioView;
