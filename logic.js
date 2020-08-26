
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

main();

