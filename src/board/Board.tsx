import Square from "./Square";
import Coordinates from "./Coordinates";
import Pawn from "../pawn/Pawn";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../store/store";
import { clickedPawn,updatePawnHandler } from "../store/slice";
const Board = () => {

    const squareArray: number[] = [...Array(64).keys()];


    return(
        <div style={{display:"grid", gridTemplateColumns:"repeat(8,50px)",gap:"0"}}>
{squareArray.map((item,idx)=>
<Square key={idx} Coord={Coordinates()[idx]}>
<Pawn Coord={Coordinates()[idx]} />
    </Square>
)}
        </div>
    )
}

export default Board