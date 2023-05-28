
function loading(){
    lerStorage();
    $('#load').css('display','none');
    window.scrollTo(0,0);
    Controller.search();
}

var text = document.querySelector('#textButton');
var playerDino = document.getElementById('player1');
var playerDinoWalk = document.getElementById('playerWalk');
var playerDinoJump = document.getElementById('playerJump');
var playerDinoDown = document.getElementById('playerDown');
var ponto1 = document.querySelector('#ponto1');
var ponto2 = document.querySelector('#ponto2');
var ponto3 = document.querySelector('#ponto3');
var pontoMax = document.querySelector('#pontoMax');
var pontoMaxName = document.querySelector('#pontoMaxName');
var pontoMax2 = document.querySelector('#pontoMax2');
var pontoMaxName2 = document.querySelector('#pontoMaxName2');
var pontoMax3 = document.querySelector('#pontoMax3');
var pontoMaxName3 = document.querySelector('#pontoMaxName3');
var caixaRecorde = document.querySelector('.inputPontuador');
var nomePontuador = document.getElementById('pontuadorInput');
var nuvens = document.querySelector('.nuvem');
var solLua = document.getElementById('solLua');
var gameDiv = document.getElementById('game');
var pontoDiv = document.getElementById('Pontuacao');
var botaoN = document.querySelector('#btnN');
var botaoS = document.querySelector('#btnS');
var fundoBranco = document.querySelector('#fundoBranco');

var audioTrilha = document.querySelector('#music');
var audioAplauso = document.querySelector('#recordeAudio');
var audioErro = document.querySelector('#error');
var audioPonto = document.querySelector('#ponto');
var audioJump = document.querySelector('#jump');

var selectMusic = 1;
var selectTheme = 0;
var selectBG = 0;

var pontuadorList = [];
var pontuadorList2 = [];
var pontuadorList3 = [];

var historic1 = localStorage.getItem(1);
var historic2 = localStorage.getItem(2);
var historic3 = localStorage.getItem(3);

var historicMax = localStorage.getItem(10);
var historicMax2 = localStorage.getItem(11);
var historicMax3 = localStorage.getItem(12);

var count = 0;
var recordNew = 0;
var score = 0;
var inicio = 0;
var speed = 5;
var pulo = 20;

var controleConect = false;
var conexao = 0;

var myGame;

var tema = 0;

function novoGame() {
    setTimeout(function() {
        $('#subtituloLoadIndex').text('Tudo pronto. Pode fechar esta janela. Para iniciar um novo jogo recarregue a página.')
        $("#load4").attr('src', 'img/dino.png')
    openGame();
}, 3000)

}

function openGame() {
    myGame = window.open("game.html", "_blank");
}
  
function closeGame() {
    myGame = window.close();
}


function playAplauso() {
    audioAplauso.play();
}

function lerStorage() {

    if (historic1) {
        ponto1.textContent = historic1;
    }

    if (historic2) {
        ponto2.textContent = historic2;
    }

    if (historic3) {
        ponto3.textContent = historic3;
    }

    if (historicMax) {

        var todosMax = JSON.parse(historicMax);
        pontoMax.textContent = todosMax[0];
        pontoMaxName.textContent = todosMax[1];
    }
    if (historicMax2) {

        var todosMax2 = JSON.parse(historicMax2);
        pontoMax2.textContent = todosMax2[0];
        pontoMaxName2.textContent = todosMax2[1];
    }
    if (historicMax3) {

        var todosMax3 = JSON.parse(historicMax3);
        pontoMax3.textContent = todosMax3[0];
        pontoMaxName3.textContent = todosMax3[1];
    }
}

function salvaStorage() {
    localStorage.setItem(1,ponto1.textContent);
    localStorage.setItem(2,ponto2.textContent);
    localStorage.setItem(3,ponto3.textContent);
}

