# Music Backend API

A **role-based backend API** for a music streaming platform built with **Node.js, Express, and MongoDB**.  
This project provides authentication, music upload, album management, and secure role-based access using **JWT and cookies**.

---

# Features

- **JWT Authentication**
- **Role Based Access Control**
  - `artist` → upload music & create albums
  - `user` → browse music & albums
- **Password Hashing using Bcrypt**
- **Cookie-based authentication**
- **Music Upload using Multer**
- **Album Creation**
- **Pagination for Music Listing**
- **MongoDB Database Integration**
- **Modular Project Structure (MVC style)**

---

# Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **multer**
- **cookie-parser**
- **npm**

---

# Project Structure

```
src
 ├── controller
 │    ├── auth.controller.js
 │    └── music.controller.js
 │
 ├── router
 │    ├── auth.router.js
 │    └── music.router.js
 │
 ├── middlewares
 │    └── auth.middleware.js
 │
 ├── model
 │    ├── user.model.js
 │    ├── music.model.js
 │    └── album.model.js
 │
 ├── service
 │
 ├── db
 │
 └── app.js

.env
index.js
package-lock.json
package.json
```

---

# Environment Variables

Create a `.env` file in the root directory:

```
PORT=
MONGO_URI=
JWT_TOKEN=
IMGKIT_URI=
```

---

# Database Schema

## User

```
username : String (unique)
email : String (unique)
password : String (hashed)
role : user | artist
```

---

## Music

```
uri : String
title : String
artist : ObjectId (ref: user)
```

---

## Album

```
title : String
musics : [ObjectId] (ref: music)
artist : ObjectId (ref: user)
```

---

# API Endpoints

## Auth Routes

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

---

## Music Routes

```
POST /api/music/upload
POST /api/music/create-album
GET  /api/music
GET  /api/music/album
GET  /api/music/album/:id
```

---

---

## API Base URL

Local development:

```
http://localhost:3000
```

Production (Live URL):

```
https://your-deployment-url.com](https://music-backend-project.onrender.com
```

---

# Authentication APIs

## Register User

Creates a new user account.

**Endpoint**

```
POST /api/auth/register
```

**Request Body**

```
{
  "username": "artist1",
  "email": "artist1@example.com",
  "password": "securePassword123",
  "role": "artist"
}
```

**Response**

```
{
  "message": "User Registered Successfully!"
}
```

---

## Login User

Logs in an existing user and stores the JWT token in cookies.

**Endpoint**

```
POST /api/auth/login
```

**Request Body**

```
{
  "email": "artist1@example.com",
  "password": "securePassword123"
}
```

**Response**

```
{
  "message": "You are logged in!"
}
```

---

## Logout User

Logs out the currently authenticated user by clearing the authentication cookie.

**Endpoint**

```
POST /api/auth/logout
```

**Response**

```
{
  "message": "User logged out successfully"
}
```

---

# Music APIs

## Upload Music

Uploads a music file.  
Only users with the **artist role** are allowed to access this endpoint.

**Endpoint**

```
POST /api/music/upload
```

**Content Type**

```
multipart/form-data
```

Only a single file upload is supported per request!!!

**Form Data**

| Field | Type |
|------|------|
title | text |
music | file |

Example:

```
title: Hip Hop
music: file.mp3
```

**Response**

```
{
  "message": "Music Created!"
}
```

---

## Fetch All Musics

Returns a list of music tracks with pagination support.

**Endpoint**

```
GET /api/music
```

**Query Parameters**

```
page
limit
```

Example request:

```
GET /api/music?page=1&limit=10
```

**Response**

```
{
  "message": "Music fetched successfully",
  "data": [
    {
      "_id": "music_id",
      "title": "Hip Hop",
      "uri": "music_file_url"
    }
  ]
}
```

---

# Album APIs

## Create Album

Creates a new album using existing music IDs.  
Only artists are allowed to create albums.

**Endpoint**

```
POST /api/music/create-album
```

**Request Body**

```
{
  "title": "My Album",
  "musics": [
    "69a95fd0a429a337d65eb59e",
    "69a9c337d7553e90fdf0e3b1",
    "69a95d884f18c0044ce64ad5"
  ]
}
```

**Response**

```
{
  "message": "Album created successfully"
}
```

---

## Fetch All Albums

Returns all albums available in the database.

**Endpoint**

```
GET /api/music/album
```

**Response**

```
{
  "message": "Albums fetched successfully",
  "data": [
    {
      "_id": "album_id",
      "title": "My Album"
    }
  ]
}
```

---

## Fetch Music of an Album

Returns the music tracks belonging to a specific album.

**Endpoint**

```
GET /api/music/album/:id
```

Example request:

```
GET /api/music/album/69aab02ddaa04f1a052fd0ba?page=1&limit=2
```

**Query Parameters**

```
page
limit
```

**Response**

```
{
  "message": "Album fetched successfully",
  "data": {
    "title": "My Album",
    "musics": [
      {
        "_id": "music_id",
        "title": "Hip Hop",
        "uri": "music_file_url"
      }
    ]
  }
}
```

---

# Authentication

- JWT tokens are generated during login/register.
- Tokens are stored in **HTTP-only cookies**.
- Middleware validates tokens for protected routes.

---

# Pagination Example

```
GET /api/music?page=1&limit=10
```

Returns paginated music results.

---

# Installation

Clone the repository

```
git clone <repo-url>
```

Install dependencies

```
npm install
```

Run the server

```
npm run dev
```

or

```
npm run start
```



---

# Deployment

This project is deployed using **Render**.

Live Project Link: https://music-backend-project.onrender.com

---
