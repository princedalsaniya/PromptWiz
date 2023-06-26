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

        const response = new Response(JSON.stringify(prompts), { status: 200 });

        const url = new URL(request.url);
        url.searchParams.set("t", Date.now());
        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Location", url.toString());

        return response;
    } catch (error) {
        return new Response(`Failed to fetch all prompts : ${error}`, { status: 500 })
    }
}
