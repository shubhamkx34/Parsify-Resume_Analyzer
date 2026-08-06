import userModel from "../models/userModel.js"
import sessionModel from "../models/sessionModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

//User registration
export async function register(req, res) {
  //To fetch user details from frontend body
  const { username, email, password } = req.body;
  //Now to check if with the username and email entered any other user exists or not
  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyRegistered) {
    return res.status(409).json({
      message: "User already exists with this email or username ",
    });
  }
  //Now if email and username are unique , then we can create a new user

  //password is never stored in plaintext format in the database , stored in hash format -> crypto package from node.js is used here
  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  //Till now the user will register in the server and server will store data in the database

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  //SESSION SET-UP:
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  //With the help of JWT_SECRET ,any server can identify which server has created the token
  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  //To send refreshToken in cookie:
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });

  res.status(201).json({
    message: "User Registered Successfully",
    //To print user details and token
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

//User Login:
export async function login(req, res) {
  const { email, password } = req.body;
  //email check
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid Username or password",
    });
  }
  //password check
  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = hashedPassword == user.password;
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Username or password",
    });
  }
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  //Session :
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, //Time in milliseconds
  });

  return res.status(200).json({
    message: "Logged in successfully!",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

//This is the refresh api which is used to request server to generate a new accessToken using refreshToken when hit in this api
export async function refreshToken(req, res) {
  //To access refreshToken from cookie
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "refreshToken not found!",
    });
  }
  //To extract the id inside refreshToken
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  //check if user had Logged-out  and  session set to [revoked:true] ?
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });
  if (!session) {
    return res.status(401).json({
      message: "Invalid Refresh Token",
    });
  }

  //To create new accessToken
  const accessToken = jwt.sign(
    {
      id: decoded.id,
      sessionId: session._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
  //To generate new refresh token
  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  //After a new refresh Token is generated , then the refreshtoken hash stored in the session should also be new , so we have to generate a new refreshTokenHash also.
  const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();

  //To push the newly generated refreshToken in to cookies
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });

  res.status(200).json({
    message: "accessToken is refreshed successfully!",
    accessToken,
  });
}

//This is the end-point for showing the details of the user in response , which requested/registered in the server
export async function getUser(req, res) {
  const user = req.user;
  res.status(200).json({
    message: "User Fetched Successfully! ",
    user: {
        id:user._id,
      username: user.username,
      email: user.email,
    },
  });
}

//Cleared the refreshToken stored in cookies and set session ->revoked:true
export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh Token not found!",
    });
  }
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });

  if (!session) {
    return res.status(400).json({
      message: "Invalid Refresh Token!",
    });
  }
  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out successfully",
  });
}