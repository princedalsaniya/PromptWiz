import React from 'react'
import Link from 'next/link'

/*
  desc      : Component - Form  = A common reusable form component which takes the type(`Create`, `Edit`) as input.
                                  And show the buttons and headers accordingly.
  route     : -
  requires  : -
  exports   : Form
  author    : Prince Dalsaniya
*/

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {type} Post
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share the amazing propmt you have just discovered while talking to chat-GPT 🤖 and let the world use this helpful prompt for their benifit 😃.
      </p>

      <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label htmlFor="">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your GPT Prompt
          </span>

          <textarea 
            value={post.prompt}
            onChange={ (e) => setPost({...post, prompt: e.target.value })}
            placeholder='Write your propmt here...'
            required
            className='form_textarea'
          ></textarea>
        </label>

        <label htmlFor="">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tags
          </span>

          <input 
            value={post.tag}
            onChange={ (e) => setPost({...post, tag: e.target.value })}
            placeholder='error_solution, explain_this_code, interview_questions, etc.'
            required
            className='form_input'
          ></input>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={submitting} 
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form