import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

/*
  desc      : This will FETCH the prompt with the provided ID.
  route     : `{host}/api/prompt/{id}`
  method    : GET
  requires  : connectToDB = function to connect to mongoDB.
              Prompt = Prompt model for getting the prompt.
  exports   : A response which will contain the prompt with the ID provided. 
  author    : Prince Dalsaniya
*/

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response(`Internal Server Error : ${error}`, { status: 500 });
    }
}

/*
  desc      : This will UPDATE the prompt with the provided ID.
  route     : `{host}/api/prompt/{id}`
  method    : PATCH
  requires  : connectToDB = function to connect to mongoDB.
              Prompt = Prompt model for updating the prompt.
  exports   : A response which has success message if the prompt is successfully updated.
  author    : Prince Dalsaniya
*/

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response(`Error Updating Prompt : ${error}`, { status: 500 });
    }
};

/*
  desc      : This will DELETE the prompt with the provided ID.
  route     : `{host}/api/prompt/{id}`
  method    : DELETE
  requires  : connectToDB = function to connect to mongoDB.
              Prompt = Prompt model for deleting the prompt.
  exports   : A response which has success message if the prompt is successfully deleted.
  author    : Prince Dalsaniya
*/

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(`Error deleting prompt : ${error}`, { status: 500 });
    }
};
