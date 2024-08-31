import React, { FC } from "react";
import Link from "next/link";
import { IMovie } from "@/interfaces/Movie";
import NcVideo from "@/shared/NcVideo/NcVideo";
import Heading from "@/components/Heading/Heading";
import { StarIcon } from "@heroicons/react/24/solid";

export interface Card12Props {
  post: IMovie;
  className?: string;
}

const Card12: FC<Card12Props> = ({ post, className = "h-full" }) => {

  const stars = [];

  for (let index = 0; index < Number(post?.rating); index++) {
    stars.push(<StarIcon key={index} className="w-5 h-5" />);
  }


  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <Heading>Last Premiere 🎈🎈</Heading>
      <Link
        href={`/movie/${post?.slug}`}
        className="block flex-shrink-0 flex-grow relative lg:w-full h-0 aspect-w-5 lg:aspect-w-8 aspect-h-3 rounded-3xl flex justify-start items-start md:mb-3 "
      >

        <NcVideo
          src={`${post?.trailer_url}`}
          containerClassName="container my-10  p-3 overflow-hidden w-full h-full hidden lg:block sm:visible flex justify-center items-center"
          alt={"title"}
          height="315px"
          width="560px"
          controls={true}
        />
        <NcVideo
          src={`${post?.trailer_url}`}
          containerClassName="container md:my-12 p-3 overflow-hidden w-full h-full lg:hidden flex justify-center items-center"
          alt={"title"}
          width="100%"
          height="100%"
          controls={true}
        />


      </Link>

      <div className=" mt-8 pr-10 flex flex-col">
        <div className="mt-0.5 flex text-yellow-500">
          {` ${post?.rating ?? 'No reviews yet'}`}
          {stars}

        </div>
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <Link
            href={`/movie/${post?.slug}`}
            className="line-clamp-2 capitalize"
            title={"title"}
          >
            {post?.title}
          </Link>
        </h2>
        <span className=" mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">
            {post?.plot}
          </span>
        </span>
        {/* <PostCardMeta author={post?.author} className="mt-5" /> */}
      </div>
    </div>
  );
};

export default Card12;
