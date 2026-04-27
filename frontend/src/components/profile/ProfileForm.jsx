import React, { useEffect, useMemo, useState } from "react";
import { useProfile } from "../../context/ProfileContext";

const emptyProject = { title: "", description: "", link: "", techStack: [] };
const emptyBlog = { title: "", content: "" };

const toCsv = (value = []) => value.join(", ");
const fromCsv = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const createInitialState = (profile) => ({
  username: profile?.username || "",
  name: profile?.name || "",
  bio: profile?.bio || "",
  avatar: profile?.avatar || "",
  location: profile?.location || "",
  socials: {
    github: profile?.socials?.github || "",
    linkedin: profile?.socials?.linkedin || "",
    email: profile?.socials?.email || "",
    spotify: profile?.socials?.spotify || ""
  },
  skillsText: toCsv(profile?.skills),
  projects:
    profile?.projects?.length > 0
      ? profile.projects.map((project) => ({
          ...project,
          techStackText: toCsv(project.techStack)
        }))
      : [{ ...emptyProject, techStackText: "" }],
  blogs: profile?.blogs?.length > 0 ? profile.blogs : [{ ...emptyBlog }]
});

const TextInput = ({ label, ...props }) => (
  <label className="flex flex-col gap-1 text-xs text-white/60">
    {label}
    <input
      {...props}
      className="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/70"
    />
  </label>
);

const TextArea = ({ label, ...props }) => (
  <label className="flex flex-col gap-1 text-xs text-white/60">
    {label}
    <textarea
      {...props}
      className="min-h-24 resize-y rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/70"
    />
  </label>
);

const ProfileForm = () => {
  const { profile, loading, error, upsertProfile } = useProfile();
  const initialState = useMemo(() => createInitialState(profile), [profile]);
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm(initialState);
  }, [initialState]);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setSocial = (field, value) => {
    setForm((prev) => ({
      ...prev,
      socials: { ...prev.socials, [field]: value }
    }));
  };

  const setCollectionItem = (collection, index, field, value) => {
    setForm((prev) => ({
      ...prev,
      [collection]: prev[collection].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = (collection, value) => {
    setForm((prev) => ({ ...prev, [collection]: [...prev[collection], value] }));
  };

  const removeItem = (collection, index) => {
    setForm((prev) => ({
      ...prev,
      [collection]: prev[collection].filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      username: form.username,
      name: form.name,
      bio: form.bio,
      avatar: form.avatar,
      location: form.location,
      socials: form.socials,
      skills: fromCsv(form.skillsText),
      projects: form.projects.map((project) => ({
        title: project.title,
        description: project.description,
        link: project.link,
        techStack: fromCsv(project.techStackText || "")
      })),
      blogs: form.blogs
    };

    await upsertProfile(payload);
    setMessage("Profile saved");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-5 text-white">
      <div className="grid grid-cols-2 gap-3">
        <TextInput label="Username" value={form.username} onChange={(e) => setField("username", e.target.value)} />
        <TextInput label="Name" value={form.name} onChange={(e) => setField("name", e.target.value)} required />
        <TextInput label="Avatar URL" value={form.avatar} onChange={(e) => setField("avatar", e.target.value)} />
        <TextInput label="Location" value={form.location} onChange={(e) => setField("location", e.target.value)} />
      </div>

      <TextArea label="Bio" value={form.bio} onChange={(e) => setField("bio", e.target.value)} />
      <TextInput label="Skills" value={form.skillsText} onChange={(e) => setField("skillsText", e.target.value)} placeholder="React, Node.js, MongoDB" />

      <div className="grid grid-cols-2 gap-3">
        <TextInput label="GitHub" value={form.socials.github} onChange={(e) => setSocial("github", e.target.value)} />
        <TextInput label="LinkedIn" value={form.socials.linkedin} onChange={(e) => setSocial("linkedin", e.target.value)} />
        <TextInput label="Email" value={form.socials.email} onChange={(e) => setSocial("email", e.target.value)} />
        <TextInput label="Spotify" value={form.socials.spotify} onChange={(e) => setSocial("spotify", e.target.value)} />
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/80">Projects</h2>
          <button type="button" onClick={() => addItem("projects", { ...emptyProject, techStackText: "" })} className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/10">
            Add
          </button>
        </div>
        {form.projects.map((project, index) => (
          <div key={index} className="grid gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <TextInput label="Title" value={project.title} onChange={(e) => setCollectionItem("projects", index, "title", e.target.value)} />
            <TextInput label="Link" value={project.link} onChange={(e) => setCollectionItem("projects", index, "link", e.target.value)} />
            <TextInput label="Tech Stack" value={project.techStackText || ""} onChange={(e) => setCollectionItem("projects", index, "techStackText", e.target.value)} />
            <TextArea label="Description" value={project.description} onChange={(e) => setCollectionItem("projects", index, "description", e.target.value)} />
            <button type="button" onClick={() => removeItem("projects", index)} className="justify-self-end rounded-lg px-3 py-1 text-xs text-red-200 hover:bg-red-500/20">
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/80">Blogs</h2>
          <button type="button" onClick={() => addItem("blogs", { ...emptyBlog })} className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:bg-white/10">
            Add
          </button>
        </div>
        {form.blogs.map((blog, index) => (
          <div key={index} className="grid gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <TextInput label="Title" value={blog.title} onChange={(e) => setCollectionItem("blogs", index, "title", e.target.value)} />
            <TextArea label="Markdown Content" value={blog.content} onChange={(e) => setCollectionItem("blogs", index, "content", e.target.value)} />
            <button type="button" onClick={() => removeItem("blogs", index)} className="justify-self-end rounded-lg px-3 py-1 text-xs text-red-200 hover:bg-red-500/20">
              Remove
            </button>
          </div>
        ))}
      </section>

      {(error || message) && (
        <p className={error ? "text-sm text-red-300" : "text-sm text-green-300"}>
          {error || message}
        </p>
      )}

      <button disabled={loading} className="rounded-xl bg-cyan-300/80 px-5 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-50">
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
