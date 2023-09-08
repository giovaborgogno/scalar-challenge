import React, { FC, } from "react";
import Heading from "@/components/Heading/Heading";
import Pagination from "@/shared/Pagination/Pagination";
import WidgetCategories from "./WidgetCategories";
import Card3 from "./Card3";
import { IMovie } from "@/interfaces/Movie";
import Link from "next/link";


//
export interface SectionLatestPostsProps {
  count: number
  blogPosts: IMovie[];
  className?: string;
  postCardName?: "card3";
  searchParams?: { [key: string]: string | string[] | undefined };
}


const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  blogPosts,
  count,
  postCardName = "card3",
  className = "",
  searchParams
}) => {
  // const [posts, setPosts] = useState(blogPosts)

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`} id="latest-posts">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14" >
            Order by:
          <div className="flex justify-start mb-10 gap-16">
            <Link
              href={`/?search=${searchParams?.search ?? 'none'}#latest-posts`}>
              <Heading
                className={`nc-card-title ${searchParams?.sort_by != 'rating' ? 'text-cyan-400' : ''}`}>
                Most Recent🎈
              </Heading>
            </Link>

            <Link
              href={`/?sort_by=rating&search=${searchParams?.search ?? 'none'}#latest-posts`}>
              <Heading
                className={`nc-card-title ${searchParams?.sort_by == 'rating' ? 'text-cyan-400' : ''}`}>
                Most Rated🎈
              </Heading>
            </Link>

          </div>
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {blogPosts?.map((post, index) => (
              <Card3 post={post} key={index} className="" />
            ))}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination count={count} />
          </div>
        </div>
        <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
          <WidgetCategories searchParams={searchParams} />
          {/* <WidgetPosts /> */}
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
