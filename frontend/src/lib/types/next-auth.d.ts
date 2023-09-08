import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      photo: string
      email: string;
      firstName: string;
      lastName: string;
      fullName: string;
      role: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}