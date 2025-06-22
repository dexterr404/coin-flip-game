        playerMove = '';
        result = '';
        win = 0;
        lose = 0;

        document.querySelector('.button1').addEventListener('click', () => {
            randomNumber = Math.random();
            correctGuess = '';
            playerMove='Heads';
            processGame();
        });

        document.querySelector('.button2').addEventListener('click', () => {
            randomNumber = Math.random();
            correctGuess = '';
            playerMove='Tails';
            processGame();
        });

        function displayResult(){
            if(result==='Correct'){
                document.getElementById('result').innerText = result;
                win += 1;
                document.getElementById('win').innerText = win;
            }
            else if(result==='Wrong'){
                document.getElementById('result').innerText = result;
                document.getElementById('message').innerText = `The correct answer is ${correctGuess}`;
                lose += 1;
                document.getElementById('lose').innerText = lose;
            }
            
        }
        function refreshMessage(){
            document.getElementById('message').innerText = '';
        }
        function generateAndCheckGuess(){
            randomNumber >=0 && randomNumber<1/2 ? correctGuess='Heads' : correctGuess='Tails';
            playerMove === correctGuess ? result = 'Correct' : result = 'Wrong';
        }

        function restrictButtonSpam(){
            const button1 = document.getElementById('button1');
            const button2 = document.getElementById('button2');

            button1.disabled = true;
            button2.disabled = true;
            button1.style.backgroundColor = 'rgb(119, 79, 5)';
            button2.style.backgroundColor = 'rgb(119, 79, 5)';
        }

        function resetButton(){
            const button1 = document.getElementById('button1');
            const button2 = document.getElementById('button2');

            button1.disabled = false;
            button2.disabled = false;
            button1.style.backgroundColor = 'yellow';
            button2.style.backgroundColor = 'yellow';
        }

        function showTossAnimation() {
        return new Promise((resolve) => {
            const toss = document.getElementById('toss-animation');
            restrictButtonSpam();
            toss.style.display = 'block';
            playTossSound();
            toss.play();
            document.getElementById('button')
            setTimeout(() => {
            resolve();
            }, 1000); 
        });
        }

        function hideTossAnimation(){
            document.getElementById('toss-animation').style.display = 'none';
        }

        function resetMessage(){
            document.getElementById('result').innerText = '';
            document.getElementById('message').innerText = '';
        }

        function playTossSound(){
            const tossAudio = document.getElementById('toss-sound');
            tossAudio.currentTime = 0;
            tossAudio.play();
        }

        function mainAlgorithm(){
            return new Promise((resolve) =>{
                refreshMessage();
                generateAndCheckGuess();
                displayResult();
                document.getElementById('toss-animation').stop();
                setTimeout(() => {
                resolve();
                }, 2000);
            });
        }

        async function processGame(){
            document.getElementById('toss-animation').play();
            await showTossAnimation();
            await mainAlgorithm();
            hideTossAnimation();
            resetMessage();
            resetButton();
        }
