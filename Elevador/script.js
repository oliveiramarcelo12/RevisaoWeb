// Adicione uma função para chamar o elevador a partir do botão de cada andar
function callElevator(floor) {
  let closestElevator = findClosestElevator(floor);
  moveElevator(closestElevator, floor);
}

// Adicione uma função para encontrar o elevador mais próximo
function findClosestElevator(floor) {
  const distanceToElevator1 = Math.abs(floor - currentFloor(elevator1));
  const distanceToElevator2 = Math.abs(floor - currentFloor(elevator2));

  return distanceToElevator1 < distanceToElevator2 ? elevator1 : elevator2;
}

// Adapte a função de movimento para aceitar um elevador específico
function moveElevator(elevator, floor) {
  const elevatorElement = document.getElementById(elevator);
  // Restante do código para movimentar o elevador
}
function toggleRed() {
  const button = document.querySelector('.gray-button');
  button.classList.toggle('clicked');
}
