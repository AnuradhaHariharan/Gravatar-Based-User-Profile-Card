import { useState } from "react";
import axios from "axios";
import md5 from "blueimp-md5";

export default function ProfileForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    phone: "",
    location: "",
    website: "",
    bio: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailHash = md5(formData.email.trim().toLowerCase());

    try {
      const res = await axios.get(`http://localhost:4000/gravatar/${emailHash}`);
      const data = res.data;
      const entry = data.entry[0];

      onSubmit({
        ...formData,
        gravatar: {
          image: `https://www.gravatar.com/avatar/${emailHash}`,
          username: entry.displayName || formData.username,
          location: entry.currentLocation || entry.location || formData.location,
          bio: entry.aboutMe || formData.bio,
        },
      });
    } catch (error) {
      console.warn("Using fallback Gravatar profile:", error.message);
      onSubmit({
        ...formData,
        gravatar: {
          image: `https://www.gravatar.com/avatar/${emailHash}?d=mp`,
          username: formData.username,
          location: formData.location,
          bio: formData.bio,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location (City, Country)"
        required
        onChange={handleChange}
      />
      <input
        type="url"
        name="website"
        placeholder="Website / Social URL"
        onChange={handleChange}
      />
      <textarea
        name="bio"
        placeholder="Bio / Short Description"
        rows="3"
        onChange={handleChange}
      ></textarea>
      <button type="submit">Generate Profile</button>
    </form>
  );
}
