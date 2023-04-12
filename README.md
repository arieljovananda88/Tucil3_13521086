# Tucil3_13521086
## Program Description
This repository contains programs for UCS and A* search algorithm, and its visulization. UCS (Uniform Cost Search) is a search algorithm that explores the graph by expanding the node with the lowest path cost so far. A* search is a search algorithm that is based on the idea of UCS but adds an additional heuristic function to guide the search towards the goal. Both algorithms uses a graph and nodes, to pinpoint the next node that has the lowest cost/heuristic value, and use that said node to search its next nodes, repeat its process until you find the shortest path. The visulization uses html, and css for its styling.

## Program Requirements
1. Web Browser
2. Internet Connection
3. Node js

## Installation
If you dont have Node js in your system you may need to install it first. Run this command on your terminal to install it:
``` bash
Npm install
```

## How To Run The Program
1. Clone the repository to your local machine
``` bash
git clone https://github.com/arieljovananda88/Tucil3_13521086.git
```
2. Open the src folder
3. Double click the RunMe.html file

## How To Use The Program
1. There will be a choose file button on the screen, click it and input the file that you want to search. For the input you have to follow this format:
```bash
9
A 0 1
B 2 2
C 3 9
D 5 8
E 8 1
F 10 2
G 6 7
H 9 3
I 12 15

  A B C D E F G H I
A 0 1 0 2 0 0 11 0 0
B 1 0 3 0 0 0 7 0 0
C 0 3 0 4 0 0 0 0 12
D 2 0 4 0 5 0 0 0 0
E 0 0 0 5 0 9 0 8 0
F 0 0 0 0 9 0 0 10 0
G 11 7 0 0 0 0 0 0 0
H 0 0 0 0 10 0 0 0 0
I 0 0 12 0 0 0 0 0 0
```
9 means the amount of nodes, below that are the nodes names and theyre coordinates (x,y). Below that is the adjacency matrix, and the numbers inside of the matrix are the road names from node 1 to node 2, for example, node A to node B has road "1" between them. You NEED to follow the format, the amount of nodes needs to be correct, all the nodes should be named correctly, and the adjacency matrix has to be a mirrored one (matrix[n][m] equals to matrix [m][n]). If the input file is correct, the visualized graph should appear on screen, if it doesnt, please check you input again. <br>
<br>
2. After you have input the file, there will be the start node and the end node that you can choose for the search. <br>
<br>
3. If you have chosen the start and end node, pick either between the two buttons "RUN UCS" or "RUN A*".<br>
<br>
4. After every single search, you need to click the "Reset" button, otherwise the visulization will not be correct afterwards.

## Repository Structure
```
│ .DS_Store
│ README.md
├─── doc
│       │ Tucil3_13521086.pdf
│
├─── src
│       │ AStar.js
│       │ RunMe.html
│       │ style.css
│       │ UCS.js
│
├─── test
        │ graf.txt
        │ graf1.txt
        │ graf2.txt
        │ graf3.txt
        │ graf4.txt
        │ graf5.txt
```
## Author
[Ariel Jovananda / 13521086](https://github.com/arieljovananda88)

