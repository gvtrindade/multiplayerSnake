const { GRID_SIZE } = require("./constants");

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
};

function initGame() {
  const state = createGameState();
  randomFood(state);
  return state;
}

function createGameState() {
  return {
    players: [
      {
        pos: { x: 3, y: 10 },
        vel: { x: 0, y: 0 },
        snake: [
          { x: 1, y: 10 },
          { x: 2, y: 10 },
          { x: 3, y: 10 },
        ],
      },
      {
        pos: { x: 17, y: 5 },
        vel: { x: 0, y: 0 },
        snake: [
          { x: 19, y: 5 },
          { x: 18, y: 5 },
          { x: 17, y: 5 },
        ],
      },
    ],
    food: {},
    gridsize: GRID_SIZE,
  };
}

function gameLoop(state) {
  if (!state) {
    return;
  }

  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  updatePosition(playerOne);
  updatePosition(playerTwo);

  eatFood(state, playerOne);
  eatFood(state, playerTwo);

  if (checkCollision(playerOne)) return 2;
  if (checkCollision(playerTwo)) return 1;

  return false;
}

function randomFood(state) {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };

  for (let cell of state.players[0].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  for (let cell of state.players[1].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

function eatFood(state, player) {
  if (state.food.x === player.pos.x && state.food.y === player.pos.y) {
    player.snake.push({ ...player.pos });
    player.pos.x += player.vel.x;
    player.pos.y += player.vel.y;
    randomFood(state);
  }
}

function updatePosition(player) {
  player.pos.x += player.vel.x;
  player.pos.y += player.vel.y;
}

function checkCollision(player) {
  if (
    player.pos.x < 0 ||
    player.pos.x === GRID_SIZE ||
    player.pos.y < 0 ||
    player.pos.y === GRID_SIZE
  ) {
    return true;
  }

  if (player.vel.x || player.vel.y) {
    for (let cell of player.snake) {
      if (cell.x === player.pos.x && cell.y === player.pos.y) {
        return true;
      }
    }
    player.snake.push({ ...player.pos });
    player.snake.shift();
  }

  return false;
}

function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    case 37: //left
      return { x: -1, y: 0 };
    case 38: //down
      return { x: 0, y: -1 };
    case 39: //right
      return { x: 1, y: 0 };
    case 40: //up
      return { x: 0, y: 1 };
  }
}
