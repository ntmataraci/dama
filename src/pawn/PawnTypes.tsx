export interface PawnTypes {
    color:"white"|"black",
    name:string,
    coord:number[]
}

const Pawn=(color:PawnTypes["color"],name:PawnTypes["name"],coord:PawnTypes["coord"]):PawnTypes=>{
    return(
{
    color:color,
    name:name,
    coord:coord
}
    )
}

const names=["a","b","c","d","e","f","g","h","i","k","l","m","n","o","p","r"]
const whiteCoords=[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5]]

const blackCoords=[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]]
let whitePawnsList:any[]=[]
let blackPawnsList:any[]=[]
export const whitePawns = ()=>{
    names.map((item,idx)=>{
       whitePawnsList= [...whitePawnsList,Pawn("white",item,whiteCoords[idx])]
    })
    return whitePawnsList
}
export const blackPawns = ()=>{
    names.map((item,idx)=>{
       blackPawnsList= [...blackPawnsList,Pawn("black",item,blackCoords[idx])]
    })
    return blackPawnsList
}

export const allPawns = [...whitePawns(),...blackPawns()]