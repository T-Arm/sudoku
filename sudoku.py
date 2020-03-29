import random


class Block:
    row = 0
    column = -1

    @classmethod
    def new_position(cls):
        if cls.column == 8:
            cls.row += 1
            cls.column = 0
        else:
            cls.column += 1

    def __init__(self, value):
        self.value = value
        self.new_position()
        self.isMutable = False if value > 0 else True
        self.possible_values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        self.row = self.row
        self.column = self.column
        self.pastValues = 0

    def __repr__(self):
        return f"Position: ({self.row}, {self.column}) Value: {self.value} {self.isMutable} Possible nums: {self.possible_values}"

    def __int__(self):
        return self.value

    def remove_from_possible_nums(self, found):
        newList = []
        for num in range(9):
            if num+1 not in found:
                newList.append(num+1)
            if num+1 == self.value:
                newList.append(self.value)
        self.possible_values = newList


class Board:

    def __init__(self, table=None):
        if table is None:
            self.table = []
            for row in range(9):
                row = []
                for column in range(9):
                    if random.randrange(5) == 4:
                        column = random.randint(1, 9)
                    else:
                        column = 0
                    row.append(column)
                self.table.append(row)
        else:
            self.table = table
        self.blocks = [[], [], [], [], [], [], [], [], []]
        for rowI, row in enumerate(self.table):
            for colI, value in enumerate(row):
                block = Block(value)
                self.blocks[rowI].append(block)

    def valid(self, squares):
        found = []
        for square in squares:
            if square in found:
                return False
            else:
                found.append(square)
        return True

    def box(self, x, y):
        box = []
        for rowIndex, row in enumerate(self.table):
            if 3 * y > rowIndex >= 3 * y - 3:
                for colInt, column in enumerate(row):
                    if 3 * x > colInt >= 3 * x - 3:
                        box.append(column)
        return box

    def is_solved(self):

        def rows_valid():
            for row in self.table:
                if not self.valid(row):
                    return False
            return True

        def columns_valid():
            for index in range(9):
                column = []
                for row in self.table:
                    if row[index] in column:
                        return False
                    else:
                        column.append(row[index])
            return True

        def boxes_valid():

            for x in range(3):
                x += 1
                for y in range(3):
                    y += 1
                    if not self.valid(self.box(x, y)):
                        return False
            return True

        return boxes_valid() and rows_valid() and columns_valid()

    def set_possible_nums(self, block):
        found = []
        def get_possible_nums():
            def add_to_found(nums):
                for num in nums:
                    if num != 0 and num not in found:
                        found.append(num)

            def add_row_nums():
                row = []
                for item in self.blocks[block.row]:
                    row.append(item.value)
                add_to_found(row)

            def add_column_nums():
                column = []
                for row in self.blocks:
                    column.append(row[block.column].value)
                add_to_found(column)

            def add_box_nums():
                x = 0
                y = 0
                x = int(block.column/3)+1
                y = int(block.row/3)+1
                box = self.box(x, y)
                add_to_found(box)

            add_row_nums()
            add_column_nums()
            add_box_nums()
            block.remove_from_possible_nums(found)
            return block.possible_values
        return get_possible_nums()

    def solve(self):

        row = 0
        column = 0

        def update_table_with(block):
            self.table[block.row][block.column] = self.blocks[block.row][block.column].value

        def backTracked_index_list(block):
            newColumn = block.column-1
            newRow = block.row
            if newColumn < 0:
                newRow = block.row-1
                newColumn = 8
            newBlock = self.blocks[newRow][newColumn]
            if newBlock.isMutable:
                return [newRow, newColumn]
            else:
                return backTracked_index_list(newBlock)

        while row < 9:
            while column < 9:
                block = self.blocks[row][column]
                self.set_possible_nums(block)
                if block.isMutable:
                    if len(block.possible_values) > block.pastValues:
                        block.value = block.possible_values[block.pastValues]
                        block.pastValues += 1
                        column += 1
                    else:
                        block.pastValues = 0
                        block.value = 0
                        newIndexList = backTracked_index_list(block)
                        row = newIndexList[0]
                        column = newIndexList[1]
                else:
                    column += 1
                update_table_with(block)
            row += 1
            column = 0

        return self

    def __repr__(self):
        result = ""
        for row in self.table:
            result += f"{row}\n"
        return result


# board = Board([[8, 2, 7, 1, 5, 4, 3, 9, 6],
#                [9, 6, 5, 3, 2, 7, 1, 4, 8],
#                [3, 4, 1, 6, 8, 9, 7, 5, 2],
#                [5, 9, 3, 4, 6, 8, 2, 7, 1],
#                [4, 7, 2, 5, 1, 3, 6, 8, 9],
#                [6, 1, 8, 9, 7, 2, 4, 3, 5],
#                [7, 8, 6, 2, 3, 5, 9, 1, 4],
#                [1, 5, 4, 7, 9, 6, 8, 2, 3],
#                [2, 3, 9, 8, 4, 1, 5, 6, 7]])


# board = Board([[5, 3, 1, 2, 7, 6, 8, 9, 4],
#                [6, 2, 4, 1, 9, 5, 7, 3, 0],
#                [0, 9, 8, 0, 0, 0, 0, 6, 0],
#                [8, 0, 0, 0, 6, 0, 0, 0, 3],
#                [4, 0, 0, 8, 0, 3, 0, 0, 1],
#                [7, 0, 0, 0, 2, 0, 0, 0, 6],
#                [0, 6, 0, 0, 0, 0, 2, 8, 0],
#                [0, 0, 0, 4, 1, 9, 0, 0, 5],
#                [0, 0, 0, 0, 8, 0, 0, 7, 9]])

board = Board([[5, 3, 0, 0, 7, 0, 0, 0, 0],
               [6, 0, 0, 1, 9, 5, 0, 0, 0],
               [0, 9, 8, 0, 0, 0, 0, 6, 0],
               [8, 0, 0, 0, 6, 0, 0, 0, 3],
               [4, 0, 0, 8, 0, 3, 0, 0, 1],
               [7, 0, 0, 0, 2, 0, 0, 0, 6],
               [0, 6, 0, 0, 0, 0, 2, 8, 0],
               [0, 0, 0, 4, 1, 9, 0, 0, 5],
               [0, 0, 0, 0, 8, 0, 0, 7, 9]])
print(board)
print(board.solve())
print(board.is_solved())
# [[8, 2, 7, 1, 5, 4, 3, 9, 6],
# [9, 6, 5, 3, 2, 7, 1, 4, 8],
# [3, 4, 1, 6, 8, 9, 7, 5, 2],
# [5, 9, 3, 4, 6, 8, 2, 7, 1],
# [4, 7, 2, 5, 1, 3, 6, 8, 9],
# [6, 1, 8, 9, 7, 2, 4, 3, 5],
# [7, 8, 6, 2, 3, 5, 9, 1, 4],
# [1, 5, 4, 7, 9, 6, 8, 2, 3],
# [2, 3, 9, 8, 4, 1, 5, 6, 7]]
