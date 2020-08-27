
//start game

function main(){
    const minecraftStat = document.createElement('div');
    minecraftStat.classList.add("background-img");

    const minecraftdiv = document.createElement('div');
    minecraftdiv.innerHTML = `<img src="/imgs/logo.png" alt="">`
    minecraftdiv.style.marginBottom = "20vh"

    const gameinfo = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, eveniet voluptatibus, odio voluptate illo ad expedita minima nostrum corrupti ducimus fugiat culpa adipisci dignissimos! Odio, voluptate! Nulla officia provident laudantium tempora debitis adipisci illum natus, ex quasi nihil vitae iusto doloremque vero velit assumenda non! Pariatur numquam consequatur sit reiciendis!`;

    const startGameBtn = document.createElement('div');
    startGameBtn.innerHTML = `<button class="btn">Start now</button>`

    const node = document.createTextNode(gameinfo);
    minecraftStat.appendChild(minecraftdiv);
    minecraftStat.appendChild(node);
    minecraftStat.appendChild(startGameBtn);
    document.body.appendChild(minecraftStat);

    startGameBtn.addEventListener('click',function(){
    minecraftStat.remove();
    })
}

//main();

const divContainer = document.querySelector('.game-container');
const gameObject = new Map();

//future option - random 
const gameWidth = 40;
const gameHight = 90;

const calcCol = gameHight/5;
const calcRow = gameWidth/2;

const floorRange = 3;

function setGameBackground(){
    //every div is 2vw 5vh.
    const gameMatrix = [];
    for(i = 0;i<calcCol;i++){
        gameMatrix[i] = [];
        for(j=0; j<calcRow; j++){
            const addDiv = document.createElement('div');
            addDiv.classList.add("box");
            addDiv.classList.add("box-sky");
            divContainer.appendChild(addDiv);
            gameObject.set(`${i},${j}`,{addDiv}); 
        }
    }
}


//set floor 3 blocks
function setFloor(){
    for(i = 17; i>=15; i-- ){
        for(j=0; j<20; j++){
            const myDiv = gameObject.get(`${i},${j}`)
            if(i == 15){
                myDiv.addDiv.classList.remove('box-sky')
                myDiv.addDiv.classList.add('box-half-floor')
            }
            else{
                myDiv.addDiv.classList.remove('box-sky')
                myDiv.addDiv.classList.add('box-floor')
            }
        }
    }
}

//set cloud to the game
function setCloud(){
    let cloudStartCol = Math.floor(Math.random() * 10)+1; 
    let cloudStartRow = Math.floor(Math.random() * 10)+1; 
    const cloud = [[0,0,1,1,0,0],
                [1,1,1,1,1,1],
                [0,0,0,1,1,1],
                [0,0,0,0,0,0]];
    setElement(cloudStartCol,cloudStartRow,cloud,'box-cloud');
}

//set tree with random row
function setTree(){
    let treeStartCol = 6;
    const treeRandom = Math.floor(Math.random() * 10)+1;
    const tree = [[0,0,1,1,0,0],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,0],
                [0,0,1,1,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0]];
    setElement(treeStartCol,treeRandom,tree,'box-grass','box-tree');
}


//set rock
function setRock(){
    let rockStartCol = calcCol - 6;
    let rockStartRow = Math.floor(Math.random() * 10)+1; 
    const rock = [[1,1],[1,1],[1,1]]
    setElement(rockStartCol,rockStartRow,rock,'box-rock');
}


function setBush(){
    let bushStartCol = calcCol - 5;
    let bushStartRow = Math.floor(Math.random() * 10)+1; 
    const bush = [[1,1,1],[1,1,1]];
    setElement(bushStartCol,bushStartRow,bush,'box-grass');
}

function setElement(startCol,startRow,arr,elementClass,elementClass2){
    let startColNum = startCol;
    let startRowNum = startRow;

    for(i = 0; i< arr.length; i++ ){
        let row = startRowNum; 
        for(j=0; j< arr[0].length; j++){
            let myDiv = gameObject.get(`${startColNum},${row}`);
            if(arr[i][j] === 1){
                myDiv.addDiv.classList.remove('box-sky');
                myDiv.addDiv.classList.add(elementClass);
            }
            else if(arr[i][j] === 2){
                myDiv.addDiv.classList.remove('box-sky');
                myDiv.addDiv.classList.add(elementClass2);
            }
            row++;
        }
        row = startRowNum;
        startColNum++;
    }
}

setGameBackground();
setCloud();
setCloud();
setFloor();
setTree();
setRock();
setBush();



// tools
const myTools = document.querySelector('.weapon-options');
const toolMap = new Map();
let currentTool;
let currentElement;

function createTool(name,picture){
    const myDivTool = document.createElement('div');
    let toolImg = `<img class='tool-pic' src="/imgs/${picture}" alt="${name}">`
    myDivTool.classList.add("weapon-border");

    myDivTool.innerHTML = toolImg;
    myTools.appendChild(myDivTool);
}


createTool('axe','axe.png');
createTool('pickaxe','pickaxe.png');
createTool('shovel','shovel.png');
//add event listeners


const toolEvent = document.querySelectorAll('.weapon-border');
for(i=0; i<toolEvent.length;i++){
    toolEvent[i].addEventListener('click',function(element){
        currentTool=element;
        console.log(currentTool)
    });
}





