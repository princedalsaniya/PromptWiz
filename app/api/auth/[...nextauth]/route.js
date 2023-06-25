import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

/*
  desc      : This route will be visited when google redirects the oauth response.
              We are connecting to DB. Updating session. Adding user to DB if it is not existing one.
  route     : `{host}/api/auth/callback/google`
  requires  : connectToDB = function to connect to mongoDB.
              user = User model for adding new user.
  exports   : GoogleProvider with its handler.
  author    : Prince Dalsaniya
*/

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if user already exists?
        const userExists = await User.findOne({
          email: profile.email,
        });
        // If not, then create a new User.
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
