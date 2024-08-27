import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";


export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GIT_PROVIDER,
      clientSecret: process.env.GIT_SECRET,
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET
    }),
  ],
  secret : 'qwer1234',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 