import { useEffect } from "react";

export default function ProfileCard({ profile, setReset, resetValues }) {
  useEffect(() => {
    console.log("resetValues change", resetValues);
  }, [resetValues]);


  const data = resetValues ?? {
    email: profile.email,
    fullName: profile.fullName,
    username: profile.gravatar?.username ?? profile.username,
    phone: profile.phone,
    location: profile.gravatar?.location ?? profile.location,
    website: profile.website,
    bio: profile.gravatar?.bio ?? profile.bio,
  };

  return (
    <div className="profile-card">
      <img src={profile.gravatar.image} alt={`${data.fullName}'s avatar`} />
      <h2>{data.username}</h2>
      <p>{data.location}</p>
      <p>{data.phone}</p>
      <p>{data.email}</p>
      <p>{data.bio}</p>
      {data.website && (
        <a href={data.website} target="_blank" rel="noopener noreferrer">
          Social Profile
        </a>
      )}
      <div className="reset-container">
        <button onClick={() => setReset(true)}>Reset</button>
      </div>
    </div>
  );
}
