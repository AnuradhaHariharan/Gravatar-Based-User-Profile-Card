import { useState } from "react";
import axios from "axios";
import md5 from "blueimp-md5";
import validator from "validator";

export default function ProfileForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "", fullName: "", username: "", phone: "",
    location: "", website: "", bio: ""
  });
  const [error, setError] = useState("");

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, username, location, bio } = formData;
    const emailTrimmed = email.trim().toLowerCase();

    if (!validator.isEmail(emailTrimmed)) {
      return setError("Invalid email address.");
    }

    setError("");
    const hash = md5(emailTrimmed);

    try {
      const { data } = await axios.get(
        `https://gravatar-backend.onrender.com/gravatar/${hash}`
      );
      const entry = data?.entry?.[0] || {};
      onSubmit({
        ...formData,
        gravatar: {
          image: `https://www.gravatar.com/avatar/${hash}`,
          username: entry.displayName || username,
          location: entry.currentLocation || entry.location || location,
          bio: entry.aboutMe || bio,
        },
      });
    } catch {
      onSubmit({
        ...formData,
        gravatar: {
          image: `https://www.gravatar.com/avatar/${hash}?d=mp`,
          username,
          location,
          bio,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {["email", "fullName", "username", "phone", "location", "website"].map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : field === "website" ? "url" : "text"}
          name={field}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          required={["email", "fullName", "username", "phone", "location"].includes(field)}
          onChange={handleChange}
        />
      ))}
      <textarea
        name="bio"
        placeholder="Bio"
        rows="3"
        onChange={handleChange}
      ></textarea>
      <button type="submit">Generate Profile</button>
    </form>
  );
}
