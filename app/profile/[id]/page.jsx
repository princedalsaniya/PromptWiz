"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

/*
  desc      : Page - Someone's Profile
  route     : `{host}/profile/{id}`
  requires  : Profile = component that will render the whole profile of the userID provided in url.
                      name      = in this case it would be My.
                      desc      = description of the profile.
                      data      = all posts created by the currentUser.
                      handlers  = Edit an Delete handlers.
  exports   : Someone's Profile page
  author    : Prince Dalsaniya
*/

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of his/her imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
