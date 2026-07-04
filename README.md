# Property Rental Web Application

A full-stack web platform built using Node.js, Express.js, MongoDB, and EJS to list, browse, and manage rental properties with secure authentication, image uploads, and reviews. Built using the MVC architecture for clean scalability and maintainability.

**Live Demo**: [wanderlust-9ma5.onrender.com](https://wanderlust-9ma5.onrender.com)

> Note: hosted on Render's free tier — the app "sleeps" after periods of inactivity, so the first load may take 30-50 seconds to spin back up.

---

## Features

- **Authentication**: Secure signup/login/logout using Passport.js (session-based)
- **Property Listings**: Create, browse, edit, and delete listings
- **Image Uploads**: Listing photos are uploaded and stored on Cloudinary
- **Reviews**: Authenticated users can leave and delete reviews on listings
- **Authorization**: Only a listing's owner can edit or delete it
- **Session Persistence**: Sessions are stored in MongoDB via `connect-mongo`
- **Flash Messages**: User feedback on actions (success/error) via `connect-flash`
- **MVC Architecture**: Clean separation of models, views, controllers, and routes

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose (MongoDB Atlas recommended)
- **Templating**: EJS with `ejs-mate` for layouts
- **Authentication**: Passport.js (`passport-local`, `passport-local-mongoose`)
- **Image Storage**: Cloudinary + Multer (`multer-storage-cloudinary`)
- **Session Store**: `connect-mongo`

---

## Project Structure

```
├── controllers/     # Route handler logic (listings, users, reviews)
├── models/          # Mongoose schemas (User, Listing, Review)
├── routes/          # Express route definitions
├── views/           # EJS templates (layouts, partials, pages)
├── public/          # Static assets (CSS, client-side JS)
├── init/            # Database seed script and sample data
├── cloudConfig.js   # Cloudinary + Multer storage configuration
├── app.js           # Express app entry point
└── package.json
```

---

## Getting Started (Local Setup)

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.x recommended)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster (or a local MongoDB install)
- A free [Cloudinary](https://cloudinary.com/users/register_free) account

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the project root

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SESSION_SECRET=any_long_random_string
PORT=8080
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> If `ATLASDB_URL` is omitted, the app falls back to a local MongoDB instance at `mongodb://127.0.0.1:27017/wanderlust`.

### 4. (Optional) Seed sample listings

```bash
node init/index.js
```

### 5. Run the app

```bash
npm run dev     # with nodemon (auto-restart on changes)
# or
npm start       # plain node
```

Visit **http://localhost:8080**

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `ATLASDB_URL` | No* | MongoDB connection string (falls back to local Mongo if unset) |
| `SESSION_SECRET` | Yes | Secret used to sign session cookies |
| `PORT` | No | Port the server runs on (defaults to 8080) |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |

---

## Future Improvements

- Advanced search and filtering (price range, location, amenities)
- Admin dashboard
- Booking/reservation system
- Pagination for listings

---

## About this project

This project was originally built as a learning exercise, then independently set up, debugged, and deployed by me end-to-end — including resolving environment configuration issues, fixing a broken entry point, wiring up Cloudinary from scratch, and diagnosing a production MongoDB Atlas networking/TLS issue during deployment.

I'm actively extending it with additional features (see Future Improvements above) as a way to go deeper into the codebase.

## License

This project is licensed under the MIT License.
