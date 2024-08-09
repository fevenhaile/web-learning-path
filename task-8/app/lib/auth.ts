import GoogleProvider from "next-auth/providers/google";
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Default session strategy
  session: {
    strategy: "jwt", // JWT session strategy
  },
  callbacks: {
    // Default JWT callback which can be left empty if not using custom logic
    async jwt({ token }) {
      return token;
    },
    // Default session callback which can be left empty if not using custom logic
    async session({ session, token }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
