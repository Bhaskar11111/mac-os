import mongoose from "mongoose";
import Profile from "../models/Profile.js";
import {
  fetchTopGithubRepos,
  shouldRefreshGithubRepos
} from "../services/githubService.js";
import { validateAndNormalizeProfile } from "../utils/profileValidation.js";

const saveProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid authenticated user"
      });
    }

    const { profile: payload, githubUsername, errors } =
      validateAndNormalizeProfile(req.body);

    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: errors.join(", ")
      });
    }

    const existingProfile = await Profile.findOne({ userId: req.user.userId });
    const update = {
      ...payload,
      userId: req.user.userId
    };

    if (githubUsername && (!existingProfile || shouldRefreshGithubRepos(existingProfile))) {
      try {
        update.githubRepos = await fetchTopGithubRepos(githubUsername);
        update.githubReposFetchedAt = new Date();
      } catch {
        if (!existingProfile?.githubRepos?.length) {
          update.githubRepos = [];
        }
      }
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: update },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    res.json({
      success: true,
      data: {
        userId: profile.userId.toString(),
        profile
      }
    });
  } catch (error) {
    const isDuplicate = error.code === 11000;

    res.status(isDuplicate ? 409 : 500).json({
      success: false,
      message: isDuplicate
        ? "Username is already taken"
        : error.message || "Unable to save profile"
    });
  }
};

export const upsertProfile = saveProfile;
export const updateProfile = saveProfile;

export const getPublicProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected"
      });
    }

    const username = req.params.username?.trim().toLowerCase();

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required"
      });
    }

    const profile = await Profile.findOne({ username }).lean();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch profile"
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected"
      });
    }

    const profile = await Profile.findOne({ userId: req.user.userId }).lean();

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch profile"
    });
  }
};
