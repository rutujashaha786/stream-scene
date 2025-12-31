# 🎬 StreamScene – Movies & TV Streaming Platform

StreamScene is a full-stack web application inspired by JioCinema, designed for discovering, previewing, and streaming movies and TV shows. It provides an engaging experience with curated content, personalized watchlists, and premium streaming features.

## 🔗 Demo
[🎥 Walkthrough](https://drive.google.com/file/d/15i0mISvJ-fF3Y-RtVSDCodGBLT8gJ3tc/view?usp=sharing ) | [🌐 Live Demo](https://stream-scene.vercel.app/ )

## ✨ Features
- **Movies & TV Shows Discovery:** Fetch and categorize movies and TV shows from TMDB APIs.
- **Watchlist & Share:** Add content to your watchlist and share content links with others.
- **User Authentication:** Secure JWT-based Sign In, Sign Up, and Password Reset flows.
- **Premium Streaming:** Custom video streaming for premium users with secure backend APIs.
- **Payment Integration:** Seamless subscription purchase using Razorpay API.

## 🧱 Tech Stack
- **Frontend:** Next.js, React, Redux, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Payments:** Razorpay API
- **External APIs:** TMDB for movie and TV show data

## 📦 Repository Structure
StreamScene is maintained using two separate repositories:

🔗 Frontend Repository: https://github.com/rutujashaha786/stream-scene.git <br />
🔗 Backend Repository: https://github.com/rutujashaha786/stream-scene-backend.git

## Pre-requisite - Backend Setup
Backend must be running locally or deployed for full functionality.<br />
For running the backend server locally, follow the instructions in the README file of the repo: https://github.com/rutujashaha786/stream-scene-backend

## 📦 Frontend Setup

1. #### Clone the Repository:

    ```bash
    git clone https://github.com/rutujashaha786/stream-scene.git
    cd yourprojectname
    ``` 
2. #### Install Dependencies:

    ```bash
    npm install (Note: Use node version >=18.20)
    ```

3. #### Environment Variables:
    Create .env file in root directory-

    ```bash
    NEXT_PUBLIC_KEY_ID= <public Razorpay key>
    NEXT_PUBLIC_API_BASE_URL= <Backend API base URL>
    ```

    ###### Example values for Backend API base URL:

    - Local backend:
        ```bash
        http://localhost:3005/api
        ```
    - Deployed backend:
        ```bash
        https://api.streamscene.stream/api
        ```
4. #### Start the Server:

    ```bash
    npm run dev
    ```

    Open http://localhost:3000 to view the app.

### Usage:
- Navigate through Home, Movies, TV Shows sections.
- Click on Stream+ videos for premium content (login & subscription required).
- Add movies or TV shows to your Watchlist for easy access.
- Share content links with friends via the Share button.