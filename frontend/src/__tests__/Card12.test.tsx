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

describe("Card12", () => {
  it("renders the Card12 component correctly", () => {
    renderCard12();

    // Check if the movie title is rendered
    const titleElement = screen.getByText(mockMovie.title);
    expect(titleElement).toBeInTheDocument();

    // Check if the rating is rendered correctly
    const ratingElement = screen.getByText((content) => content.includes(mockMovie.rating));
    expect(ratingElement).toBeInTheDocument();

    // Check if the plot is rendered
    const plotElement = screen.getByText(mockMovie.plot);
    expect(plotElement).toBeInTheDocument();

    // Check if the link has the correct href attribute
    const linkElement = screen.getAllByRole("link", { name: mockMovie.title });
    expect(linkElement[0]).toHaveAttribute("href", `/movie/${mockMovie.slug}`);
  });
});
