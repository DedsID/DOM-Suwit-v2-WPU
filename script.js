function getPilihanComputer() {
  const comp = Math.random();
  if (comp < 0.34) return "gajah";
  if (comp >= 0.34 && comp < 0.67) return "orang";
  return "semut";
}

function getHasil(player, comp) {
  const kalah = "KALAH!";
  const menang = "MENANG!";

  if (player == comp) return "SERI!";
  if (player == "gajah") return comp == "orang" ? menang : kalah;
  if (player == "orang") return comp == "gajah" ? kalah : menang;
  if (player == "semut") return comp == "orang" ? kalah : menang;
}

const totalLives = 5; // Jumlah nyawa awal
const lifeContainer = document.querySelectorAll(".life");

// Membuat elemen-elemen hati dan menambahkannya ke dalam lifeContainer
lifeContainer.forEach(function (e) {
  for (let i = 0; i < totalLives; i++) {
    const heart = document.createElement("div");

    heart.classList.add("heart");
    e.appendChild(heart);
  }
});

let playerLives = totalLives; // Set jumlah nyawa awal player

function decreaseLifePlayer() {
  const lifePlayer = document.getElementById("playersLife"); // Mengambil elemen life player
  const hearts = lifePlayer.querySelectorAll(".heart"); // Mengambil hati-hati pada life player

  if (playerLives > 0) {
    playerLives--;
    console.log(`nyawa player ${playerLives}`);
    const heartIndex = playerLives; // Indeks elemen hati yang akan diubah

    if (hearts[heartIndex]) {
      hearts[heartIndex].style.backgroundColor = "transparent"; // Mengubah satu nyawa player
    }
  }
}

let compLives = totalLives; // Set jumlah nyawa awal player

function decreaseLifeComp() {
  const lifeComps = document.getElementById("compsLife"); // Mengambil elemen life player
  const hearts = lifeComps.querySelectorAll(".heart"); // Mengambil hati-hati pada life player

  if (compLives > 0) {
    compLives--;
    console.log(`nyawa komputer ${compLives}`);
    const heartIndex = compLives; // Indeks elemen hati yang akan diubah

    if (hearts[heartIndex]) {
      hearts[heartIndex].style.backgroundColor = "transparent"; // Mengubah satu nyawa player
    }
  }
}

function resetGame() {
  // Reset nilai nyawa dan tampilan hati pada player
  playerLives = totalLives;
  compLives = totalLives;

  const heartsPlayer = document.querySelectorAll(".heart");
  heartsPlayer.forEach((heart) => {
    heart.style.backgroundColor = ""; // Kembalikan warna hati
  });

  const infoHasil = document.querySelector(".info");
  infoHasil.innerHTML = "";
}

function putar() {
  const gambarComp = document.querySelector(".img-komputer");
  const gambar = ["gajah", "semut", "orang"];
  let i = 0;
  const waktuMulai = new Date().getTime();
  setInterval(function () {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval;
      return;
    }
    gambarComp.setAttribute("src", `img/${gambar[i++]}.png`);
    if (i == gambar.length) {
      i = 0;
    }
  }, 100);
}

const gameBoard = document.querySelectorAll("li img");
gameBoard.forEach(function (e) {
  e.addEventListener("click", function () {
    const pilihanComputer = getPilihanComputer();
    const pilihanPlayer = e.className;
    const hasil = getHasil(pilihanPlayer, pilihanComputer);

    const gambarPlyr = document.querySelector(".img-player");
    gambarPlyr.setAttribute("src", `img/${pilihanPlayer}.png`);

    putar();

    setTimeout(function () {
      const gambarComp = document.querySelector(".img-komputer");
      gambarComp.setAttribute("src", `img/${pilihanComputer}.png`);

      const info = document.querySelector(".info");
      info.innerHTML = hasil;

      if (hasil === "KALAH!") {
        decreaseLifePlayer();

        const lifePlayer = document.getElementById("playersLife");
        const hearts = lifePlayer.querySelectorAll(".heart");
        //mengambil element heart pada player

        hearts.forEach((heart, index) => {
          if (index < playerLives) {
            if (playerLives == 1) {
              heart.style.backgroundColor = "red";
            } else if (playerLives == 3) {
              heart.style.backgroundColor = "yellow";
            }
          }
        });

        if (playerLives === 0) {
          setTimeout(function () {
            const continueGame = confirm("Anda kalah! Ingin main lagi?");
            if (continueGame) {
              resetGame(); // Panggil fungsi resetGame() untuk mereset permainan
            }
          }, 100);
        }
      } else if (hasil === "MENANG!") {
        decreaseLifeComp();

        const lifeComp = document.getElementById("compsLife");
        const hearts = lifeComp.querySelectorAll(".heart");
        // mengambil element heart pada computer

        hearts.forEach((heart, index) => {
          if (index < compLives) {
            if (compLives < 2) {
              heart.style.backgroundColor = "red";
            } else if (compLives < 3) {
              heart.style.backgroundColor = "yellow";
            }
          }
        });

        if (compLives === 0) {
          setTimeout(function () {
            const continueGame = confirm("Anda kalah! Ingin main lagi?");
            if (continueGame) {
              resetGame(); // Panggil fungsi resetGame() untuk mereset permainan
            }
          }, 100);
        }
      }
    }, 1000);
  });
});
