'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

/*
  desc      : Page - Profile
  route     : `{host}/profile`
  requires  : Profile = component that will render the whole profile.
                      name      = in this case it would be My.
                      desc      = description of the profile.
                      data      = all posts created by the currentUser.
                      handlers  = Edit an Delete handlers.
  exports   : Profile page
  author    : Prince Dalsaniya
*/

const MyProfile = () => {

  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => { 
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json(); 
      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = () => {

  };

  const handleDelete = () => {

  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
