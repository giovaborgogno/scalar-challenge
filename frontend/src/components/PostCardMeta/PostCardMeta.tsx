import React, { FC } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import Link from "next/link";
import { IUser } from "@/interfaces/User";

export interface PostCardMetaProps {
  author: IUser;
  className?: string;
  hiddenAvatar?: boolean;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  author,
  className = "leading-none",
  hiddenAvatar = false,
}) => {
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm ${className}`}
      data-nc-id="PostCardMeta"
    >
      <Link
        href={"/"}
        className="flex-shrink-0 relative flex items-center space-x-2"
      >
        {!hiddenAvatar && (
          <Avatar radius="rounded-full" sizeClass={"h-7 w-7 text-sm"} />
        )}
        <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {`${author?.first_name} ${author?.last_name}`}
        </span>
      </Link>
      <>
        
      </>
    </div>
  );
};

export default PostCardMeta;
