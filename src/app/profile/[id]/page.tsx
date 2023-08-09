function UserProfile({ params }: any) {
  const profileId = params.id;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-2">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="ml-2 rounded bg-orange-500 p-2 text-black">
          {profileId}
        </span>
      </p>
    </div>
  );
}

export default UserProfile;
