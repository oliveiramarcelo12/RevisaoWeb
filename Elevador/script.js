// Variáveis para armazenar as posições atuais dos dois elevadores
let elevator1Floor = 0;
let elevator2Floor = 0;

// Função chamada quando o botão é clicado para chamar o elevador
function callElevatorBoth() {
  const targetFloor = prompt("Digite o andar desejado:");
  const requestedFloor = parseInt(targetFloor);

  // Calcula a distância de cada elevador ao andar solicitado
  const distance1 = Math.abs(requestedFloor - elevator1Floor);
  const distance2 = Math.abs(requestedFloor - elevator2Floor);

  // Chama o elevador mais próximo do andar solicitado
  if (distance1 < distance2) {
    moveElevator(1, requestedFloor);
  } else {
    moveElevator(2, requestedFloor);
  }
}

// Função responsável por animar o movimento do elevador para o andar desejado
function moveElevator(elevatorNumber, floor) {
  const elevator = document.getElementById(`elevator${elevatorNumber}`);
  const floorHeight = 70;
  const targetPosition = (floor >= 0 ? 6 - floor : -floor + 7) * floorHeight;

  // Atualiza a posição do elevador animadamente
  elevator.style.bottom = targetPosition + 'px';

  // Atualiza o andar atual do elevador correspondente
  if (elevatorNumber === 1) {
    elevator1Floor = floor;
  } else if (elevatorNumber === 2) {
    elevator2Floor = floor;
  }
}
