import PromptCard from "./PromptCard";

/*
  desc      : Component - Profile = Reusable component which will render the posts it will get in params.
  route     : -
  requires  : PromptCard = It will be needed to render all the posts created by the currentUser which we get as param.
  exports   : Profile
  author    : Prince Dalsaniya
*/

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
