import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

/*
  desc      : This will get all posts of given userID in the params.
  route     : `{host}/api/users/{id}/posts`
  requires  : connectToDB = function to connect to mongoDB.
              Prompt = Prompt model for getting all prompts.
  exports   : A response which will contain all the posts for the creator with provided id.
  author    : Prince Dalsaniya
*/

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response(`Failed to fetch prompts created by user : ${error}`, { status: 500 })
    }
}
