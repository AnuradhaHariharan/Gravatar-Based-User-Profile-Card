import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [profile, setProfile] = useState(null);

  return (
    <div>
      <Navbar profile={profile}/>
    <div className="container">
      <h1>Gravatar Profile Card</h1>
      {!profile ? <ProfileForm onSubmit={setProfile} /> : <ProfileCard profile={profile} />}
    </div>
    <Footer/>
    </div>
  );
}

export default App;

