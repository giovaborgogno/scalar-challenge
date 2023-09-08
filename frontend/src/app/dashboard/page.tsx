// import Prices from "@/components/Prices";
// import { PRODUCTS } from "@/data/data";
import { IMovie } from "@/interfaces/Movie";
import { authOptions } from "@/lib/auth";
import { StarIcon } from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation'
import NextPrevPage from "./NextPrevPage";
import StatusButton from "./StatusButton";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getData({searchParams}:Props) {

  const session = await getServerSession(authOptions)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/movie/${session?.user?.role == 'admin' ? 'private-list' : 'list'}?p=${searchParams?.p?? '1'}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${session?.user?.accessToken}`
      },
    },
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()

}

const AccountOrder = async ({searchParams}:Props) => {

  const data = await getData({searchParams})
  const movies = data.results
  const next_url = data.next
  const prev_url = data.previous

  const session = await getServerSession(authOptions)


  const renderMovie = (movie: IMovie, index: number) => {
    const { title, slug, genre, status, rating } = movie;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{genre}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span className="mt-0.5 flex text-yellow-500 gap-1"><StarIcon className="w-4 h-4" /> {rating?? 'No reviews'} </span>
                </p>
              </div>
              {/* <Prices className="mt-0.5 ml-2" /> */}
              <StatusButton movie={movie} />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            

            <Link href={`/movie/${slug}#reviews`} className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                Leave review
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderMovies = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {movies?.map(renderMovie)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Movies</h2>
      {renderMovies()}
      <NextPrevPage next_url={next_url} prev_url={prev_url}/>
    </div>
  );
};

export default AccountOrder;
