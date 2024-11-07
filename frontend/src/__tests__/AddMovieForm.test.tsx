import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddMovieForm from "@/app/dashboard/add-movie/AddMovieForm";

// Mock del acceso a sesión y router
jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Mock del toast
jest.mock("react-hot-toast", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

describe("AddMovieForm", () => {
    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    accessToken: "mockAccessToken",
                },
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders form fields correctly", () => {
        render(<AddMovieForm />);
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Plot/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Trailer - Youtube Embebed URL/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Release Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    });

    it("adds a new movie successfully", async () => {
        const routerPushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: routerPushMock,
        });

        // Mock de la respuesta del backend
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                statusText: "OK",
                json: () => Promise.resolve({ message: "Movie added successfully" }),
                headers: new Headers(),
                redirected: false,
                type: "basic",
                url: "",
                clone: () => ({} as Response),
                body: null,
                bodyUsed: false,
            } as Response)
        );


        render(<AddMovieForm />);

        // Simulación de entrada de datos en el formulario
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Inception" } });
        fireEvent.change(screen.getByLabelText(/Plot/i), { target: { value: "A thriller about dreams" } });
        fireEvent.change(screen.getByLabelText(/Trailer - Youtube Embebed URL/i), {
            target: { value: "https://example.com/trailer" },
        });
        fireEvent.change(screen.getByLabelText(/Genre/i), { target: { value: "Action" } });
        fireEvent.change(screen.getByLabelText(/Release Date/i), { target: { value: "2010-07-16" } });
        fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: "Published" } });

        // Enviar el formulario
        fireEvent.click(screen.getByRole("button", { name: /Add Movie/i }));

        await waitFor(() => {
            expect(screen.getByLabelText(/Title/i)).toHaveValue("");
            expect(global.fetch).toHaveBeenCalledWith("/api/movie/create/", expect.anything());
            expect(routerPushMock).not.toHaveBeenCalled();
        });
    });

    it("shows error message on failed submission", async () => {
        // Mock de respuesta fallida del backend
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 400,
                statusText: "Bad Request",
                json: () => Promise.resolve({ message: "Failed to add movie" }),
                headers: new Headers(),
                redirected: false,
                type: "basic",
                url: "",
                clone: () => ({} as Response),
                body: null,
                bodyUsed: false,
            } as Response)
        );

        render(<AddMovieForm />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Inception" } });
        fireEvent.change(screen.getByLabelText(/Plot/i), { target: { value: "A thriller about dreams" } });
        fireEvent.change(screen.getByLabelText(/Trailer - Youtube Embebed URL/i), {
            target: { value: "https://example.com/trailer" },
        });
        fireEvent.change(screen.getByLabelText(/Genre/i), { target: { value: "Action" } });
        fireEvent.change(screen.getByLabelText(/Release Date/i), { target: { value: "2010-07-16" } });
        fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: "Published" } });

        fireEvent.click(screen.getByRole("button", { name: /Add Movie/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/movie/create/", expect.anything());
            expect(screen.getByLabelText(/Title/i)).toHaveValue("Inception"); // Asegura que el formulario no se haya reiniciado
            expect(require("react-hot-toast").toast.error).toHaveBeenCalledWith("Error");
        });
    });
});
