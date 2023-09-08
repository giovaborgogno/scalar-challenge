import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Badge from "@/shared/Badge/Badge";
// import { _getImgRd, _getTagNameRd, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta"
import Link from "next/link";
import { IMovie } from "@/interfaces/Movie";
import NcVideo from "@/shared/NcVideo/NcVideo";
import { StarIcon } from "@heroicons/react/24/solid";

export interface Card3Props {
  post: IMovie;
  className?: string;
}

const Card3: FC<Card3Props> = ({post, className = "h-full" }) => {
  const stars = [];
  
  for (let index = 0; index < Number(post.rating); index++) {
    stars.push(<StarIcon key={index} className="w-5 h-5" />);
  }
  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <Badge name={post?.genre} />
          <div>
          <div className="mt-0.5 flex text-yellow-500">
        {` ${post.rating?? 'No reviews yet'}`}
        {stars}
          </div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              <Link
                href={`/movie/${post?.slug}`}
                className="line-clamp-2 capitalize"
                title={"title"}
              >
                {post?.title}
              </Link>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                {post?.plot}
              </span>
            </div>
          </div>
          {/* <PostCardMeta author={post?.author}/> */}
        </div>
      </div>

      <div
        className={`block flex-shrink-0 sm:w-56 sm:ml-6 rounded-3xl overflow-hidden mb-5 sm:mb-0`}
      >
        <Link
          href={`/movie/${post?.slug}`}
          className={`block w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16 `}
        >
        <NcVideo
        src={`${post?.trailer_url}`}
        containerClassName="absolute inset-0"
        alt={"title"}
        // max_width={'768px'}
        width="100%"
        height="100%"
        
      />
          
        </Link>
      </div>
    </div>
  );
};

export default Card3;
