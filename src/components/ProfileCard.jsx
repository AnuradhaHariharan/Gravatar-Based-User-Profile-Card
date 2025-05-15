
export default function ProfileCard({ profile }) {
    const { fullName, email, phone, website, gravatar } = profile;
  
    return (
        <div className="profile-card">
        <img src={profile.gravatar.image} alt={`${profile.fullName}'s avatar`} />
        <h2>{profile.gravatar.username || profile.username || profile.fullName}</h2>
        <p>{profile.gravatar.location || profile.location}</p>
        {profile.gravatar.jobTitle && <p>Job Title: {profile.gravatar.jobTitle}</p>}
        {profile.gravatar.organization && <p>Organization: {profile.gravatar.organization}</p>}
        <p> {profile.phone}</p>
        <p> {profile.email}</p>
        <p>{profile.gravatar.bio || profile.bio}</p>
        {profile.website && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            social Profile
          </a>
        )}
      </div>
      
    );
  }
  