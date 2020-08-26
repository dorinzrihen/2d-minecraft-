
//main

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
function setGameBackground(){
    const gameMatrix = [];
    
    for(i = 0;i<18;i++){
        gameMatrix[i] = [];
        for(j=0; j<20; j++){
            const addDiv = document.createElement('div');
            addDiv.classList.add("box");
            addDiv.classList.add("box-sky")
            divContainer.appendChild(addDiv);
        }
    }
    return gameMatrix;
}

function setFloor(matrix){
    for(i = matrix.length ; i>=matrix.length-4; i-- ){
        for(j=0; j<20; j++){
            const addDiv = divContainer.querySelector('div');
            addDiv.classList.remove("box-sky")
            addDiv.classList.add("box-floor");
            divContainer.appendChild(addDiv);
        }
    }
}


let gameMatrix = setGameBackground();
console.log(gameMatrix.length);
setFloor(gameMatrix);


