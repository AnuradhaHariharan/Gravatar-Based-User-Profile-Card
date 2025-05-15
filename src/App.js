import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";
import "./index.css";

function App() {
  const [profile, setProfile] = useState(null);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Gravatar Profile Card</h1>
      {!profile ? <ProfileForm onSubmit={setProfile} /> : <ProfileCard profile={profile} />}
    </div>
  );
}

export default App;

