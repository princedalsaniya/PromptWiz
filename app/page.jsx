import Feed from '@/components/Feed';

/*
  desc      : Page - HomePage
  route     : `{host}/`
  requires  : Feed = TBU
  exports   : HomePage
  author    : Prince Dalsaniya
*/

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/> 
        <span className="orange_gradient text-center"> Chat-GPT Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptWiz is an prompt sharing platform. Create, share and discover creative and helpful prompts for Chat-GPT.
      </p>
      <Feed />
    </section>
  )
}

export default Home;
