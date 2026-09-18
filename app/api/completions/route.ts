import { getDb } from "../../../db";
import { completions } from "../../../db/schema";
export async function POST(request:Request){try{const p=await request.json() as {name?:string,score?:number};if(!p.name||Number(p.score)<4)return Response.json({error:"A passing score is required."},{status:400});await getDb().insert(completions).values({name:p.name,score:Number(p.score)});return Response.json({ok:true},{status:201})}catch(e){return Response.json({error:e instanceof Error?e.message:"Unable to save completion"},{status:500})}}
