import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

/*
  desc      : This will store the new prompt sent in body.
  route     : `{host}/api/prompt/new`
  requires  : connectToDB = function to connect to mongoDB.
              Prompt = Prompt model for adding new prompt.
  exports   : A response which will contain the newPrompt we just added to DB. 
              This will use userID we pass as creator while saving new prompt.
  author    : Prince Dalsaniya
*/

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
      await connectToDB();
      const newPrompt = new Prompt({ 
        creator: userId, 
        prompt, 
        tag 
      });

      await newPrompt.save();
      return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
      return new Response("Failed to create a new prompt", { status: 500 });
  }
}
