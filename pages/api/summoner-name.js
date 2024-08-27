import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res){

        try{
            // DB, session 정보 가져오기
            const client = await connectDB;
            const db2 = client.db("matching");
            let session = await getServerSession(req, res, authOptions);
            
            let summonerInfo = await db2.collection('userInfo').findOne({
                userEmail : session.user.email,
            });
            
            let userName = summonerInfo.summonerName;

            if (userName) {
                return res.status(200).json(userName);
            } else { return res.status(200).json(null); }
            
        }catch(error) {
            console.log('에러발생: ', error)
            return res.status(500).json(error);
        }
}

