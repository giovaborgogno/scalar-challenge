import React from "react";
import SectionAds from "./SectionAds";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// DEMO DATA
interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// get the most recent movie
async function getData() {

  const session = await getServerSession(authOptions)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/movie/list?p=1&page_size=1&sort_by=release_data`,
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

async function getPaginationData({ searchParams }: Props) {

  const session = await getServerSession(authOptions)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/movie/list?p=${searchParams?.p ?? '1'}&page_size=5&sort_by=${searchParams?.sort_by ?? 'release_data'}&search=${searchParams?.search ?? 'none'}`,
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

const HomePage = async ({ searchParams }: Props) => {

  const data = await getData();
  const posts = data.results;

  const paginationData = await getPaginationData({ searchParams });
  const count = paginationData.count;
  const paginationPosts = paginationData.results;

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      {/* ======== ALL SECTIONS ======== */}
      <div className="container relative">
        {/* === SECTION 1 === */}
        <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 posts={posts} />
        </div>

        {/* === SECTION 1 === */}
        <SectionAds />

        {/* === SECTION 8 === */}
        <SectionLatestPosts count={count} blogPosts={paginationPosts} searchParams={searchParams} className="py-16 lg:py-28" />

      </div>
    </div>
  );
};

export default HomePage;