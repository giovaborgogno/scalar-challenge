import React, { FC } from "react";
import Card12 from "./Card12";
import { IMovie } from "@/interfaces/Movie"
import ChatSection from "./ChatSection";

export interface SectionMagazine5Props {
  posts: IMovie[];
}

const SectionMagazine5: FC<SectionMagazine5Props> = ({ posts }) => {
  return (
    <div className="nc-SectionMagazine5">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <Card12 post={posts?.[0]} />
        <div className="grid gap-6 md:gap-8">
          <ChatSection />
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine5;
