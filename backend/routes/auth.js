const router = require("express").Router();
const { signup, signin, signout, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

// Signup
router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 characters").isLength({ min: 2 }),
    check("email", "Please enter a valid email!").isEmail(),
    check("password", "Password should be at least 6 characters").isLength({
      min: 6
    })
  ],
  signup
);

// Signin
router.post(
  "/signin",
  [
    check("email", "Please enter a valid email!").isEmail(),
    check("password", "Password is required!").isLength({
      min: 1
    })
  ],
  signin
);

// Signout
router.get("/signout", signout);

module.exports = router;
