export interface IMovie {
  title: string;
  slug: string;
  release_date: string;
  genre: string;
  plot: string;
  trailer_url: string;
  status: 'Draft' | 'Published';
  rating: string;
  users_rating: string;

}