import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
// import { _getImgRd, _getTitleRd } from "@/contains/fakeData";
// import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import { IMovie } from "@/interfaces/Movie";
import formatDate from "@/utils/formatDate";
import NcVideo from "@/shared/NcVideo/NcVideo";


export interface Card13Props {
  post: IMovie;
  className?: string;
}

const Card13: FC<Card13Props> = ({ post, className = "" }) => {
  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
      <div className="flex flex-col h-full py-2">
        <h2 className={`nc-card-title block font-semibold text-base`}>
          <Link
            href={`/movie/${post?.slug}`}
            className="line-clamp-2 capitalize"
            title={"title"}
          >
            {post?.title}
          </Link>
        </h2>
        <span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 ">
          <span className="line-clamp-2">
            {post?.plot}
          </span>
        </span>
        <span className="mt-4 block sm:hidden text-sm text-slate-500 ">
          Premiere {formatDate(post?.release_date)}
        </span>
        <div className="mt-auto hidden sm:block">
          {/* <PostCardMeta author={post?.author} /> */}
        </div>
      </div>

      <Link
        href={`/movie/${post?.slug}`}
        className={`block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5`}
      >
        
        <NcVideo
        src={`${post?.trailer_url}`}
        containerClassName="absolute inset-0"
        alt={"title"}
        max_width={'400px'}
      />
        
      </Link>
    </div>
  );
};

export default Card13;
