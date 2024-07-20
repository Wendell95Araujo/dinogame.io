const firebaseConfig = {
  apiKey: "AIzaSyB7sVjddrHRZIhQN5o_sbHOfXK7BR4ab9I",
  authDomain: "dino-dancer.firebaseapp.com",
  databaseURL: "https://dino-dancer-default-rtdb.firebaseio.com",
  projectId: "dino-dancer",
  storageBucket: "dino-dancer.appspot.com",
  messagingSenderId: "319939450037",
  appId: "1:319939450037:web:d1ff54ba065a8db7e11afc",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function salvaNovoPontuador() {
  var nomePontuador = $("#pontuadorInput").val();
  if (nomePontuador === "") {
    alert("Insira seu nome");
  } else {
    var novoPonto = parseInt($("#ponto3").text());
    var scoresRef = database.ref("leaderboard/scores");

    scoresRef.once("value", function (snapshot) {
      var scores = snapshot.val();
      var scoresArray = [];

      if (scores) {
        for (var key in scores) {
          if (scores.hasOwnProperty(key)) {
            scoresArray.push({
              key: key,
              name: scores[key].name,
              score: scores[key].score,
            });
          }
        }
      }

      if (
        scoresArray.length < 20 ||
        novoPonto > scoresArray[scoresArray.length - 1].score
      ) {
        scoresArray.push({ key: null, name: nomePontuador, score: novoPonto });
      }

      scoresArray.sort(function (a, b) {
        return b.score - a.score;
      });

      if (scoresArray.length > 20) {
        scoresArray.length = 20;
      }

      var updates = {};
      for (var i = 0; i < scoresArray.length; i++) {
        updates[(i + 1).toString()] = {
          name: scoresArray[i].name,
          score: scoresArray[i].score,
        };
      }

      scoresRef
        .update(updates)
        .then(function () {
          $(".inputPontuador").hide();
          loadTopScores();
        })
        .catch(function (error) {
          console.error("Erro ao salvar pontuador: ", error);
        });
    });
  }
}

function loadTopScores() {
  var scoresRef = database.ref("leaderboard/scores");
  scoresRef
    .once("value")
    .then(function (snapshot) {
      var topScores = [];

      snapshot.forEach(function (childSnapshot) {
        var scoreData = childSnapshot.val();
        topScores.push(scoreData);
      });

      topScores.sort(function (a, b) {
        return b.score - a.score;
      });

      while (topScores.length < 20) {
        topScores.push({ name: "-", score: "-" });
      }

      var topScoresContainer = $("#top-scores");
      var topScoresContainerMax = $("#top-scores-max");
      topScoresContainer.empty();
      topScoresContainerMax.empty();

      topScores.forEach(function (score, index) {
        if (index < 3) {
          topScoresContainer.append(
            `<div class="linhaTabel">
                <p class="pontuacoes position" unselectable="on">${
                  index + 1
                }º</p>
                <p class="pontuacoes name" unselectable="on">${score.name}</p>
                <p class="pontuacoes score" unselectable="on">${score.score}</p>
              </div>`
          );
        }

        topScoresContainerMax.append(
          `<div class="linhaTabel">
              <p class="pontuacoes position" unselectable="on">${(index + 1)
                .toString()
                .padStart(2, "0")}º</p>
              <p class="pontuacoes name" unselectable="on">${score.name}</p>
              <p class="pontuacoes score" unselectable="on">${score.score}</p>
            </div>`
        );
      });

      $("#load").fadeOut(500);
    })
    .catch(function (error) {
      console.error("Erro ao carregar pontuações: ", error);
    });
}
