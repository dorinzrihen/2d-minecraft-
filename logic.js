
//start game

function main(){
    const minecraftStat = document.createElement('div');
    minecraftStat.classList.add("background-img");

    const minecraftdiv = document.createElement('div');
    minecraftdiv.innerHTML = `<img src="/imgs/logo.png" alt="">`
    minecraftdiv.style.marginBottom = "10vh"

    const gameinfo =  document.createElement('div');
    gameinfo.classList.add('game-info-style')
    gameinfo.innerHTML = `<h1>המשחק של מיינקראפט, ניתן להתחיל לשחק גם מבלי למלא את ההגדרות.
     ניתן להוסיף מספר עצים, שיחים, עננים, אבנים ועוד וכעוד ליצירת העולם שחלמתם עליו. </h1>`;
    


    let foramResize = document.createElement('div');
    let form = document.createElement('form');

    form.innerHTML = `<form name="myForm">
    <input type="text" name="width" placeholder="width">
    <br>
    <input type="text" name="tree" placeholder="number of tress">
    <input type="text" name="rock" placeholder="number of rocks">
    <input type="text" name="cloud" placeholder="number of clouds">
    <input type="text" name="bush" placeholder="number of bushes">
    <input class="btn" type="submit" value="reset/resize">
    </form>`

    form.classList.add('form-style')

    foramResize.appendChild(form)
   
    minecraftStat.appendChild(minecraftdiv);
    minecraftStat.appendChild(gameinfo);
    minecraftStat.appendChild(form);
    document.body.appendChild(minecraftStat);

    form.addEventListener('submit',function(){
        event.preventDefault();
        let resizeValue = event.currentTarget.width.value 
        if(event.currentTarget.width.value > 40){
            let numOfTree = Number(event.currentTarget.tree.value);
            let numOfRock = Number(event.currentTarget.rock.value);
            let numOfCloud = Number(event.currentTarget.cloud.value);
            let numOfBush= Number(event.currentTarget.bush.value);
            startGame(resizeValue,true,numOfTree,numOfRock,numOfCloud,numOfBush);
            
        }
        else{
            startGame(40,false,1,1,2,1);
        }
        minecraftStat.remove();
    })


}
    


main();

const gameObject = new Map();

//logic element and tools
const minecraftTools ={
    axe:['box-tree','box-grass'],
    pickaxe:['box-rock'],
    shovel:['box-floor','box-half-floor'],
}



//future option - random 

const gameHight = 90;

let calcCol = gameHight/5;


const floorRange = 3;

function setGameBackground(divContainer,gameWidth){
    //every div is 2vw 5vh.
    divContainer.style.width = `${gameWidth}vw`;
    const gameMatrix = [];
    for(i = 0;i<calcCol;i++){
        gameMatrix[i] = [];
        for(j=0; j<gameWidth/2; j++){
            const addDiv = document.createElement('div');
            addDiv.classList.add("box");
            addDiv.classList.add("box-sky");
            divContainer.appendChild(addDiv);
            gameObject.set(`${i},${j}`,{addDiv}); 
        }
    }
}


