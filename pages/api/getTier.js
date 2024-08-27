import { connectDB } from "@/util/database";

export default async function handler (req, res){
    
    try{
        const client = await connectDB;
        const db = client.db("matching");
        let session = await getServerSession(req, res, authOptions);
          const userSummonerName = await db2.collection('userInfo').findOne({
                     userEmail : userEmail.email
                 });

        return userSummonerName;
    }catch(error){ 
        console.log(error);
    }
    


    
}

