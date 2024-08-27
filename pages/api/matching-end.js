import { connectDB } from "@/util/database";

export default async function handler (req, res){
    
    try {
        const client = await connectDB;
        const db = client.db("matching");

        

        let matcherName = await db.collection('matchTable').deleteMany({
             summoner : req.body.name
        });
        
        console.log(req.body.name ,'님을 정상적으로 DB에서 제거하였습니다.');

        return res.status(200).json('success');
    }catch(errer) {
        console.log('매칭 중단 중 에러 발생');
        return res.status(500).json('fail');
    }
   

    
}

