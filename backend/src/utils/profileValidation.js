const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const trimString = (value) => (typeof value === "string" ? value.trim() : "");

const isValidUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

const isValidEmail = (value) => {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const cleanStringArray = (value) => {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(trimString).filter(Boolean))];
};

const cleanProjects = (projects) => {
  if (!Array.isArray(projects)) return [];

  return projects
    .filter(isObject)
    .map((project) => ({
      title: trimString(project.title),
      description: trimString(project.description),
      link: trimString(project.link),
      techStack: cleanStringArray(project.techStack)
    }))
    .filter((project) => project.title);
};

const cleanBlogs = (blogs) => {
  if (!Array.isArray(blogs)) return [];

  return blogs
    .filter(isObject)
    .map((blog) => ({
      title: trimString(blog.title),
      content: trimString(blog.content),
      createdAt: blog.createdAt || new Date()
    }))
    .filter((blog) => blog.title && blog.content);
};

const getGithubUsername = (github) => {
  const cleanGithub = trimString(github);
  if (!cleanGithub) return "";

  try {
    const url = new URL(cleanGithub);
    if (!url.hostname.includes("github.com")) return cleanGithub;
    return url.pathname.split("/").filter(Boolean)[0] || "";
  } catch {
    return cleanGithub.replace(/^@/, "");
  }
};

export const validateAndNormalizeProfile = (body = {}) => {
  const errors = [];
  const socials = isObject(body.socials) ? body.socials : {};
  const username = trimString(body.username || getGithubUsername(socials.github));

  const profile = {
    username: username.toLowerCase(),
    name: trimString(body.name),
    bio: trimString(body.bio),
    avatar: trimString(body.avatar),
    location: trimString(body.location),
    socials: {
      github: trimString(socials.github),
      linkedin: trimString(socials.linkedin),
      email: trimString(socials.email),
      spotify: trimString(socials.spotify)
    },
    skills: cleanStringArray(body.skills),
    projects: cleanProjects(body.projects),
    blogs: cleanBlogs(body.blogs)
  };

  if (!profile.name) errors.push("Name is required");
  if (!profile.username) errors.push("Username or GitHub social is required");
  if (profile.avatar && !isValidUrl(profile.avatar)) {
    errors.push("Avatar must be a valid URL");
  }

  ["github", "linkedin", "spotify"].forEach((key) => {
    if (profile.socials[key] && !isValidUrl(profile.socials[key])) {
      errors.push(`${key} must be a valid URL`);
    }
  });

  if (!isValidEmail(profile.socials.email)) {
    errors.push("Email must be valid");
  }

  profile.projects.forEach((project, index) => {
    if (project.link && !isValidUrl(project.link)) {
      errors.push(`Project ${index + 1} link must be a valid URL`);
    }
  });

  return {
    profile,
    githubUsername: getGithubUsername(profile.socials.github),
    errors
  };
};
