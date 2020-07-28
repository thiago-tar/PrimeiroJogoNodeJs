function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const observers = []

    function start(){
        const frequency = 2000;
        setInterval(addFruit,frequency);
    }

    function subscribe(observerFunction){
        observers.push(observerFunction)
    }

    function notifyAll(command){
        for(const observerFunction of observers){
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState);
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = 'playerX'in command ? command.playerX : Math.floor(Math.random()* state.screen.width);
        const playerY = 'playerY'in command ? command.playerY : Math.floor(Math.random()* state.screen.height)

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        });
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        });
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random()* 10000000);
        const fruitX =  command ? command.fruitX : Math.floor(Math.random()* state.screen.width);
        const fruitY =  command ? command.fruitY : Math.floor(Math.random()* state.screen.height)

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        });
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        });
    }

    function movePlayer(command) {
        notifyAll(command);
        const player = state.players[command.playerId];
        const movePlayer = keys[command.KeyPressed];
        if (movePlayer && player) {
            movePlayer(player);
            checkFruitCollision(player);
        }
    }

    function checkFruitCollision(player) {
        for (const frutaId in state.fruits) {
            const fruta = state.fruits[frutaId]
            if (fruta.x === player.x && fruta.y === player.y)
                removeFruit({ fruitId: frutaId })
        }
    }

    const keys = {
        ArrowUp: function (player) {
            if (player.y - 1 >= 0)
                player.y--;
        },
        ArrowDown: function (player) {
            if (player.y + 1 < state.screen.height)
                player.y++;
        },
        ArrowRight: function (player) {
            if (player.x + 1 < state.screen.width)
                player.x++;
        },
        ArrowLeft: function (player) {
            if (player.x - 1 >= 0)
                player.x--;
        },
    }

    return {
        subscribe,
        addFruit,
        removeFruit,
        addPlayer,
        removePlayer,
        movePlayer,
        setState,
        state,
        start
    }
}

export default createGame;