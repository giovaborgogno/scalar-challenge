import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/jwt/create`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const data = await res.json();
          NextResponse.json({ error: data ?? 'Server responded with an error' }, { status: res.status });
          return null
        }

        const { access, refresh } = await res.json();

        const userRes = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/users/me/`, {
          headers: { Authorization: `JWT ${access}` },
        });

        if (!userRes.ok) {
          const data = await res.json();
          NextResponse.json({ error: data ?? 'Server responded with an error' }, { status: res.status });
          return null
        }

        const userData = await userRes.json();

        const user = {
          id: userData.id,
          photo: userData.get_photo,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          fullName: userData.get_full_name,
          role: userData.role,
          accessToken: access,
          refreshToken: refresh,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      } catch (error) {
        // Hubo un error con la solicitud de red
        NextResponse.json({ error: 'There was an error with the network request' });
        return null
      }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },

    async session({ session, token, trigger, newSession }) {
      if (trigger === "update" && newSession?.user != null) {
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client
        session.user = newSession.user
        return session
      }
      session.user = token as any;
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // }
  },
};