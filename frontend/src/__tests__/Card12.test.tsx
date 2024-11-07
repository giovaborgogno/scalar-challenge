import React from "react"
import { render, screen } from "@testing-library/react";
import Card12 from "../app/(home)/Card12";
import "@testing-library/jest-dom";
import { IMovie } from "@/interfaces/Movie";

// Mock data
const mockMovie: IMovie = {
  title: "Inception",
  slug: "inception",
  release_date: "2010-07-16",
  genre: "Sci-Fi",
  plot: "A mind-bending thriller about dream manipulation.",
  trailer_url: "https://example.com/trailer.mp4",
  status: "Published",
  rating: "5",
  users_rating: "4.5",
};

// Helper function to render the component
const renderCard12 = (props = {}) => {
  return render(<Card12 post={mockMovie} {...props} />);
};

describe("Card12 Component", () => {
  it("renders the movie title", () => {
    renderCard12();
    const titleElement = screen.getByText(mockMovie.title);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the rating correctly", () => {
    renderCard12();
    const ratingElement = screen.getByText((content) => content.includes(mockMovie.rating));
    expect(ratingElement).toBeInTheDocument();
  });

  it("renders the plot", () => {
    renderCard12();
    const plotElement = screen.getByText(mockMovie.plot);
    expect(plotElement).toBeInTheDocument();
  });

  it("renders a link with the correct href attribute", () => {
    renderCard12();
    const linkElement = screen.getAllByRole("link", { name: mockMovie.title });
    expect(linkElement[0]).toHaveAttribute("href", `/movie/${mockMovie.slug}`);
  });

});
