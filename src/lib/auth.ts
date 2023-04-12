// import { NextAuthOptions } from "next-auth";
// import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
// import { db } from "./db";
// import GoogleProvider from "next-auth/providers/google";

// function getGoogleCredentials() {
//   const clientId = process.env.GOOGLE_CLIENT_ID;
//   const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
//   // console.log(clientId, clientSecret)

//   if (!clientId || clientId.length === 0) {
//     throw new Error("Missing GOOGLE_CLIENT_ID");
//   }

//   if (!clientSecret || clientSecret.length === 0) {
//     throw new Error("Missing GOOGLE_CLIENT_SECRET");
//   }
//   return { clientId, clientSecret };
// }

// export const authOptions: NextAuthOptions = {
//   adapter: UpstashRedisAdapter(db),
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: getGoogleCredentials().clientId,
//       clientSecret: getGoogleCredentials().clientSecret,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log( "user:", user)
//       const dbUser = (await db.get(`user: ${token.id}`)) as User | null;

//       if (!dbUser) {
//         token.id = user!.id;
//         return token;
//       }

//       return {
//         id: dbUser.id,
//         name: dbUser.name,
//         email: dbUser.email,
//         picture: dbUser.image,
//       };
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//       }

//       return session;
//     },
//     redirect() {
//         return '/dashboard'
//     }
//   },
// };

import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";
// import { fetchRedis } from '@/helpers/redis'

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("here is start");
      // console.log("token:", token, "user:", user);
      const dbUser = (await db.get(`user: ${token.id}`)) as User | null;

      // console.log("i am ok here");
      if (!dbUser) {
        // console.log("i am also ok here2");
        if (user) {
          token.id = user!.id;
        }

        return token;
      }
      // console.log("i am also ok here3");

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      // console.log("i am also ok here4");
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
