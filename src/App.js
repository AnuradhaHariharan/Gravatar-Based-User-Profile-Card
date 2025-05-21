import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [profile, setProfile] = useState(null);
  const [reset,setReset]=useState(false);
  const [resetValues,setResetValues]=useState(null);

  return (
    <div>
      <Navbar profile={profile}/>
    <div className="container">
      <h1>Gravatar Profile Card</h1>
      {!profile||reset ? <ProfileForm setProfile={setProfile} setReset={setReset} reset={reset} setResetValues={setResetValues} profile={profile}/>
      : <ProfileCard profile={profile} setReset={setReset} resetValues={resetValues} />}
    </div>
    <Footer/>
    </div>
  );
}

export default App;

