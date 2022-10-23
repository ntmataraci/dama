import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  updatePawnHandler,
  movingState,
  changeTurn,
  removePawn,
} from "../store/slice";
type MyProps = {
  children: React.ReactNode;
  Coord: number[];
};
const Square = (props: MyProps) => {
  const dispatch = useDispatch();
  const allowedSquare = useSelector(
    (state: RootState) => state.gameSliceReducer.coord
  );
  const colorPawn = useSelector(
    (state: RootState) => state.gameSliceReducer.color
  );
  const getTurn = useSelector(
    (state: RootState) => state.gameSliceReducer.turn
  );
  const allPawns = useSelector(
    (state: RootState) => state.gameSliceReducer.allPawns
  );
  const movingSit = useSelector(
    (state: RootState) => state.gameSliceReducer.moving
  );
  const selectedPawn: any = useSelector(
    (state: RootState) => state.gameSliceReducer.selectedPawn
  );
  const blankArea: any = useSelector(
    (state: RootState) => state.gameSliceReducer.blankArea
  );
  

  //conditions
  const blackCondition =
    (allowedSquare[0] === props.Coord[0] &&
      allowedSquare[1] === props.Coord[1] - 1) ||
    (allowedSquare[0] === props.Coord[0] + 1 &&
      allowedSquare[1] === props.Coord[1]) ||
    (allowedSquare[0] === props.Coord[0] - 1 &&
      allowedSquare[1] === props.Coord[1]);

  const whiteCondition =
    (allowedSquare[0] === props.Coord[0] &&
      allowedSquare[1] === props.Coord[1] + 1) ||
    (allowedSquare[0] === props.Coord[0] + 1 &&
      allowedSquare[1] === props.Coord[1]) ||
    (allowedSquare[0] === props.Coord[0] - 1 &&
      allowedSquare[1] === props.Coord[1]);

  const selectedX: number = selectedPawn.coord[0];
  const selectedY: number = selectedPawn.coord[1];

  //white
  const finderBlackPawnForEatRight = allPawns.findIndex(
    (item) =>
      item.coord[0] === selectedX + 1 &&
      item.coord[1] === selectedY &&
      item.color === "black"
  );
  const finderBlackPawnForEatLeft = allPawns.findIndex(
    (item) =>
      item.coord[0] === selectedX - 1 &&
      item.coord[1] === selectedY &&
      item.color === "black"
  );
  const finderBlackPawnForEatVertical = allPawns.findIndex(
    (item) =>
      item.coord[0] === selectedX &&
      item.coord[1] === selectedY - 1 &&
      item.color === "black" 
  );


  //black 
  const finderWhitePawnForEatRight = allPawns.findIndex(
    (item) =>
      item.coord[0] === selectedX + 1 &&
      item.coord[1] === selectedY &&
      item.color === "white"
  );


  const finderWhitePawnForEatLeft = allPawns.findIndex(
    (item) =>
      item.coord[0] === selectedX - 1 &&
      item.coord[1] === selectedY &&
      item.color === "white"
  );
  const finderWhitePawnForEatVertical = allPawns.findIndex(
    (item) =>
      item.coord[0] === selectedX &&
      item.coord[1] === selectedY + 1 &&
      item.color === "white"
  );

  //white takers
  const whiteTakerRight = () => {
    const blankRight =
      allowedSquare[0] + 2 === props.Coord[0] &&
      allowedSquare[1] === props.Coord[1]
      const backlineIsBlank=blankArea.findIndex((item:any)=>item[0]===allowedSquare[0]+2&&item[1]===allowedSquare[1])
    if (finderBlackPawnForEatRight>-1&&backlineIsBlank>-1) return blankRight;
  };



  const whiteTakerLeft = () => {
    const blankLeft =
      allowedSquare[0] - 2 === props.Coord[0] &&
      allowedSquare[1] === props.Coord[1];
      const backlineIsBlank=blankArea.findIndex((item:any)=>item[0]===allowedSquare[0]-2&&item[1]===allowedSquare[1])
    if (finderBlackPawnForEatLeft>-1&&backlineIsBlank>-1) return blankLeft;
  };

  const whiteTakerVertical = () => {
    const blankVertical =
      allowedSquare[0] === props.Coord[0] &&
      allowedSquare[1] - 2 === props.Coord[1] 
    const backlineIsBlank=blankArea.findIndex((item:any)=>item[0]===allowedSquare[0]&&item[1]===allowedSquare[1]-2)
    if (finderBlackPawnForEatVertical>-1&&backlineIsBlank>-1) return blankVertical;
  };


  //black takers
  const blackTakerRight = () => {
    const blankRight =
      allowedSquare[0] + 2 === props.Coord[0] &&
      allowedSquare[1] === props.Coord[1];
      const backlineIsBlank=blankArea.findIndex((item:any)=>item[0]===allowedSquare[0]+2&&item[1]===allowedSquare[1])
    if (finderWhitePawnForEatRight>-1&&backlineIsBlank>-1) return blankRight;
  };



  const blackTakerLeft = () => {
    const blankLeft =
      allowedSquare[0] - 2 === props.Coord[0] &&
      allowedSquare[1] === props.Coord[1];
      const backlineIsBlank=blankArea.findIndex((item:any)=>item[0]===allowedSquare[0]-2&&item[1]===allowedSquare[1])
    if (finderWhitePawnForEatLeft>-1&&backlineIsBlank>-1) return blankLeft;
  };

  const blackTakerVertical = () => {
    const blankVertical =
      allowedSquare[0] === props.Coord[0] &&
      allowedSquare[1] + 2 === props.Coord[1];
      const backlineIsBlank=blankArea.findIndex((item:any)=>item[0]===allowedSquare[0]&&item[1]===allowedSquare[1]+2)
    if (finderWhitePawnForEatVertical>-1&&backlineIsBlank>-1) return blankVertical;
  };




  const conditionAllow = () => {
    const colorCheck =
      (blackCondition && getTurn === "black" && colorPawn === "black") ||
      (whiteCondition && getTurn === "white" && colorPawn === "white") ||
      ((whiteTakerRight() || whiteTakerLeft()) ||whiteTakerVertical()&& colorPawn === "white")||
      ((blackTakerRight() || blackTakerLeft()) ||blackTakerVertical()&& colorPawn === "black")
    return {
      backgroundColor: colorCheck ? "yellow" : "white",
    };
  };

  const movingThere = () => {
    const filtered = allPawns.filter(
      (item) =>
        item.coord[0] === props.Coord[0] && item.coord[1] === props.Coord[1]
    );
    if (movingSit) {
      if(getTurn==="white"){
      if (whiteTakerRight() || whiteTakerLeft()||whiteTakerVertical()) {
        dispatch(updatePawnHandler(props.Coord));
        if (whiteTakerRight()) {
          dispatch(removePawn(finderBlackPawnForEatRight));
          if((whiteTakerRight() || whiteTakerLeft()||whiteTakerVertical())===false){
            dispatch(changeTurn("black"));
          }
        } else if (whiteTakerLeft()) {
          dispatch(removePawn(finderBlackPawnForEatLeft));
          if((whiteTakerRight() || whiteTakerLeft()||whiteTakerVertical())===false){
            dispatch(changeTurn("black"));
          }
        } else if (whiteTakerVertical()){
          dispatch(removePawn(finderBlackPawnForEatVertical));
          if((whiteTakerRight() || whiteTakerLeft()||whiteTakerVertical())===false){
            dispatch(changeTurn("black"));
          }
        }
        // dispatch(changeTurn("black"));
      } else if (
        selectedPawn.color === "white" &&
        whiteCondition &&
        getTurn === "white"
      ) {
        if (filtered.length === 0) {
          dispatch(updatePawnHandler(props.Coord));
          dispatch(changeTurn("black"));
        }
      }
    }
    if(getTurn==="black"){
      if (blackTakerRight() || blackTakerLeft()||blackTakerVertical()) {
        dispatch(updatePawnHandler(props.Coord));
        if (blackTakerRight()) {
          dispatch(removePawn(finderWhitePawnForEatRight));
          if((blackTakerRight() || blackTakerLeft()||blackTakerVertical())===false){
            dispatch(changeTurn("white"));
          }
        } else if (blackTakerLeft()) {
          dispatch(removePawn(finderWhitePawnForEatLeft));
          if((blackTakerRight() || blackTakerLeft()||blackTakerVertical())===false){
            dispatch(changeTurn("white"));
          }
        } else if (blackTakerVertical()){
          dispatch(removePawn(finderWhitePawnForEatVertical));
          console.log(blackTakerVertical())
          if((blackTakerRight() || blackTakerLeft()||blackTakerVertical())===false){
            dispatch(changeTurn("white"));
          }
        }
      
      }

      if (
        selectedPawn.color === "black" &&
        blackCondition &&
        getTurn === "black"
      ) 
      
      {
        if (filtered.length === 0) {
          dispatch(updatePawnHandler(props.Coord));
          dispatch(changeTurn("white"));
        }
      }
    }
      dispatch(movingState(false));
    }
  };

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "1px solid black",
        ...conditionAllow(),
      }}
      onClick={movingThere}
    >
      {props.children}
      {/* <div>{props.Coord[0]+"/"+props.Coord[1]}</div> */}
    </div>
  );
};

export default Square;
