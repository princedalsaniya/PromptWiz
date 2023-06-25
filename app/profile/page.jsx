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

  /*
    params  : post = Prompt which we want to update / edit.
    returns : -
    desc    : This will redirect the user to update-prompt page with the post._id in the searchParams.
  */
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  /*
    params  : post = Prompt which we want to delete.
    returns : -
    desc    : This will first give a confirmation alert that you really want to delete this prompt or not.
              If it is true, then it will call the Delete endpoint with the correct post._id.
              Once it is successfull, it will filter the posts except the current which we just deleted.
              And update the myPosts array with that.
  */
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
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