function verificaNovoPontuador() {

    var novoPonto = parseInt(ponto3.textContent);
    var pontoHist1 = parseInt(pontoMax.textContent);
    var pontoHist2 = parseInt(pontoMax2.textContent);
    var pontoHist3 = parseInt(pontoMax3.textContent);

    if (novoPonto  > pontoHist1) {
        recordNew = 10;

        pontoMax3.textContent = pontoMax2.textContent;
        pontoMax2.textContent = pontoMax.textContent;

        pontoMaxName3.textContent = pontoMaxName2.textContent;
        pontoMaxName2.textContent = pontoMaxName.textContent;

        pontuadorList2 = [
            pontoMax2.textContent,
            pontoMaxName2.textContent
        ];

        pontuadorList3 = [
            pontoMax3.textContent,
            pontoMaxName3.textContent
        ];

        var pontuadorJson2 = JSON.stringify(pontuadorList2);
        localStorage.setItem(11,pontuadorJson2);

        var pontuadorJson3 = JSON.stringify(pontuadorList3);
        localStorage.setItem(12,pontuadorJson3);

        caixaRecorde.style.display = 'block';
        playAplauso();
        nomePontuador.focus();
    }

    if (
        novoPonto  > pontoHist2 &&
        novoPonto  < pontoHist1
    ) {
        recordNew = 11;

        pontoMax3.textContent = pontoMax2.textContent;

        pontoMaxName3.textContent = pontoMaxName2.textContent;

        pontuadorList3 = [
            pontoMax3.textContent,
            pontoMaxName3.textContent
        ];

        var pontuadorJson3 = JSON.stringify(pontuadorList3);
        localStorage.setItem(12,pontuadorJson3);

        caixaRecorde.style.display = 'block';
        playAplauso();
        nomePontuador.focus();
    }

    if (
        novoPonto  > pontoHist3 &&
        novoPonto  < pontoHist2
    ) {
        recordNew = 12;
        caixaRecorde.style.display = 'block';
        playAplauso();
        nomePontuador.focus();
    }
}

nomePontuador.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        if (caixaRecorde.style.display === 'block'){
            document.getElementById("pontuadorButton").click();
        }
    }
});

function salvaNovoPontuador() {

    if (nomePontuador.value == "") {

        alert("Insira seu nome")

    } else {

        pontuadorList = [
            ponto3.textContent,
            nomePontuador.value
        ];      

        var pontuadorJson = JSON.stringify(pontuadorList);
        localStorage.setItem(recordNew,pontuadorJson);
        caixaRecorde.style.display = 'none';
        location.reload();
    }
}

function noiteTheme() {
    $('.nuvem').css('filter','brightness(0.5)');
    $('.chao').css('filter','brightness(0.5)');
    $('.cacto').css('filter','brightness(0.5)');
    $('#game').css('color','white');
    solLua.src = "img/lua.png"
    $('.nuvem').css('display','none')
    $('.fundoEstrela').css('display','block')
    tema = 1;
}

function diaTheme() {
    $('.nuvem').css('filter','brightness(1.5)');
    $('.chao').css('filter','brightness(1.0)');
    $('.cacto').css('filter','brightness(1.0)');
    $('#game').css('color','black');
    solLua.src = "img/sol.png"
    $('.nuvem').css('display','block')
    $('.fundoEstrela').css('display','none')
    tema = 0;
}


document.addEventListener('keydown', (event) => {
    if (caixaRecorde.style.display === ''){
        
        if (event.key === "ArrowUp") {
            if (count === 0) {
                if (inicio % 2 === 0 || inicio == 0) {
                    playGame();
                }
            }
        }
        
        if (event.keyCode == '83') {
            if (count === 0) {
                if (inicio % 2 === 1) {
                    playGame();
                }
            }
        }
        
        if (event.keyCode == '78') {
            if (count === 0) {
                if (inicio % 2 === 1) {
                    closeGame();
                }
            }
        }
    }
});

gameDiv.addEventListener('click', (event) => {
    if (caixaRecorde.style.display === '') {
        if (count === 0) {
            if (inicio % 2 === 0 || inicio == 0) {
                playGame()
            }
        }
     }
 });

pontoDiv.addEventListener('click', (event) => {
    if (caixaRecorde.style.display === '') {
        if (count === 0) {
            if (inicio % 2 === 0 || inicio == 0) {
                playGame()
            }
        }
     }
 });