//set floor 3 blocks
function setFloor(divContainer,calcRow){
    for(i = calcCol-1; i>=calcCol-3; i-- ){
        for(j=0; j< calcRow/2; j++){
            const myDiv = gameObject.get(`${i},${j}`)
            if(i == calcCol-3){
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
function setCloud(calcRow){
    const cloud = [[0,0,1,1,0,0],
                [1,1,1,1,1,1],
                [0,0,0,1,1,1],
                [0,0,0,0,0,0]];

    let cloudStartCol = Math.floor(Math.random() * 10)+1; 
    let cloudStartRow = Math.floor(Math.random() * ((calcRow/2)-cloud[0].length)); 
    setElement(cloudStartCol,cloudStartRow,cloud,'box-cloud');
}

//set tree with random row
function setTree(calcRow){
    const tree = [[0,0,1,1,0,0],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,0],
                [0,0,1,1,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0]];
                let treeStartCol = 6;
                const treeRandom = Math.floor(Math.random() * (calcRow/2)-tree[0].length-6)+6;
    setElement(treeStartCol,treeRandom,tree,'box-grass','box-tree');
}


//set rock
function setRock(calcRow){
    const rock = [[1,1],[1,1],[1,1]]
    let rockStartCol = calcCol - 6;
    let rockStartRow = Math.floor(Math.random() * (calcRow/2)-rock[0].length-3)+3; 
    setElement(rockStartCol,rockStartRow,rock,'box-rock');
}


function setBush(calcRow){
    const bush = [[1,1,1],[1,1,1]];
    let bushStartCol = calcCol - 5;
    let bushStartRow = Math.floor(Math.random() * (calcRow/2)-bush[0].length-3)+3; 
    setElement(bushStartCol,bushStartRow,bush,'box-grass');
}

function setElement(startCol,startRow,arr,elementClass,elementClass2){
    let startColNum = Number(startCol);
    let startRowNum = Number(startRow);
    for(i = 0; i< arr.length; i++ ){
        let row = Number(startRowNum); 
        for(j=0; j< arr[0].length; j++){
            let myDiv = gameObject.get(`${startColNum},${row}`);
            if(arr[i][j] === 1){
                if(myDiv){
                    myDiv.addDiv.classList.remove('box-sky');
                    myDiv.addDiv.classList.add(elementClass);
                }
            }
            else if(arr[i][j] === 2){
                if(myDiv){
                    myDiv.addDiv.classList.remove('box-sky');
                    myDiv.addDiv.classList.add(elementClass2);
                }
            }
            row++;
        }
        row = Number(startRowNum); 
        startColNum++;
    }
}


function repeatElement(func, times,calcRow) {
    func(calcRow);
    times && --times && repeatElement(func, times,calcRow);
}

function startGame(calcRow,moveleft,numOfTree,numOfRock,numOfCloud,numOfBush){
    const divContainer = document.querySelector('.game-container');
    if(moveleft){
        divContainer.style.left = 0;
    }
    setGameBackground(divContainer,calcRow);
    setFloor(divContainer,calcRow);
    //set element
    repeatElement(setCloud,numOfCloud,calcRow);
    repeatElement(setTree,numOfTree,calcRow);
    repeatElement(setBush,numOfBush,calcRow);
    repeatElement(setRock,numOfRock,calcRow);
    //add event listener to the game div
    const boxEvent = document.querySelectorAll('.box');
    for(i=0; i<boxEvent.length;i++){
        boxEvent[i].addEventListener('click', addEventElement);

    }
}






// tools
const myTools = document.querySelector('.weapon-options');
const toolMap = new Map();
let currentTool;
let currentElement = [];

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



//current element box
let currentElementDiv = document.createElement('div');
currentElementDiv.classList.add('current-box');
currentElementDiv.classList.add('current-element-border')
myTools.insertAdjacentElement("beforeend",currentElementDiv);


function updateCurrentElement(currentElement){
    let classArr = currentElementDiv.className.split(' ')
    let lastValue = classArr[classArr.length -1]
    if(currentElement.length >= 1 && currentElementDiv.classList.length > 2){
        currentElementDiv.classList.remove(`${lastValue}`);
        currentElementDiv.classList.add(`${currentElement[currentElement.length-1]}`);
        
        
    }
    else if(currentElement.length >= 1 &&  currentElementDiv.classList.length === 2){
        currentElementDiv.classList.add(`${currentElement[currentElement.length-1]}`);
    }
    else if(currentElement.length === 0 &&  currentElementDiv.classList.length === 3){
        currentElementDiv.classList.remove(`${lastValue}`);
    }
}

//picktool and change the color
function pickTool(element){
    const toolEvent = document.querySelectorAll('.weapon-border');
    for(i=0; i<toolEvent.length;i++){
        toolEvent[i].classList.remove('current-tool');
    }
    element.currentTarget.classList.add('current-tool');
    currentTool=element;
}

//add event listeners
const toolEvent = document.querySelectorAll('.weapon-border');
for(i=0; i<toolEvent.length;i++){
    toolEvent[i].addEventListener('click',pickTool);
}

function addEventElement(element){
    debugger;
    event.stopPropagation();
    //if no tool selected and no picking the current element 
    if(currentTool && currentTool.target.alt){
        const myTool = currentTool.target.alt;
        let canUse = minecraftTools[myTool].some(function(classElement){
            return classElement === element.currentTarget.classList[element.currentTarget.classList.length -1];
        })
       if(canUse){
            currentElement.push(`${element.currentTarget.classList[element.currentTarget.classList.length -1]}`);
            updateCurrentElement(currentElement);
            element.currentTarget.classList.remove(`${element.currentTarget.classList[element.currentTarget.classList.length -1]}`);
            //only box 
            if(element.currentTarget.classList.length <= 1){
                element.currentTarget.classList.add('box-sky')
            }
       }
       else{
            currentTool.target.classList.add('blue')
            setTimeout(function(){
                currentTool.target.classList.remove('blue')},500)
       }
       return;
    }
    //without tool/ only to place a element
    else if(currentTool){
        if((element.currentTarget.classList.contains('box-sky') || element.currentTarget.classList.contains('box-cloud')) && (element.currentTarget.classList.length === 2 )&& (currentElement.length >= 1)){
            element.currentTarget.classList.add(currentElement.pop());
            element.currentTarget.classList.remove('box-sky');
            element.currentTarget.classList.remove('box-cloud');
            updateCurrentElement(currentElement);
            
        }
    }
}



//place the elements 
function placeElement(element){
    //remove the mark
    const toolEvent = document.querySelectorAll('.weapon-border');
    for(i=0; i<toolEvent.length;i++){
        toolEvent[i].classList.remove('current-tool');
    }
    currentTool = element;


}
currentElementDiv.addEventListener('click',placeElement);


