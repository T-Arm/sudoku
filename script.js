const table = document.querySelector("tbody")
const generateBTN = document.getElementById("generateBTN")
const solveBTN = document.getElementById("solveBTN")
<<<<<<< HEAD
=======
<<<<<<< HEAD
const quick_solveBTN = document.getElementById("quickSolveBTN")
=======
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
let tableGUIList = []

for(i = 0; i < 9; i++){
  let row = document.createElement("tr");
  let rowList = []
  for(j = 0; j < 9; j++){
    let cell = document.createElement("td");
    row.appendChild(cell)
    rowList.push(cell)
  }
  tableGUIList.push(rowList)
  table.appendChild(row)
}


let in_list = (list, value) => {
  for(num of list){
    if (num === value){
      return true;
    }
  }
  return false;
}

class Block{  
  static row = 0;
  static column = -1;
  static getPosision(){
    if(Block.column < 8){
      Block.column++;
    }else{
      Block.row++;
      Block.column = 0;
    }
  }
  constructor(value){
    Block.getPosision()
    this.row = Block.row;
    this.column = Block.column;
    this.value = value;
    this.isMutable = this.value > 0 ? false : true;
    this.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.pastValues = 0;
  }


  remove_from_possible_nums(found){
    let newList = [];
    for(let i = 1; i < 10; i++){
      if(!in_list(found, i)){
        newList.push(i);
      }
      if( i === this.value){
        newList.push(i);
      }
    }
    this.possibleValues = newList;
  }
}

class Board {

  valid(blockValues){
    let found = [];
    for(let value of blockValues){
      if(in_list(found, value)){
        return false
      }else{
        found.push(value)
      }
    }
    return true
  }

  box(x, y){
    let valueList = []
    for(let rowI = 0; rowI < this.table.length; rowI++){
      if(3 * y > rowI && rowI >= 3 * y -3){
        for( let colI = 0; colI < this.table[rowI].length; colI++){
          if( 3 * x > colI && colI >= 3 * x - 3){
            valueList.push(this.table[rowI][colI])
          }
        }
      }
    }
    return valueList
  }

  makeGUI(){
    let table = this.table
    for(let rowI = 0; rowI < this.table.length; rowI++){
      setTimeout(function(){
        for(let colI = 0; colI < 9; colI++){
          setTimeout(function(){
            let number = table[rowI][colI]
            let cell = tableGUIList[rowI][colI]
            if(number > 0){
              cell.textContent = number;
              cell.id = "notMutable"
            }
          }, 25 * colI)
        }
      }, 225 *rowI)
    }
  }

  is_solved(){
    let rows_valid = () =>{
      for(let row of this.table){
        if(!this.valid.call(this,row)){
          return false
        }
      return true
      }
    }
    
    let columns_valid = () => {
      for(let index = 0; index < 9; index++){
        let column = []
        for(let row of this.table){
          if(in_list(column, row[index])){
            console.log(index)
            return false
          }else{
            column.push(row[index])
          }
        }
      }
      return true
    }
    
    let boxes_valid = () =>{
      for(let x = 1; x < 4; x++){
        for(let y = 1; y < 4; y++){
          if(!this.valid.call(this, (this.box(x,y)))){
            return false
          }
        }
      }
      return true
    }
    return rows_valid.call(this) && columns_valid.call(this) && boxes_valid.call(this)
  }

