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

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async e => {
  e.preventDefault();
  const emailHash = md5(formData.email.trim().toLowerCase());

  try {
    const res = await axios.get(`https://www.gravatar.com/${emailHash}.json`);
    const entry = res.data.entry[0];

    onSubmit({
      ...formData,
      gravatar: {
        image: `https://www.gravatar.com/avatar/${emailHash}`,
        username: entry.displayName || formData.username,
        location: entry.currentLocation || entry.location || formData.location,
        bio: entry.aboutMe || formData.bio,
        jobTitle: entry.photos ? entry.photos[0].value : '', // optional
        organization: entry.organizations && entry.organizations.length > 0 ? entry.organizations[0].name : '', // optional
      }
    });
  } catch {
    onSubmit({
      ...formData,
      gravatar: {
        image: `https://www.gravatar.com/avatar/${emailHash}?d=mp`,
        username: formData.username,
        location: formData.location,
        bio: formData.bio,
        jobTitle: '',
        organization: '',
      }
    });
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" required onChange={handleChange} />
      <input type="url" name="website" placeholder="Website / Social URL" onChange={handleChange} />
      <textarea name="bio" placeholder="Bio" rows="3" onChange={handleChange}></textarea>
      <button type="submit">Generate Profile</button>
    </form>
  );
}
