const Coordinates = () => {


let boardCoords:number[][]=[]  

    for (let i=0;i<8;i++){
        for (let y=0;y<8;y++){
            boardCoords=[...boardCoords,[y,i]]
        }
    }

return boardCoords

}

export default Coordinates