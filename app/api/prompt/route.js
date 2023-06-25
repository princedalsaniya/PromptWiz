import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

/*
  desc      : This will fetch all prompts available and return it.
  route     : `{host}/api/prompt`
  requires  : connectToDB = function to connect to mongoDB.
              Prompt = Prompt model for getting prompt.
  exports   : A response which will contain all prompts available. 
  author    : Prince Dalsaniya
*/

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response(`Failed to fetch all prompts : ${error}`, { status: 500 })
    }
}