  set_possibe_nums(block){
    let found = []
    let get_possible_nums = () => {
      let add_to_found = (nums) => {
        for( let num of nums){
          if(num != 0 && !in_list(found, num)){
            found.push(num)
          }
        }
      }
      
      let add_row_nums = () => {
        let row = this.table[block.row]
        add_to_found(row)
      }

      let add_column_nums = () => {
        let column = []
        for( let rowI = 0; rowI < 9; rowI++){
          column.push(this.table[rowI][block.column])
        }
        add_to_found(column)
      }

      let add_box_nums = () => {
        const x = Math.floor(block.column/3) + 1
        const y = Math.floor(block.row/3) + 1
        const box = this.box(x, y)
        add_to_found(box)
      }

      add_row_nums.call(this)
      add_column_nums.call(this)
      add_box_nums.call(this)
    }
    get_possible_nums.call(this)
    block.remove_from_possible_nums(found)
    return(found)
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
  backTracked_index_list(block){
    let newColumn = block.column-1
    let newRow = block.row
    if(newColumn < 0){
      newRow -= 1
      newColumn = 8
    }
    const newBlock = this.blocks[newRow][newColumn]
    console.log(`new Block: ${newBlock}`)
    if( newBlock.isMutable){
      return [newRow, newColumn]
    }else{
      return this.backTracked_index_list(newBlock)
    }
  }

=======
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
  solve(){

    let row = 0
    let column = 0

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41

    let backTracked_index_list = (block) => {
      let newColumn = block.column-1
      let newRow = block.row
      if(newColumn < 0){
        newRow -= 1
        newColumn = 8
      }
      const newBlock = this.blocks[newRow][newColumn]
      console.log(`new Block: ${newBlock}`)
      if( newBlock.isMutable){
        return [newRow, newColumn]
      }else{
        return backTracked_index_list(newBlock)
      }
    }
<<<<<<< HEAD
=======
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
    
    const board = this

    let loop = setInterval(function(){
        if(row < 9 && column < 9){
          const block = board.blocks[row][column]
          console.log(block)
          board.set_possibe_nums(block)
          if(block.isMutable){
            if(block.possibleValues.length > block.pastValues){
              block.value = block.possibleValues[block.pastValues]
              console.log(`value: ${block.value}`)
              block.pastValues++
              board.table[row][column] = block.value
              tableGUIList[row][column].textContent = block.value
              column++
            }else{
              console.log("backtracking")
              block.pastValues = 0
              block.value = 0
              board.table[row][column] = 0
<<<<<<< HEAD
              tableGUIList[row][column].textContent = ""
<<<<<<< HEAD
              const newIndexLIst = backTracked_index_list.call(board, block)
=======
              const newIndexLIst = board.backTracked_index_list.call(board, block)
=======
              tableGUIList[row][column].textContent = block.value
              const newIndexLIst = backTracked_index_list.call(board, block)
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
              console.log(newIndexLIst)
              row = newIndexLIst[0]
              column = newIndexLIst[1]
            }
          }else{
            column++
          }
        }else if(row < 9){
          console.log(board.table[row])
          row++
          column = 0
        }else{
          clearInterval(loop)
        }
    }, 1)
     
    return this
  }

<<<<<<< HEAD
  animate(){
    let lastCell = null
    let row = 0
    let column = 0
=======
<<<<<<< HEAD
  quick_solve(){
    let row = 0
    let column = 0
  
    while(row < 9){
      while(column < 9){
        const block = board.blocks[row][column]
          console.log(block)
          board.set_possibe_nums(block)
          if(block.isMutable){
            if(block.possibleValues.length > block.pastValues){
              block.value = block.possibleValues[block.pastValues]
              console.log(`value: ${block.value}`)
              block.pastValues++
              board.table[row][column] = block.value
              tableGUIList[row][column].textContent = block.value
              column++
            }else{
              console.log("backtracking")
              block.pastValues = 0
              block.value = 0
              board.table[row][column] = 0
              tableGUIList[row][column].textContent = ""
              const newIndexLIst = board.backTracked_index_list.call(board, block)
              console.log(newIndexLIst)
              row = newIndexLIst[0]
              column = newIndexLIst[1]
            }
          }else{
            column++
          }
       }
       row ++
       column = 0
    }
    return board
=======
  animate(){
    let lastCell = null
    let row = 0
    let column = 0
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
    let loop = setInterval(function(){
      if(column < 9 && row < 9){
        console.log([row, column])
        tableGUIList[row][column].style.background = "green"
        column++
      }else if(row < 9){
        row ++
        column = 0
      }else{
        clearInterval
      }
      }, 100)
<<<<<<< HEAD
=======
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
  }

  constructor(table=null){
    this.blocks = [[], [], [], [], [], [], [], [], []]
    this.table = [[], [], [], [], [], [], [], [], []]
    if(table === null){
      for(let rowI = 0; rowI < this.blocks.length; rowI++){
        for(let colI = 0; colI < 9; colI++){
          this.blocks[rowI].push(new Block(0))
        }
      }
      for(let rowI = 0; rowI < this.table.length; rowI++){
        for(let colI = 0; colI < 9; colI++){
          this.table[rowI].push(this.blocks[rowI][colI].value)
        }
      }
      for(let rowI = 0; rowI < this.blocks.length; rowI++){
        for(let colI = 0; colI < this.blocks[rowI].length; colI++){
<<<<<<< HEAD
          if(Math.floor(Math.random()*3) === 1){
=======
<<<<<<< HEAD
          if(Math.floor(Math.random()*2) === 1){
=======
          if(Math.floor(Math.random()*3) === 1){
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
            const block = this.blocks[rowI][colI]
            block.isMutable = false
            this.set_possibe_nums(block)
            block.value = block.possibleValues[Math.floor(Math.random() * block.possibleValues.length)]
            this.table[rowI][colI] = block.value
          }
        }
      }
    }else{
      this.table = table
      for(let rowI = 0; rowI < this.table.length; rowI++){
        for( let colI = 0; colI < this.table[rowI].length; colI++){
          let block = new Block(this.table[rowI][colI])
          this.blocks[rowI].push(block)
        }
      }
    }
    this.makeGUI.call(this)
  }
}


<<<<<<< HEAD
let newBoard = (table) =>{
=======
<<<<<<< HEAD

let newBoard = (table) =>{
  // return new Board([[5, 3, 0, 0, 7, 0, 0, 0, 0],
  //                   [6, 0, 0, 1, 9, 5, 0, 0, 0],
  //                   [0, 9, 8, 0, 0, 0, 0, 6, 0],
  //                   [8, 0, 0, 0, 6, 0, 0, 0, 3],
  //                   [4, 0, 0, 8, 0, 3, 0, 0, 1],
  //                   [7, 0, 0, 0, 2, 0, 0, 0, 6],
  //                   [0, 6, 0, 0, 0, 0, 2, 8, 0],
  //                   [0, 0, 0, 4, 1, 9, 0, 0, 5],
  //                   [0, 0, 0, 0, 8, 0, 0, 7, 9]])
  return new Board()
=======
let newBoard = (table) =>{
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
  return new Board([[5, 3, 0, 0, 7, 0, 0, 0, 0],
                    [6, 0, 0, 1, 9, 5, 0, 0, 0],
                    [0, 9, 8, 0, 0, 0, 0, 6, 0],
                    [8, 0, 0, 0, 6, 0, 0, 0, 3],
                    [4, 0, 0, 8, 0, 3, 0, 0, 1],
                    [7, 0, 0, 0, 2, 0, 0, 0, 6],
                    [0, 6, 0, 0, 0, 0, 2, 8, 0],
                    [0, 0, 0, 4, 1, 9, 0, 0, 5],
                    [0, 0, 0, 0, 8, 0, 0, 7, 9]])
  // return new Board()
<<<<<<< HEAD
=======
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
}

let board

generateBTN.addEventListener("click", function (){
  board = newBoard()
  console.log(board)
  console.log(board.is_solved())
})


solveBTN.addEventListener("click", function(){
  console.log(board)
  console.log(board.solve())
<<<<<<< HEAD
  // board.animate()
=======
<<<<<<< HEAD
})

quick_solveBTN.addEventListener("click", function(){
  console.log(board.quick_solve())
=======
  // board.animate()
>>>>>>> 4b131521e925a2a9c9f2579348963dca46d9a9ed
>>>>>>> 586204e1423755c4bf5e380378b36dac37b32f41
})