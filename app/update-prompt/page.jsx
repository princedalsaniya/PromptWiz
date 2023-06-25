"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

/*
  desc      : Page - UpdatePrompt
  route     : `{host}/update-prompt?id={id}`
  requires  : Form  = It will get the postId as input, then fetches the PromptDetails from that.
                      Passes that to Form component with proper details like
                      type      = Edit
                      handlers  = updatePromt handler
  exports   : Renderes Form component with the currect details of the currentPost.
  author    : Prince Dalsaniya
*/

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  /*
    params  : ClickEvent = This is just used to preventDefault.
    returns : -
    desc    : Checks for promptId, if missing then raises error.
              Sends a PATCH request to endpoint and passes body with the updated prompt.
              If response is OK then it will reirects to HOME page.
  */
  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
