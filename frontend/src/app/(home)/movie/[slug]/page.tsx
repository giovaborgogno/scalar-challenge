import React from "react";
import Badge from "@/shared/Badge/Badge";
import Comment from "@/shared/Comment/Comment";
import NcVideo from "@/shared/NcVideo/NcVideo";
import { StarIcon } from "@heroicons/react/24/solid";
import formatDate from "@/utils/formatDate";
import ReviewForm from "./ReviewForm";

interface Props {
  params: { slug: string };
}

async function getData({ params }: Props) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/movie/detail/${params?.slug}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()

}

async function getCriticsReviews({ params }: Props) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/review/critic-list/${params?.slug}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()

}

async function getUsersReviews({ params }: Props) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/review/list/${params?.slug}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()

}

const BlogSingle = async ({ params }: Props) => {

  const data = await getData({ params });
  const post = data.results.movie;

  const stars: any = [];

  for (let index = 0; index < Number(post.rating); index++) {
    stars.push(<StarIcon key={index} className="w-5 h-5" />);
  }

  const audience_stars: any = [];

  for (let index = 0; index < Number(post.users_rating); index++) {
    audience_stars.push(<StarIcon key={index} className="w-5 h-5" />);
  }

  const reviewsdata = await getCriticsReviews({ params })
  const reviews: any = reviewsdata.results

  const usersReeviewsdata = await getUsersReviews({ params })
  const usersReviews: any = usersReeviewsdata.results

  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="/" color="purple" name="Traveler" />
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            {post?.title}
          </h1>

          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            {post?.description}
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-start gap-2 sm:gap-6">
            <div className="flex gap-1">
              Critics&apos;s Rating:
              <div className="mt-0.5 flex text-yellow-500">
                {` ${post.rating ?? 'No reviews yet'}`}
                {stars}
              </div>
            </div>
            <div className="flex gap-1">
              Audience&apos;s Rating:
              <div className="mt-0.5 flex text-yellow-500">
                {` ${post.users_rating ?? 'No reviews yet'}`}
                {audience_stars}
              </div>
            </div>
            Release Date: {formatDate(post?.release_date)}
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="h-full w-full flex-row justify-center items-center">
          <NcVideo
            src={`${post?.trailer_url}`}
            containerClassName="container my-10 sm:my-12 p-3 overflow-hidden w-full h-full hidden sm:block sm:visible flex justify-center items-center"
            alt={"title"}
            height="315px"
            width="560px"
            controls={true}
          />
          <NcVideo
            src={`${post?.trailer_url}`}
            containerClassName="container my-10 sm:my-12 p-3 overflow-hidden w-full h-full sm:hidden"
            alt={"title"}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>


        <div
          id="single-entry-content"
          className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
        // className=" !max-w-screen-md  mx-auto dark:prose-invert"

        >
          <p>
            {post?.plot}
          </p>

        </div>
      </>
    );
  };


  const renderCommentLists = () => {
    return (
      <>
        <div className="max-w-screen-md mx-auto">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            Critics&apos;s Reviews:
          </h3>
          <ul className="nc-SingleCommentLists space-y-5">
            {reviews?.map((review: any, key:number) => (
              <li key={key}>
                <Comment review={review} key={key}/>
              </li>
            ))}

          </ul>
        </div>
        <div className="max-w-screen-md mx-auto">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            Audience&apos;s Reviews:
          </h3>
          <ul className="nc-SingleCommentLists space-y-5">
            {usersReviews?.map((review: any, key:number) => (
              <li key={key}>
                <Comment review={review} key={key}/>
              </li>
            ))}

          </ul>
        </div>
      </>
    );
  };


  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      {renderHeader()}


      <div className="nc-SingleContent container space-y-10 mb-10">
        {renderContent()}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700 mb-10 pb-10" id="reviews"></div>
        <ReviewForm slug={post?.slug} />
        {renderCommentLists()}
      </div>

    </div>
  );
};

export default BlogSingle;
