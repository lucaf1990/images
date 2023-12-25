import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "sign-in",
  },
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const exsistinUser = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!exsistinUser) {
          return null;
        }
        const isActive = await db.user.findFirst({
          where: { email: credentials.email, active: true },
        });
        if (!isActive) {
          return null;
        }
        const password = await compare(
          credentials.password,
          exsistinUser.password
        );
        if (!password) {
          return null;
        }
        return {
          id: `${exsistinUser.id}`,
          email: exsistinUser.email,
          username: exsistinUser.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...user,
          ...session.user,
          username: token.username,
        },
      };
    },
  },
};
