import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {

        if (req.nextUrl.pathname.startsWith('/dashboard') &&
          token?.role != "admin" &&
          token?.role != "critic") {
          return false
        }

        // otras rutas para proteger

        return true
      }
    },
  }
)