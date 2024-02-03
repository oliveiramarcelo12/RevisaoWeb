let currentFloor = 0;
let isElevatorMoving = false;

function callElevator(floor) {
  console.log(`Chamando elevador para o andar ${floor}`);
  const closestElevator = findClosestElevator(floor);
  openElevatorDoors(closestElevator);
  moveElevator(closestElevator, floor);
}

function moveElevator(elevatorId, floor) {
  console.log(`Movendo elevador ${elevatorId} para o andar ${floor}`);
  const elevator = document.getElementById(`${elevatorId}-left`);
  const elevatorDoors = getElevatorDoors(elevatorId);

  if (!elevator || elevatorDoors.some(door => !door) || isElevatorMoving) {
    console.error(`Elementos do elevador não encontrados para ${elevatorId}`);
    return;
  }

  isElevatorMoving = true;

  const floorHeight = 70;
  const targetPosition = (floor >= 0 ? 6 - floor : -floor + 7) * floorHeight;

  // Adiciona classe para iniciar a animação de movimento
  elevator.classList.add('elevator-move');
  elevatorDoors.forEach(door => door.classList.add('elevator-moving'));

  // Atualiza a posição visual do elevador
  elevator.style.transform = `translateY(-${targetPosition}px)`;

  // Aguarde um tempo antes de fechar as portas
  setTimeout(() => {
    // Remove as classes para parar as animações
    elevator.classList.remove('elevator-move');
    elevatorDoors.forEach(door => door.classList.remove('elevator-moving'));

    // Fecha as portas com animação
    closeElevatorDoors(elevatorId);

    // Exibe a interface para escolher os andares após o elevador chegar ao destino
    showTargetFloorInput();

    // Atualiza o andar atual
    currentFloor = floor;
    updateCurrentFloorDisplay();

    isElevatorMoving = false;
  }, 1000); // 1000 milissegundos (1 segundo), ajuste conforme necessário
}

function updateCurrentFloorDisplay() {
  const currentFloorIndicator = document.getElementById('currentFloorIndicator');
  if (currentFloorIndicator) {
    currentFloorIndicator.textContent = `Andar Atual: ${currentFloor}`;
  }
}





function getElevatorDoors(elevatorId) {
  const doorLeft = document.getElementById(`${elevatorId}-left`);
  const doorRight = document.getElementById(`${elevatorId}-right`);
  return [doorLeft, doorRight];
}



function showTargetFloorInput() {
  const targetFloorInputContainer = document.getElementById('targetFloorInputContainer');

  if (!targetFloorInputContainer) {
    console.error('Container do input do andar alvo não encontrado.');
    return;
  }

  targetFloorInputContainer.style.display = 'block';
}


function requestElevator() {
  const targetFloorInput = document.getElementById('targetFloorInput');
  const targetFloor = parseInt(targetFloorInput.value);

  if (!isNaN(targetFloor)) {
    moveElevator(findClosestElevator(currentFloor), targetFloor);
  }
}

function findClosestElevator(floor) {
  const elevator1Distance = Math.abs(floor - currentFloor);
  const elevator2Distance = Math.abs(floor - currentFloor + 1); 

  return elevator1Distance <= elevator2Distance ? 'elevator1' : 'elevator2';
}


function openElevatorDoors(elevatorId) {
  const doors = document.querySelectorAll(`#${elevatorId} .door`);
  doors.forEach(door => {
    door.classList.add('door-open');
    door.classList.remove('door-closed'); // Remove a classe 'door-closed' se estiver presente

    // Ajuste na posição inicial
    door.style.left = '-25px'; // ou door.style.right = '-25px';
  });
}


function closeElevatorDoors(elevatorId) {
  const doors = getElevatorDoors(elevatorId);
  doors.forEach(door => {
    door.classList.add('door-closed');

    // Ajuste na posição final
    door.style.left = '0'; // ou door.style.right = '0';
  });
}





function toggleRed() {
  isButtonRed = !isButtonRed;
  const button = document.querySelector('.round-button');
  button.style.backgroundColor = isButtonRed ? 'red' : 'gray';
}

