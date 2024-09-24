import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@/utils/database";
import User from "@/models/testimony";

const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),
       
    ], 
    session : {
        strategy: 'jwt', // Use JWT for session tokens
        maxAge: 24 * 60 * 60, // Set session max age to 24 hours
        updateAge: 1 * 60 * 60, // update session every 1 hour

    },
    // cookies : {
    //     sessionToken: {
    //         name: `__Secure-next-auth.session-token`,
    //         options: {
    //             httpOnly: true,
    //             sameSite: "strict",
    //             path: "/",
    //             secure : true,
    //             maxAge: 30 * 24 * 60 * 60, 
    //         }
    //     }
    // },
    callbacks : {
        async session({ session, token }) {
            if (token && session.user) {
              session.user.id = token.sub;
            }
            return session;
          },
          async jwt({ token, user }) {
            // Add user ID to token
            if (user) {
              token.sub = user.id;
            }
            return token;
          },
        async signIn({account,user,profile, credentials}){
            try {
                  await connectToDB();
    
                    const userExists = await User.findOne({ email: profile.email})
    
                    if(!userExists) {
                    await User.create({
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                    });
                  
                }
                return true;
            } catch (error) {
                console.log("Error checking if user exists", error.message);
                return false;
            }
        },
        secret: process.env.NEXTAUTH_SECRET,
    },
})

export {handler as GET, handler as POST}