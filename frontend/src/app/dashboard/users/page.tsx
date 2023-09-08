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
import { IUser } from "@/interfaces/User";
import Avatar from "@/shared/Avatar/Avatar";
import UpdateForm from "./UpdateForm";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface User {
  id: string;
  get_photo: string
  email: string;
  first_name: string;
  last_name: string;
  get_full_name: string;
  role: string;
  is_active: string;
};

async function getData() {

  const session = await getServerSession(authOptions)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth2/users/`,
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

const AccountOrder = async () => {

  const data = await getData()
  const users = data.results
  const next_url = data.next
  const prev_url = data.previous

  const session = await getServerSession(authOptions)


  const renderMovie = (user: User, index: number) => {
    const { get_full_name, get_photo, id, is_active, role, email } = user;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <Avatar imgUrl={`${process.env.NEXT_PUBLIC_APP_API_URL}${get_photo}`} sizeClass="w-12 h-12" />

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{get_full_name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{email}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                </p>
              </div>

              {session?.user?.id != user.id && <UpdateForm user={user} />}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">


            {/* <Link href={`/movie/${slug}#reviews`} className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                Leave review
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    );
  };

  const renderMovies = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {users?.map(renderMovie)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Users</h2>
      {renderMovies()}
      <NextPrevPage next_url={next_url} prev_url={prev_url} />
    </div>
  );
};

export default AccountOrder;
