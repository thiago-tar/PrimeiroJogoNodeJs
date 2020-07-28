export default function renderScreen(screen, game,requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d');
    context.clearRect(0, 0, screen.width, screen.height)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        if (playerId == currentPlayerId)
            context.fillStyle='blue';
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    requestAnimationFrame(()=>{
        renderScreen(screen,game,requestAnimationFrame,currentPlayerId)
    });
}