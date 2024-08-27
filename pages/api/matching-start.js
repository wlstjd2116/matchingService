import { connectDB } from "@/util/database";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler (req, res){
    const userName = req.body.name;
    try{
        const client = await connectDB;
        const db = client.db("matching");
        let session = await getServerSession(req, res, authOptions);
        let matchedUsers = [];

        // 매칭 테이블에 올라가 있다면 삭제하고 시작
        await db.collection('matched').deleteMany({
            players : {
                $in : [req.body.user]
            }
        });

        // matching Number 1씩 증가하는 sequence
        let matchingSeq = await db.collection('sequences').findOneAndUpdate(
            {_id: "matchingID"}, 
            {
                $inc: {
                    seq: 1
                }
            },
            { returnOriginal : false}
        );
    
        let insertValue = {
            matchNumber : matchingSeq.value.seq,
            summoner : userName,
            tier : req.body.tier,
            email : session.user.email
        }
        
        // 매칭 테이블에 티어 같은 유저 찾기
        let matchFinder = await db.collection('matchTable').findOne({
            tier : req.body.tier
        });

        // matchFinder  == user라면 기존 user Delete
        if (matchFinder == userName){
            let matcherName = await db.collection('matchTable').deleteMany({
                summoner : userName
           });
        } 
        // 매칭 상대가 있다면 매칭테이블에 올리지 않고 바로 return, 기존 매칭 상대 remove
        else if (matchFinder != null && matchFinder != userName) {

            const inputToMatchedTable = await db.collection('matched').insertOne({
                players : [userName, matchFinder.summoner]
            });

            let matcherName = await db.collection('matchTable').deleteMany(
                {summoner : matchFinder.summoner}
            );
            matchedUsers.push(matchFinder.summoner);
            matchedUsers.push(userName);
            console.log(matchFinder.summoner, '님과 ', userName, '님 매칭 완료');
            return res.status(200).json(matchedUsers);
        }
        
        let insertResult = await db.collection('matchTable').insertOne(insertValue);
        console.log(userName+'님이 정상적으로 MatchingTable에 올랐습니다.');
        return res.status(200).json('success');

    }catch(er) {
        console.log(userName+ '님 매칭 중 오류 발생 :', er);
        return res.status(500).send('실패');
    }
}

