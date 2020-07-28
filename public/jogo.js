import createKeyboardListener from './keyBoardListener.js';
import createGame from './tabuleiro.js';
import renderScreen from './renderScreen.js';

const screen = document.getElementById('screen')
const game = createGame();
const keyboarListener = createKeyboardListener(document)


const socket = io();

socket.on('connect', () => {
    const playerId = socket.id
    console.log(`Player connect on Client with Id: ${playerId}`)
    renderScreen(screen, game, requestAnimationFrame, playerId)

})

socket.on('setup', (state) => {
    const playerId = socket.id;
    game.setState(state)
    keyboarListener.registerPlayerId(playerId)
    keyboarListener.subscribe(game.movePlayer)

    keyboarListener.subscribe((command)=> {
        socket.emit('move-player',command);
    });
});

socket.on('add-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`)
    
    game.addPlayer(command);
});

socket.on('remove-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`)
    
    game.removePlayer(command);
});

socket.on('move-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`)
    const playerId = socket.id;
    if(playerId !== command.playerId){
        game.movePlayer(command);
    }
});

socket.on('add-fruit', (command) => {
    console.log(`Receiving ${command.type} -> ${command.fruitId}`)
    
    game.addFruit(command);
});

socket.on('remove-fruit', (command) => {
    console.log(`Receiving ${command.type} -> ${command.fruitId}`)
    
    game.removeFruit(command);
});



