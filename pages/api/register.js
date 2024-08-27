import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res){

    if (req.method == "POST") {
        try{
            // DB, session 정보 가져오기
            const client = await connectDB;
            const db1 = client.db("test");
            const db2 = client.db("matching");
            let session = await getServerSession(req, res, authOptions);
            
            let summonerName = JSON.parse(JSON.stringify(req.body)).summonerName;

            await db2.collection('userInfo').insertOne({
                userEmail : session.user.email,
                summonerName : summonerName
            });

            return res.status(200).JSON('OK');

            
        }catch(error) {
            console.log('에러발생', error)
        }
        
    }
    
    
}

