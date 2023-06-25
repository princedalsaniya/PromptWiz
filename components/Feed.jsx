'use client'

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

/*
  desc      : Component - Feed = It is rendering a PromptCardList.
  route     : -
  requires  : PromptCard = Used in PromptCardList for rendering each card.
  exports   : Feed
  author    : Prince Dalsaniya
*/

/*
  params  : data = each Array<Prompt> details.
            handleTagClick = callback function to handle when tag is clicked.
  returns : List of all promptCards.
  desc    : It will take array of Prompt. 
            It will now make an PromptCard component for each prompt in the array and return it.
*/
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  /*
    params  : -
    returns : -
    desc    : This will fetch all the posts available.
              Then it will set the allPosts state.
  */
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /*
    params  : searchtext = Simple, the text which we need to serach.
    returns : It will return all posts whose one of these fields contains the searchText, [creatorUsername, tag, propmt].
    desc    : This will greate a regex with the searchText with caseSensitive.
              Then test that regex on each post's creator.username, tag, prompt
  */
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  /*
    params  : e = click event
    returns : -
    desc    : -
  */
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for tags or username..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
