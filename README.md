# Gravatar Profile App

This project is a React app built with [Create React App](https://github.com/facebook/create-react-app). It allows users to enter profile details, validates email input, fetches Gravatar profile info based on the email, and displays either the Gravatar profile or the entered form data.

## Features

- **Form validation** using validator to ensure valid email input.
- **Fetch Gravatar data** from a backend API by hashing the email using MD5.
- **Fallback to form data** if no Gravatar profile is found or API request fails.
- Display user profile with avatar, username, location, bio, etc.

---

## Live Demo

Try the app live here:  
[Live](https://gravatar-based-user-profile-card.onrender.com/)

## Clone Repository

Clone the repo using SSH:  
```bash
git clone git@github.com:AnuradhaHariharan/Gravatar-Based-User-Profile-Card.git
cd profile-app
npm install
npm start

---
```
## How it Works

1. User fills out the profile form (email, name, username, location, bio, etc).
2. Email is validated locally using `validator.isEmail`.
3. Email is hashed with MD5 and sent to the backend API via `axios` to fetch Gravatar profile data.
4. If Gravatar profile is found, the app displays that data (avatar, username, location, bio).
5. If no Gravatar profile exists or the API call fails, the app displays the data entered in the form.

---

