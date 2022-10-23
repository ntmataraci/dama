import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { allPawns } from '../pawn/PawnTypes'
import Coordinates from "../board/Coordinates"
export interface moveTypes {
  coord: number[],
  color:string,
  moving:boolean,
  selectedPawn:any,
  allPawns:any[],
  turn:"black"|"white",
  blankArea:number[][]
}

const differenceArray = (arr:number[][],arr2:{color:string,name:string,coord:number[]}[]) => {

const coordArrString=(arr2.map(item=>item.coord.toString()))
const arrOneString=arr.map(item=>item.toString())
const difference=arrOneString.filter(x=>!coordArrString.includes(x))
const parsed=difference.map(item=>item.split(","))
const toNumber=parsed.map(item=>[+item[0],+item[1]])
return toNumber
}



const initialState: moveTypes = {
  coord: [],
  color:"",
  moving:false,
  selectedPawn:{color:"",name:"",coord:""},
  allPawns:[...allPawns],
  turn:"white",
  blankArea:differenceArray(Coordinates(),allPawns)
  // Coordinates().filter(coordinate=>allPawns.map(item=>coordinate[0]!==item.coord[0]!&&coordinate[1]!==item.coord[1]))
}
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clickedPawn: (state, action: PayloadAction<number[]>) => {
      state.coord = action.payload
    },
    colorSend:(state, action: PayloadAction<string>) => {
    state.color = action.payload
      },
    movingState:(state,action:PayloadAction<boolean>) => {
        state.moving = action.payload
          },
    selectedPawnHandler:(state, action: PayloadAction<{color:string,coord:[],name:string}>) => {
        const {color,coord,name}=action.payload
        state.selectedPawn.color=color
        state.selectedPawn.coord=coord
        state.selectedPawn.name=name
          },
 
    updatePawnHandler:(state, action: PayloadAction<number[]>) => {
          const selected=state.allPawns.find(item=>item.name===current(state.selectedPawn).name&&item.color===current(state.selectedPawn).color)
          selected.coord=action.payload
          selected.color=state.color
         const selectedIndex=state.allPawns.findIndex(item=>item.name===current(state.selectedPawn).name&&item.color===current(state.selectedPawn).color)
          state.allPawns[selectedIndex]=selected
         state.blankArea=differenceArray(Coordinates(),state.allPawns)
              },
     changeTurn:(state,action:PayloadAction<"white"|"black">)=>{
      state.turn=action.payload
     },
     removePawn:(state, action: PayloadAction<number>)=>{
      console.log(action.payload)
    state.allPawns.splice(action.payload,1)
     }
  },
})

// Action creators are generated for each case reducer function
export const { clickedPawn,colorSend,movingState,selectedPawnHandler,updatePawnHandler,changeTurn,removePawn} = gameSlice.actions

export default gameSlice.reducer