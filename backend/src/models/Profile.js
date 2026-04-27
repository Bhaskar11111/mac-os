import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    techStack: [{ type: String, trim: true }]
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const githubRepoSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true, default: "" },
    url: { type: String, trim: true },
    language: { type: String, trim: true, default: "" },
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    updatedAt: { type: Date }
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    name: { type: String, required: true, trim: true },
    bio: { type: String, trim: true, default: "" },
    avatar: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    socials: {
      github: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      email: { type: String, trim: true, default: "" },
      spotify: { type: String, trim: true, default: "" }
    },
    skills: [{ type: String, trim: true }],
    projects: [projectSchema],
    blogs: [blogSchema],
    githubRepos: [githubRepoSchema],
    githubReposFetchedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
