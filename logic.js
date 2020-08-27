
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


function setGameBackground(){
    const gameMatrix = [];
    for(i = 0;i<18;i++){
        gameMatrix[i] = [];
        for(j=0; j<20; j++){
            const addDiv = document.createElement('div');
            addDiv.classList.add("box");
            addDiv.classList.add("box-sky");
            divContainer.appendChild(addDiv);
            gameObject.set(`${i},${j}`,{addDiv}); 
        }
    }
}

function setFloor(){
    for(i = 17; i>=15; i-- ){
        for(j=0; j<20; j++){
            const test = gameObject.get(`${i},${j}`)
            if(i == 15){
                test.addDiv.classList.remove('box-sky')
                test.addDiv.classList.add('box-half-floor')
            }
            else{
                test.addDiv.classList.remove('box-sky')
                test.addDiv.classList.add('box-floor')
            }
        }
    }
}

function setTree(){
    let treeStartCol = 6;
    const tree = [[0,0,1,1,0,0],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,0],
                [0,0,1,1,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0],
                [0,0,0,2,0,0]];
    console.log(tree.length);
    for(i = 0; i<tree.length; i++ ){
        let treeStartRow = 3;
        for(j=0; j<6; j++){
            let test = gameObject.get(`${treeStartCol},${treeStartRow}`);
            
            if(tree[i][j] === 1){
                test.addDiv.classList.remove('box-sky');
                test.addDiv.classList.add('box-grass');
            }
            else if(tree[i][j] === 2){
                test.addDiv.classList.remove('box-sky');
                test.addDiv.classList.add('box-tree');
            }
            treeStartRow++;
        }
        treeStartCol++;
    }

}


setGameBackground();
setFloor();
setTree();

//const test = gameObject.get('4,5');