fundoBranco.addEventListener('click', (event) => {
    if (caixaRecorde.style.display === '') {
        if (count === 0) {
            if (inicio % 2 === 0 || inicio == 0) {
                playGame()
            }
        }
     }
 });

botaoN.addEventListener('click', (event) => {
    closeGame();
 });

botaoS.addEventListener('click', (event) => {
    playGame();
 });

function playGame() {

    const player = document.getElementById('player');

    const player1 = $('.player');

    const obstacle = document.getElementById('obstacle');
    const obstacle2 = document.getElementById('obstacle2');
    const obstacle3 = document.getElementById('obstacle3');
    const obstacle4 = document.getElementById('obstacle4');
    const obstacle5 = document.getElementById('obstacle5');
    const obstacle6 = document.getElementById('obstacle6');

    const nuvem1 = document.getElementById('nuvem1');
    const nuvem2 = document.getElementById('nuvem2');
    const nuvem3 = document.getElementById('nuvem3');
    const nuvem4 = document.getElementById('nuvem4');
    const nuvem5 = document.getElementById('nuvem5');
    const nuvem6 = document.getElementById('nuvem6');

    const nuvem1S = $('#nuvem1');
    const nuvem2S = $('#nuvem2');
    const nuvem3S = $('#nuvem3');
    const nuvem4S = $('#nuvem4');
    const nuvem5S = $('#nuvem5');
    const nuvem6S = $('#nuvem6');

    const chao1 = document.getElementById('chao1');
    const chao2 = document.getElementById('chao2');

    const fundoEstrela1 = document.getElementById('fundoEstrela1');
    const fundoEstrela2 = document.getElementById('fundoEstrela2');


    const solOuLua = document.getElementById('solLua');

    let gameArea = document.getElementById('game');
    let scoreDisplay = document.getElementById('score');

    let gameAreaWidth = parseInt(window.getComputedStyle(gameArea).getPropertyValue('width'));

    let obstacleWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue('width'));
    let obstacleHeight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('height'));

    let obstacle2Width = parseInt(window.getComputedStyle(obstacle2).getPropertyValue('width'));
    let obstacle2Height = parseInt(window.getComputedStyle(obstacle2).getPropertyValue('height'));

    let obstacle3Width = parseInt(window.getComputedStyle(obstacle3).getPropertyValue('width'));
    let obstacle3Height = parseInt(window.getComputedStyle(obstacle3).getPropertyValue('height'));

    let obstacle4Width = parseInt(window.getComputedStyle(obstacle4).getPropertyValue('width'));
    let obstacle4Height = parseInt(window.getComputedStyle(obstacle4).getPropertyValue('height'));

    let obstacle5Width = parseInt(window.getComputedStyle(obstacle5).getPropertyValue('width'));
    let obstacle5Height = parseInt(window.getComputedStyle(obstacle5).getPropertyValue('height'));

    let obstacle6Width = parseInt(window.getComputedStyle(obstacle6).getPropertyValue('width'));
    let obstacle6Height = parseInt(window.getComputedStyle(obstacle6).getPropertyValue('height'));

    let solWidth = parseInt(window.getComputedStyle(solOuLua).getPropertyValue('width'));
    let SolHeight = parseInt(window.getComputedStyle(solOuLua).getPropertyValue('height'));

    let obstacleLeft = gameAreaWidth + 20;
    let obstacle2Left = gameAreaWidth + 320;
    let obstacle3Left = gameAreaWidth + 620;
    let obstacle4Left = gameAreaWidth + 920;
    let obstacle5Left = gameAreaWidth + 1220;
    let obstacle6Left = gameAreaWidth + 1520;

    let nuvem1Width = parseInt(window.getComputedStyle(nuvem1).getPropertyValue('width'));
    let nuvem2Width = parseInt(window.getComputedStyle(nuvem3).getPropertyValue('width'));
    let nuvem3Width = parseInt(window.getComputedStyle(nuvem3).getPropertyValue('width'));
    let nuvem4Width = parseInt(window.getComputedStyle(nuvem4).getPropertyValue('width'));
    let nuvem5Width = parseInt(window.getComputedStyle(nuvem5).getPropertyValue('width'));
    let nuvem6Width = parseInt(window.getComputedStyle(nuvem6).getPropertyValue('width'));

    let chao1Left = 0;
    let chao2Left = gameAreaWidth;

    let fundoEstrela1Left = 0;
    let fundoEstrela2Left = gameAreaWidth;

    let solLuaLeft = gameAreaWidth - parseInt(Math.random() * gameAreaWidth);

    let nuvem1Left = gameAreaWidth - parseInt(Math.random() * gameAreaWidth);
    let nuvem2Left = gameAreaWidth - parseInt(Math.random() * gameAreaWidth);
    let nuvem3Left = gameAreaWidth - parseInt(Math.random() * gameAreaWidth);
    let nuvem4Left = gameAreaWidth - parseInt(Math.random() * gameAreaWidth);
    let nuvem5Left = gameAreaWidth - parseInt(Math.random() * gameAreaWidth);
    let nuvem6Left = gameAreaWidth - parseInt(Math.random() * gameAreaWidth);

    let isJumping = false;
    let isGameOver = false;

    let centroSol = solLuaLeft + (solWidth / 2);

    let centroPlayer = 80;

    
    let playerSombraVer = 55;
    let playerSombraHor = -20;
    let playerSombraTam = 15;

    window.scrollTo(0,0);
    
    count++;
    inicio++;
    score = 0;
    recordNew = 0;
    speed = 5;

    if (inicio > 3) {
        $('#textController').css('display','none');
    }
    

    $('#textButton1').css('display','none')

    if (conexao === 1) {
        $('#buttonA').css('display','block');
        conexao++;
    }

    $('.buttonsHelp').css('display','none');
    $('.buttonStart').css('display','none');

    if (inicio % 2 === 0) {

        
        selectTheme = parseInt(Math.random() * 21)
        selectBG = parseInt(Math.random() * 4)

        if (selectTheme >= 10) {
            diaTheme();
        } else {
            noiteTheme();
        }

        $(".chao").attr('src', 'img/fundo' + selectBG + '.png')
        if (inicio % 4 === 0) {
            $('#info').css('display','block');
            selectMusic = parseInt(Math.random() * (4) + 1);
        }
    }
    
    if (inicio % 5 === 0) {
        $('#info').css('display','none');
        }

    playerWalk();
    obstacle.style.display = 'block';
    obstacle2.style.display = 'block';
    obstacle3.style.display = 'block';
    obstacle4.style.display = 'block';
    obstacle5.style.display = 'block';
    obstacle6.style.display = 'block';

    scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);

    playTrilha()

    function jump() {
        if (isJumping) return;
        playPulo();
        isJumping = true;
        let bottom = 0;
        let jumpInterval = setInterval(() => {
            if (bottom >= 120) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (bottom <= 0) {
                        playerWalk();
                        clearInterval(fallInterval);
                        isJumping = false;

                    } else {

                        playerDown();
                        bottom -= 8;
                        playerSombraVer -=9;
                        playerSombraTam -=0.5;
                        player.style.bottom = bottom + 'px';
                        player1.css('filter','drop-shadow(' + playerSombraHor + 'px ' + playerSombraVer +'px ' + playerSombraTam + 'px #000000)');

                        checkCollision();
                    }
                }, pulo);
            } else {
                playerUp();
                bottom += 8;
                playerSombraVer +=9;
                playerSombraTam +=0.5;
                player.style.bottom = bottom + 'px';
                player1.css('filter','drop-shadow(' + playerSombraHor + 'px ' + playerSombraVer +'px ' + playerSombraTam + 'px #000000)');
                checkCollision();
            }
        }, pulo);
    }

    function checkCollision() {
        if (isGameOver) return;

        let playerRect = player.getBoundingClientRect();

        let obstacleRect = obstacle.getBoundingClientRect();
        let obstacle2Rect = obstacle2.getBoundingClientRect();
        let obstacle3Rect = obstacle3.getBoundingClientRect();
        let obstacle4Rect = obstacle4.getBoundingClientRect();
        let obstacle5Rect = obstacle5.getBoundingClientRect();
        let obstacle6Rect = obstacle6.getBoundingClientRect();

        if (
            playerRect.bottom - 10 >= obstacleRect.top &&
            playerRect.right - 40 >= obstacleRect.left &&
            playerRect.left + 30 <= obstacleRect.right ||

            playerRect.bottom - 20 >= obstacle2Rect.top &&
            playerRect.right - 40 >= obstacle2Rect.left &&
            playerRect.left + 30 <= obstacle2Rect.right ||

            playerRect.bottom - 30 >= obstacle3Rect.top &&
            playerRect.right - 40 >= obstacle3Rect.left &&
            playerRect.left + 30 <= obstacle3Rect.right ||

            playerRect.bottom - 30 >= obstacle4Rect.top &&
            playerRect.right - 40 >= obstacle4Rect.left &&
            playerRect.left + 30 <= obstacle4Rect.right ||

            playerRect.bottom - 20 >= obstacle5Rect.top &&
            playerRect.right - 40 >= obstacle5Rect.left &&
            playerRect.left + 30 <= obstacle5Rect.right ||

            playerRect.bottom - 10 >= obstacle6Rect.top &&
            playerRect.right - 40 >= obstacle6Rect.left &&
            playerRect.left + 30 <= obstacle6Rect.right
        ) {
            isGameOver = true;

            obstacle.style.animationPlayState = 'paused';
            obstacle2.style.animationPlayState = 'paused';
            obstacle3.style.animationPlayState = 'paused';
            obstacle4.style.animationPlayState = 'paused';
            obstacle5.style.animationPlayState = 'paused';
            obstacle6.style.animationPlayState = 'paused';

            nuvem1.style.animationPlayState = 'paused';
            nuvem2.style.animationPlayState = 'paused';
            nuvem3.style.animationPlayState = 'paused';
            nuvem4.style.animationPlayState = 'paused';
            nuvem5.style.animationPlayState = 'paused';
            nuvem6.style.animationPlayState = 'paused';

            chao1.style.animationPlayState = 'paused';
            chao2.style.animationPlayState = 'paused';

            solOuLua.style.animationPlayState = 'paused';

            playerPause();
            stopTrilha();
            if (controleConect) {
                if (inicio % 2 === 0) {
                    $('#maneteONPlay2').css('display','block');
                }
                if (inicio % 2 === 1) {
                    $('#maneteONPlay').css('display','block');
                }
                $('#maneteOff').css('display','none');
            } else {
                if (inicio % 2 === 1) {
                $('#textButton1').css('display','none')
                $('#textButton2').css('display','block');
                }
                if (inicio % 2 === 0) {
                    $('#textButton1').css('display','block')
                    $('#textButton2').css('display','none')
                }
            }
            
            
            if (score > 1) {

                playErro();
                
                ponto1.textContent = ponto2.textContent;
                ponto2.textContent = ponto3.textContent;

                ponto3.textContent = parseInt(score /10);

                salvaStorage();
                verificaNovoPontuador();

            }

            count = 0;

        } else if (playerRect.left > obstacleRect.left && !obstacle.classList.contains('passed')) {
            obstacle.classList.add('passed');
            score = score + 100;
            scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);
        } else if (playerRect.left > obstacle2Rect.left && !obstacle2.classList.contains('passed')) {
            obstacle2.classList.add('passed');
            score = score + 100;
            scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);
        } else if (playerRect.left > obstacle3Rect.left && !obstacle3.classList.contains('passed')) {
            obstacle3.classList.add('passed');
            score = score + 100;
            scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);
        } else if (playerRect.left > obstacle4Rect.left && !obstacle4.classList.contains('passed')) {
            obstacle4.classList.add('passed');
            score = score + 100;
            scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);
        } else if (playerRect.left > obstacle5Rect.left && !obstacle5.classList.contains('passed')) {
            obstacle5.classList.add('passed');
            score = score + 100;
            scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);
        } else if (playerRect.left > obstacle6Rect.left && !obstacle6.classList.contains('passed')) {
            obstacle6.classList.add('passed');
            score = score + 100;
            scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);
        } 
    }

    function playTrilha() {
        var playPromise = audioTrilha.play();
 
        if (playPromise !== undefined) {
            playPromise.then(_ => {
            audioTrilha.src = "audio/music" + selectMusic + ".mp3";
            audioTrilha.loop = true;
            if (inicio % 2 === 1 ||inicio === 1) {
                audioTrilha.play();
            }
            })
            .catch(error => {
            
            });
        }
    }

    function stopTrilha() {
        audioTrilha.pause();
        audioTrilha.currentTime = 0;
    }

    function playErro() {
        audioErro.volume = 0.5;
        audioErro.play();
    }

    function playPonto() {
        audioPonto.volume = 0.2;
        audioPonto.play();
    }
    
    function playPulo() {
        $('#maneteON').css('display','none');
        $('#buttonA').css('display','none');
        audioJump.volume = 0.5;
        audioJump.play();
    }

    function playerWalk() {
        playerDino.style.display = 'none';
        playerDinoWalk.style.display = 'block';
        playerDinoJump.style.display = 'none';
        playerDinoDown.style.display = 'none';
    }

    function playerUp() {
        playerDino.style.display = 'none';
        playerDinoWalk.style.display = 'none';
        playerDinoJump.style.display = 'block';
        playerDinoDown.style.display = 'none';
    }

    function playerDown() {
        playerDino.style.display = 'none';
        playerDinoWalk.style.display = 'none';
        playerDinoJump.style.display = 'none';
        playerDinoDown.style.display = 'block';
    }

    function playerPause() {
        playerDino.style.display = 'block';
        playerDinoWalk.style.display = 'none';
        playerDinoJump.style.display = 'none';
        playerDinoDown.style.display = 'none';
    }

    function moveObstacle() {
        if (isGameOver) return;

        checkCollision();

        if (parseInt(score /10) > 6000) {
            
            speed = 10;
            pulo = 10;

        } else if (parseInt(score /10) > 5000) {
            
            speed = 9;
            pulo = 12;
            
        } else if (parseInt(score /10) > 4000) {
            
            speed = 8;
            pulo = 14;
            
        } else if (parseInt(score /10) > 3000) {
            
            speed = 7;
            pulo = 15;
            
        } else if (parseInt(score /10) > 2000) {
            
            speed = 6;
            pulo = 16;
            
        } else if (parseInt(score /10) > 1000) {
            
            speed = 5;
            pulo = 18;
            
        } else {
            
            speed = 4;
            pulo = 20;
            
        }
        
        if (parseInt(score /10) % 1000 === 0) {
            playPonto();
        }
        
        obstacleLeft -= speed;
        obstacle.style.left = obstacleLeft + 'px';
        obstacle2Left -= speed;
        obstacle2.style.left = obstacle2Left + 'px';
        obstacle3Left -= speed;
        obstacle3.style.left = obstacle3Left + 'px';
        obstacle4Left -= speed;
        obstacle4.style.left = obstacle4Left + 'px';
        obstacle5Left -= speed;
        obstacle5.style.left = obstacle5Left + 'px';
        obstacle6Left -= speed;
        obstacle6.style.left = obstacle6Left + 'px';

        nuvem1Left -= 1;
        nuvem1.style.left = nuvem1Left + 'px';
        nuvem2Left -= 0.8;
        nuvem2.style.left = nuvem2Left + 'px';
        nuvem3Left -= 1.2;
        nuvem3.style.left = nuvem3Left + 'px';
        nuvem4Left -= 1.4;
        nuvem4.style.left = nuvem4Left + 'px';
        nuvem5Left -= 0.4;
        nuvem5.style.left = nuvem5Left + 'px';
        nuvem6Left -= 0.6;
        nuvem6.style.left = nuvem6Left + 'px';

        chao1Left -= 0.7;
        chao1.style.left = chao1Left + 'px';
        chao2Left -= 0.7;
        chao2.style.left = chao2Left + 'px';

        fundoEstrela1Left -= 0.5;
        fundoEstrela1.style.left = fundoEstrela1Left + 'px';
        fundoEstrela2Left -= 0.5;
        fundoEstrela2.style.left = fundoEstrela2Left + 'px';

        solLuaLeft -= 0.2;
        solOuLua.style.left = solLuaLeft + 'px';

        centroSol = solLuaLeft + (solWidth / 2);

        let centroNuvem1 = nuvem1Left + 50;
        let centroNuvem2 = nuvem2Left + 50;
        let centroNuvem3 = nuvem3Left + 50;
        let centroNuvem4 = nuvem4Left + 50;
        let centroNuvem5 = nuvem5Left + 50;
        let centroNuvem6 = nuvem6Left + 50;


        let central = parseInt((centroSol - centroPlayer) / 10);

        let centralN1 = parseInt((centroSol - centroNuvem1) / 10);
        let centralN2 = parseInt((centroSol - centroNuvem2) / 10);
        let centralN3 = parseInt((centroSol - centroNuvem3) / 10);
        let centralN4 = parseInt((centroSol - centroNuvem4) / 10);
        let centralN5 = parseInt((centroSol - centroNuvem5) / 10);
        let centralN6 = parseInt((centroSol - centroNuvem6) / 10);

        let nuvem1SombraHor = -centralN1;
        let nuvem2SombraHor = -centralN2;
        let nuvem3SombraHor = -centralN3;
        let nuvem4SombraHor = -centralN4;
        let nuvem5SombraHor = -centralN5;
        let nuvem6SombraHor = -centralN6;

        if (tema === 0) {

            playerSombraTam = 15;

        } else if (tema === 1) {

            playerSombraTam = 25
        }

        if (central >= 100) {
            playerSombraHor = -100;
        } else {
            playerSombraHor = -central;
        }

        

        player1.css('filter','drop-shadow(' + playerSombraHor + 'px ' + playerSombraVer +'px ' + playerSombraTam + 'px #000000)');
        
        /*
        nuvem1S.css('filter','drop-shadow(' + nuvem1SombraHor + 'px 210px 15px #000000);');
        nuvem2S.css('filter','drop-shadow(' + nuvem2SombraHor + 'px 150px 15px #000000);');
        nuvem3S.css('filter','drop-shadow(' + nuvem3SombraHor + 'px 460px 15px #000000);');
        nuvem4S.css('filter','drop-shadow(' + nuvem4SombraHor + 'px 355px 15px #000000);');
        nuvem5S.css('filter','drop-shadow(' + nuvem5SombraHor + 'px 305px 15px #000000);');
        nuvem6S.css('filter','drop-shadow(' + nuvem6SombraHor + 'px 405px 15px #000000);');
        */


        score++;

        scoreDisplay.textContent = 'Pontuação: ' + parseInt(score /10);

        if (obstacleLeft <= -75) {
            obstacleLeft = gameAreaWidth + parseInt(Math.random() * 60);
            obstacle.classList.remove('passed');
        }
        if (obstacle2Left <= -75) {
            obstacle2Left = gameAreaWidth + parseInt(Math.random() * 50);
            obstacle2.classList.remove('passed');
        }
        if (obstacle3Left <= -75) {
            obstacle3Left = gameAreaWidth + parseInt(Math.random() * 40);
            obstacle3.classList.remove('passed');
        }
        if (obstacle4Left <= -75) {
            obstacle4Left = gameAreaWidth + parseInt(Math.random() * 40);
            obstacle4.classList.remove('passed');
        }
        if (obstacle5Left <= -75) {
            obstacle5Left = gameAreaWidth + parseInt(Math.random() * 60);
            obstacle5.classList.remove('passed');
        }
        if (obstacle6Left <= -75) {
            obstacle6Left = gameAreaWidth + parseInt(Math.random() * 50);
            obstacle6.classList.remove('passed');
        } 

        if (nuvem1Left <= -300) {
            nuvem1Left = gameAreaWidth + parseInt(Math.random() * 40);
        }
        if (nuvem2Left <= -300) {
            nuvem2Left = gameAreaWidth + parseInt(Math.random() * 40);
        }
        if (nuvem3Left <= -300) {
            nuvem3Left = gameAreaWidth + parseInt(Math.random() * 40);
        }
        if (nuvem4Left <= -300) {
            nuvem4Left = gameAreaWidth + parseInt(Math.random() * 40);
        }
        if (nuvem5Left <= -300) {
            nuvem5Left = gameAreaWidth + parseInt(Math.random() * 40);
        }
        if (nuvem6Left <= -300) {
            nuvem6Left = gameAreaWidth + parseInt(Math.random() * 40);
        }
        
        if (chao1Left <= -gameAreaWidth) {
            chao1Left = gameAreaWidth;
        }
        if (chao2Left <= -gameAreaWidth) {
            chao2Left = gameAreaWidth;
        }

        if (fundoEstrela1Left <= -gameAreaWidth) {
            fundoEstrela1Left = gameAreaWidth;
        }
        if (fundoEstrela2Left <= -gameAreaWidth) {
            fundoEstrela2Left = gameAreaWidth;
        }

        if (solLuaLeft <= -300) {
            solLuaLeft = 1920;
        }

        requestAnimationFrame(moveObstacle);
    }

    moveObstacle();


    document.addEventListener('keydown', (event) => {
        if (caixaRecorde.style.display === ''){
            if (event.key === 'ArrowUp') {
                if (count > 0) {
                    if (isGameOver !== true) {
                        jump();
                    }
                }
            }
        }
    });

    gameDiv.addEventListener('click', (event) => {
        if (caixaRecorde.style.display === ''){
            if (count > 0) {
                if (isGameOver !== true) {
                    jump();
                }
            }
        }
    });

    pontoDiv.addEventListener('click', (event) => {
        if (caixaRecorde.style.display === ''){
            if (count > 0) {
                if (isGameOver !== true) {
                    jump();
                }
            }
        }
    });

    fundoBranco.addEventListener('click', (event) => {
        if (caixaRecorde.style.display === ''){
            if (count > 0) {
                if (isGameOver !== true) {
                    jump();
                }
            }
        }
    });

    window.addEventListener('gc.button.press', function(event) {
        var button = event.detail;
        if (button.pressed) {
            if (caixaRecorde.style.display === ''){
                if (button.name == "FACE_1") {
                    if (count > 0) {
                        if (isGameOver !== true) {
                            jump();
                        }
                    }
                }
            }
        }
    }, false);
};

