import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "blueimp-md5";
import validator from "validator";

export default function ProfileForm({ setProfile,setReset ,reset,profile,setResetValues}) {
  const [formData, setFormData] = useState({
    email: "", fullName: "", username: "", phone: "",
    location: "", website: "", bio: ""
  });
 
  useEffect(() => {
    if (reset) {
      const newFormData = {
        email: profile.email,
        fullName: profile.gravatar?.fullName || profile.fullName,
        username: profile.gravatar?.username || profile.username,
        phone: profile.phone,
        location: profile.gravatar?.location || profile.location,
        website: profile.website || "",
        bio: profile.gravatar?.bio || profile.bio,
      };
      console.log("Setting formData and resetValues:", newFormData);
      setFormData(newFormData);
    }
  }, [reset]);
  



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
    console.log(hash)
    try {
      const { data } = await axios.get(
        `https://gravatar-backend.onrender.com/gravatar/${hash}`
      );
      const entry = data?.entry?.[0] || {};
      console.log(entry)
      setProfile({
        ...formData,
        gravatar: {
          image: entry.photos[0].value,
          username: entry.displayName || username,
          location: entry.currentLocation || entry.location || location,
          bio: entry.aboutMe || bio,
        },
      });
    } catch {
      setProfile({
        ...formData,
        gravatar: {
          image: `https://www.gravatar.com/avatar/${hash}?d=mp`,
          username,
          location,
          bio,
        },
      });
    }
    console.log(formData);
  reset?setResetValues(formData):setResetValues(null);
    setReset(false);
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
          value={formData[field] || ""} 
        />
      ))}
      <textarea
        name="bio"
        placeholder="Bio"
        rows="3"
        onChange={handleChange}
        value={formData.bio || ""} 
      ></textarea>
      {!reset?
      <button type="submit">Generate Profile</button>:  <button type="submit">Submit</button>
     }
    </form>
  );
}
