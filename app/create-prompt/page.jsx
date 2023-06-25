'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

/*
  desc      : Page - CreatePrompt
  route     : `{host}/create-prompt`
  requires  : Form  = common component where we are passing 
                      type = 'Create'
                      post = State of post
                      handleSubmit = createPrompt
                      submitting = flag to show loading state
  exports   : CreatePrompt page
  author    : Prince Dalsaniya
*/

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  /*
    params  : ClickEvent = This is just used to preventDefault.
    returns : -
    desc    : Sets the submitting flag to true.
              Then sends a POST request with the newPrompt.
              If it is successfull then it will make that flag false and redirects to HOME page.
  */
  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form 
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
};

export default CreatePrompt;
