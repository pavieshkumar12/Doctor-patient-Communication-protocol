const User = require("../modules/userModule");
const bcrypt = require("bcryptjs");
const { createToken, verifyToken } = require("../token/jwt")


//user-login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Details Missing");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user found");
    }
    const isPasswordIsValid = await bcrypt.compare(password, user.password);
    if (!isPasswordIsValid) {
      throw new Error("Inncorrect username or password");
    }
    const token = await createToken({ id: user._id });
    res.json({ token });
  }
  catch (err) {
    next(err);
  }
}

//user-Register
const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new Error("Details Missing");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hashedPassword, name
    });
    res.status(200).json(user);

  }
  catch (err) {
    next(err);
  }
}

//Token auth process
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }
    const verify = await verifyToken(token);
    if (!verify) {
      throw new Error("Unauthorized");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, protect };