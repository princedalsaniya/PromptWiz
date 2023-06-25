import { Schema, model, models } from 'mongoose';

/*
  desc      : Model - Prompt
  route     : -
  requires  : Schema = to create new user Schema
              model  = to create new user model
              models = to check if the user exists in the models or not
                       If not then create a new one otherwise use the existing one.
  exports   : User {
                    creator = It is referenced to User table, so it will check availability of creator is in User.
                    prompt 
                    tag
                  }
  author    : Prince Dalsaniya
*/

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String, 
    required: [true, 'Tag is required.'],
  }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