Controller.search();

window.addEventListener('gc.controller.found', function(event) {
    var controller = event.detail.controller;
    console.log("Controller found at index " + controller.index + ".");
    console.log("'" + controller.name + "' is ready!");
    controleConect = true;
    conexao++;
    $('#maneteON').text("'" + controller.name + "' conectado!");
    if (count === 0) {
        $('.buttonsHelpPause').css('display','block');
        $('#textButton').css('display','none');
        $('#imgPlay').css('display','none');
        $('#textController').css('display','none');
        $('#textButton1').css('display','none')
    } else {
        $('.buttonsHelpPlay').css('display','block');
        $('#textButton').css('display','none');
        $('#imgPlay').css('display','none');
        $('#textController').css('display','none');
    }
}, false);

window.addEventListener('gc.controller.lost', function(event) {
    console.log(event.detail);
    controleConect = true;
    $('#maneteOff').css('display','block');
     $('#textController').css('display','block');
}, false);

window.addEventListener('gc.button.press', function(event) {
    var button = event.detail;
    if (button.pressed) {
        if (caixaRecorde.style.display === ''){
            if (button.name == "START") {
                if (inicio % 2 === 0 || inicio == 0) {
                    if (count === 0) {
                        playGame()
                    }
                }
            }

            if (button.name == "FACE_2") {
                if (count === 0) {
                    if (inicio % 2 === 1) {
                        closeGame();
                    }
                }
            }

            if (button.name == "FACE_1") {
                if (count === 0) {
                    if (inicio % 2 === 1) {
                        playGame();
                    }
                }
            }
        }
    }
}, false);


