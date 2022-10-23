
import { useSelector, useDispatch } from 'react-redux'
import { clickedPawn, colorSend,movingState,selectedPawnHandler } from "../store/slice"
import { RootState } from "../store/store"
const Pawn = (props:any) => {
  const dispatch = useDispatch()
  const allPawnsState=useSelector((state:RootState)=>state.gameSliceReducer.allPawns)
  const findedPawn= allPawnsState.filter(item=>item.coord[0]===props.Coord[0]&&item.coord[1]===props.Coord[1])[0]
  const selectedPawn:any=useSelector((state:RootState)=>state.gameSliceReducer.selectedPawn)


const getCoord= () =>{
  dispatch(clickedPawn(findedPawn.coord))
  dispatch(colorSend(findedPawn.color))
  dispatch(movingState(true))
  dispatch(selectedPawnHandler(findedPawn))


}



    return(
        <div style={{width:"35px",height:"35px",borderRadius:"50%",margin:"auto"}}>
{ findedPawn&&
<div onClick={getCoord} style={{backgroundColor:findedPawn.color==="white"?"white":"gray",width:"35px",height:"35px",borderRadius:"50%",border:"1px solid black",cursor:"pointer",margin:"auto"}} >
{findedPawn.name}

</div>
}

        </div>
    )
}

export default Pawn