import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res){

        try{
            // DB, session 정보 가져오기
            const client = await connectDB;
            const db = client.db("matching");

            const userListFinder = await db.collection('matched').findOne({
                players : {
                    $in : [req.body.user]
                }
            });

            console.log("matching2     .js : ",userListFinder);
                
            if (userListFinder != undefined) {
                console.log(userListFinder + '두 명 매칭 완료. DB에서 제거합니다.')
                
                return res.status(200).json(userListFinder);    
            } else {
                return res.status(200).json('매칭 상대를 찾는 중입니다.');
            }

            
            
        }catch(error) {
            console.log('에러발생', error)
            return res.status(500).json('매칭 중 에러가 발생했습니다.');
        }
}

