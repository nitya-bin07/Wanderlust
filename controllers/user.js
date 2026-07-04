const passport = require("passport");
const User = require("../models/user");

// Show signup form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Register new user
module.exports.signupUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    let errorMessage = "Something went wrong!";
    if (e.name === "UserExistsError") {
      errorMessage = "Username already exists.";
    }
    req.flash("error", errorMessage);
    res.redirect("/signup");
  }
};

// Show login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Login user
module.exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", "Invalid username or password.");
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  })(req, res, next);
};

// Logout user
module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have successfully logged out.");
    res.redirect("/listings");
  });
};
