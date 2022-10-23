
import './App.css';
import Board from './board/Board';
import {useSelector} from "react-redux"
import { RootState } from "./store/store";
function App() {

  const selectedPawn:any=useSelector((state:RootState)=>state.gameSliceReducer.selectedPawn)
  const allPawns=useSelector((state:RootState)=>state.gameSliceReducer.allPawns)
  const finder = allPawns.find(item=>item.name===selectedPawn.name)

  return (
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3rem"}}>
      <Board/>

    {selectedPawn!==undefined&&
    <>
 <div>{selectedPawn.coord[0]} and {selectedPawn.coord[1]}</div>
 {finder&&<div>{finder.coord[0]} and {finder.coord[1]}</div>}
 </>
    }
    </div>
  );
}

export default App;
