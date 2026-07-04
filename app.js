// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// Routes
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

// MongoDB URL
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
mongoose.connect(dbUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration (MongoDB-backed)
const sessionOptions = {
  store: MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
      secret: process.env.SESSION_SECRET || "fallbacksecret",
    },
    touchAfter: 24 * 3600, // lazy session update
  }),
  name: "session",
  secret: process.env.SESSION_SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true, // uncomment when using HTTPS
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionOptions));
app.use(flash());

// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & user data middleware for views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", userRoutes);
app.use("/", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).render("error.ejs", { err });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serving on http://localhost:${PORT}`);
});
