const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Profile = require("../models/Profile");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const config = require("../config/default.json");
const request = require("request");

// @route api/profile/me
// @desc  Get current user profile
// @access private

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const profile = await Profile.findOne({ user: id }).populate({
      path: "user",
      select: ["name", "email", "avatar"],
      model: User,
    });

    if (!profile) {
      return res.status(400).json([{ err: { msg: "Profile not found" } }]);
    }

    res.status(200).send(profile);
  } catch (err) {
    console.log(err);
    res.status(400).json([{ err: { msg: "Server Error" } }]);
  }
});

// @route api/profile/
// @desc  Create User Profile
// @access private

router.post(
  "/",
  authMiddleware,
  [body("status").not().isEmpty(), body("skills").not().isEmpty()],
  async (req, res) => {
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedIn,
      instagram,
    } = req.body;
    const { id } = req.user;

    const profileData = {};

    profileData.user = id;
    if (company) profileData.company = company;
    if (website) profileData.website = website;
    if (location) profileData.location = location;
    if (status) profileData.status = status;
    if (bio) profileData.bio = bio;
    if (githubusername) profileData.githubusername = githubusername;
    if (skills) {
      let skillsarray = skills.split(",").map((skill) => skill.trim());
      profileData.skills = skillsarray;
    }

    profileData.social = {};

    if (youtube) profileData.social.youtube = youtube;
    if (twitter) profileData.social.twitter = twitter;
    if (facebook) profileData.social.facebook = facebook;
    if (instagram) profileData.social.instagram = instagram;
    if (linkedIn) profileData.social.linkedIn = linkedIn;

    try {
      const profile = await Profile.findOne({ user: id });

      if (profile) {
        const updatedProfile = await Profile.findOneAndUpdate(id, profileData, {
          new: true,
        });

        return res.status(200).send(updatedProfile);
      }

      const createProfile = await new Profile(profileData);

      await createProfile.save();

      res.status(200).send(createProfile);
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

// @route api/profile/
// @desc  Create User Profile
// @access public

router.get("/", async (req, res) => {
  try {
    let profile = await Profile.find().populate({
      path: "user",
      select: ["name", "email", "avatar"],
      model: User,
    });
    res.status(200).send(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@ api/profile/user/:userod
//@desc get profile by userid
//@ public

router.get("/user/:userid", async (req, res) => {
  try {
    let userid = req.params.userid;
    const userProfile = await Profile.findOne({ user: userid }).populate({
      path: "user",
      select: ["name", "emai", "avatar"],
      model: User,
    });
    res.status(200).send(userProfile);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

//@ Delete api/profile
//@desc delete profile and user
//@ private

router.delete("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user.id;
    await Profile.deleteOne({ user: user });
    await User.deleteOne({ _id: user });
    res.status(200).send("Profile deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// @route  PUT api/profile/experience
// @desc Add profile experience
// @access private

router.put(
  "/experience",
  authMiddleware,
  [
    body("title").not().isEmpty().withMessage("Title is Required!"),
    body("company").not().isEmpty().withMessage("Company is Required!"),
    body("location").not().isEmpty().withMessage("Location is Required"),
    body("from").not().isEmpty().withMessage("Date From is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const experience = {};
    const { id } = req.user;
    console.log(id);

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    if (title) experience.title = title;
    if (company) experience.company = company;
    if (location) experience.location = location;
    if (from) experience.from = from;
    if (to) experience.to = to;
    if (current) experience.current = true;
    if (description) experience.description = description;

    try {
      const profile = await Profile.findOne({ user: id });

      profile.experience.unshift(experience);

      await profile.save();

      // const profile = await Profile.findOneAndUpdate(
      //     { user:id },
      //     { $push: { experience} },
      //     {new: true}
      // );

      res.status(200).send(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE /experience/:id
// @desc delete profile experience by id
// @access private

router.delete("/experience/:id", authMiddleware, async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    const profile = await Profile.findOne({ user: id });

    profile.experience.map((exp) => {
      if (exp.id === req.params.id) {
        let index = profile.experience.indexOf(exp);
        profile.experience.splice(index, 1);
      }
    });

    await profile.save();

    res.status(200).send(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  PUT /education
// @desc update education in profile
// @access private

router.put(
  "/education",
  authMiddleware,
  [
    body("school").not().isEmpty().withMessage("School is required"),
    body("degree").not().isEmpty().withMessage("Degree is required"),
    body("fieldOfStudy")
      .not()
      .isEmpty()
      .withMessage("Field of study is required"),
    body("from").not().isEmpty().withMessage("start Date is required"),
    body("description").not().isEmpty().withMessage("Desc is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const education = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(education);

      await profile.save();

      res.status(200).send(profile);
    } catch (err) {
      console.log(err);
      res.send("Server error");
    }
  }
);

// @route  DELETE /edication/:id
// @desc delete profile education by id
// @access private

router.delete("/education/:id", authMiddleware, async (req, res) => {
  try {
    const educationId = req.params.id;
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.map((edu) => {
      if (edu.id === educationId) {
        const educationIndex = profile.education.indexOf(edu);
        profile.education.splice(educationIndex, 1);
      }
    });

    await profile.save();

    res.status(200).send(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  GET /github/:username
// @desc   Get Github Profiles
// @access public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.githubCliendId}&client_secret=${config.githubSecret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, function (error, response, body) {
      if (error) {
        console.log(error);
        return res.send(400).send("server not found");
      }

      if (response.statusCode == 200) {
        return res.status(200).send(JSON.parse(body));
      }

      res.status(400).send("Profile Not Found");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
