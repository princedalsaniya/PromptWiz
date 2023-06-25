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

  const [posts, setPosts] = useState([]);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => { 
      const response = await fetch('api/prompt');
      const data = await response.json(); 

      setPosts(data);
    };

    fetchPosts();
  }, []);

  /*
    params  : e = click event
    returns : -
    desc    : -
  */
  const handleSearchChange = (e) => {
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

      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
