let currentFloor = 0;

function callElevator(floor) {
  console.log(`Chamando elevador para o andar ${floor}`);
  const closestElevator = findClosestElevator(floor);
  openElevatorDoors(closestElevator);
  moveElevator(closestElevator, floor);
  currentFloor = floor;
  showTargetFloorInput();
}

function moveElevator(elevatorId, floor) {
  console.log(`Movendo elevador ${elevatorId} para o andar ${floor}`);
  const elevator = document.getElementById(`${elevatorId}-left`);
  const elevatorDoors = getElevatorDoors(elevatorId);

  if (!elevator || elevatorDoors.some(door => !door)) {
    console.error(`Elementos do elevador não encontrados para ${elevatorId}`);
    return;
  }

  const floorHeight = 70;
  const targetPosition = (floor >= 0 ? 6 - floor : -floor + 7) * floorHeight;

  // Adiciona classe para iniciar a animação de movimento
  elevator.classList.add('elevator-move');
  elevatorDoors.forEach(door => door.classList.add('elevator-moving'));

  // Atualiza a posição visual do elevador
  elevator.style.transform = `translateY(-${targetPosition}px)`;

  // Abre as portas após um determinado tempo
  setTimeout(() => {
    openElevatorDoors(elevatorId);

    // Aguarde um tempo antes de encerrar a animação e fechar as portas
    setTimeout(() => {
      // Remove as classes para parar as animações
      elevator.classList.remove('elevator-move');
      elevatorDoors.forEach(door => door.classList.remove('elevator-moving'));

      // Fecha as portas com animação
      closeElevatorDoors(elevatorId);

      // Atualiza a posição dos rótulos dos elevadores após a animação
      updateElevatorLabels();
    }, 1000); // Ajuste conforme necessário
  }, 1000); // Ajuste conforme necessário
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
  const elevator2Distance = Math.abs(floor - currentFloor + 1); // Corrigi o cálculo

  return elevator1Distance <= elevator2Distance ? 'elevator1' : 'elevator2';
}

// Restante do seu código permanece inalterado


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

function animateElevator(elevatorId, targetFloor, currentFloor) {
  const elevator = document.getElementById(elevatorId);
  const label = document.getElementById(`${elevatorId}-label`);
  const directionLabel = document.getElementById(`${elevatorId}-direction-label`);
  const doorLeft = document.getElementById(`${elevatorId}-door-left`);
  const doorRight = document.getElementById(`${elevatorId}-door-right`);
  const floorHeight = 70;

  // Animação para abrir as portas
  doorLeft.style.transition = 'left 1s';
  doorRight.style.transition = 'right 1s';

  // Abre as portas
  doorLeft.style.left = '-25px';
  doorRight.style.right = '-25px';

  // Após um segundo, inicia a animação de mover o elevador
  setTimeout(() => {
    // Fecha as portas
    doorLeft.style.transition = 'left 1s';
    doorRight.style.transition = 'right 1s';
    doorLeft.style.left = '0';
    doorRight.style.right = '0';

    const targetPosition = (targetFloor >= 0 ? 6 - targetFloor : -targetFloor + 7) * floorHeight;

    // Animação para mover o elevador
    elevator.style.transition = 'bottom 2s';
    elevator.style.bottom = targetPosition + 'px';
    const direction = targetFloor > currentFloor ? 'Subindo' : 'Descendo';
    directionLabel.textContent = direction;

    // Atualiza a variável currentFloor após a animação
    setTimeout(() => {
      doorLeft.style.transition = 'none';
      doorRight.style.transition = 'none';
      elevator.style.transition = 'none';
      currentFloor = targetFloor;
      // Atualizar a etiqueta de direção para parado
      directionLabel.textContent = 'Parado';

      // Atualiza a posição visual do rótulo do elevador
      label.style.transition = 'bottom 2s';
      label.style.bottom = (currentFloor >= 0 ? 6 - currentFloor : -currentFloor + 7) * floorHeight + 'px';

      // Atualiza o conteúdo do rótulo para mostrar o número do elevador
      label.textContent = elevatorId === 'elevator1' ? 'E1' : 'E2';
    }, 2000); // 2000 milissegundos (2 segundos), deve ser igual à duração da animação de movimento
  }, 1000); // 1000 milissegundos (1 segundo), deve ser igual à duração da animação de abertura das portas
}
