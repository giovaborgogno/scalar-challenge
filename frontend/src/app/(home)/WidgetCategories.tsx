import CardCategory1 from "@/components/CardCategories/CardCategory1";
import React, { FC } from "react";
import WidgetHeading1 from "./WidgetHeading1";

export interface WidgetCategoriesProps {
  className?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const genres = [
  {name: 'Action'},
  {name: 'Comedy'},
  {name: 'Drama'},
  {name: 'Fantasy'},
  {name: 'Horror'},
  {name: 'Mystery'},
  {name: 'Romance'},
  {name: 'Thriller'},
  {name: 'Western'},
  {name: 'Crime'},
  {name: 'Disaster'},
  {name: 'Psychological'},
  {name: 'Techno'},
]

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  searchParams
}) => {
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      <WidgetHeading1
        title="✨ Genres"
        viewAll={{label:'View All', href:`/?sort_by=${searchParams?.sort_by?? 'release_date'}#latest-posts`}}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {genres.map((genre, index) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={index}
              name={genre.name}
              href={`/?search=${genre?.name}&sort_by=${searchParams?.sort_by?? 'release_date'}#latest-posts`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
