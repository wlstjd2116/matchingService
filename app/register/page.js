import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function register(){

    let session = await getServerSession(authOptions);
    return(
    <div className="wrap">
        <div className="register">
            <form method="POST" action="/api/register">
                <input type="text" name="summonerName"/> <br/>
                <button type="submit">등록하기</button>
            </form>
        </div>
    </div>
    )
}