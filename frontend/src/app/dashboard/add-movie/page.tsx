import React from "react";
import AddMovieForm from "./AddMovieForm";


const AddMoviePage = async () => {

  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Add a New Movie
        </h2>
       <AddMovieForm />
      </div>
    </div>
  );
};

export default AddMoviePage;
