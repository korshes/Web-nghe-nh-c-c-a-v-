const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music1.mp3",
    title: "Nổi gió",
    artist: "Nai My",
    imgSrc: "./music1.jpg",
  },
  {
    songSrc: "./music2.mp3",
    title: "Mưa cuốn người xa",
    artist: "Khiêm",
    imgSrc: "./music2.jpg",
  },
  {
    songSrc: "./music3.mp3",
    title: "Mùa mưa ngâu nằm cạnh",
    artist: "Khang",
    imgSrc: "./music3.jpg",
  },
  {
    songSrc: "./music4.mp3",
    title: "Tôi chỉ muốn nói",
    artist: "toai yêu emmm",
    imgSrc: "./music4.jpg",
  },
  {
    songSrc: "./music5.mp3",
    title: "Anh sẽ ôm em đến hết mùa mưa rơi",
    artist: "Bồ em (chắc vậy)",
    imgSrc: "./music5.jpg",
  },
  {
    songSrc: "./music6.mp3",
    title: "Xuân thì",
    artist: "Hết tên đặt r",
    imgSrc: "./music6.jpg",
  },
  {
    songSrc: "./music7.mp3",
    title: "Ngủ thôi, trời tắt nắng rồi",
    artist: "Nhớ ngủ sớm nghe",
    imgSrc: "./music7.jpg",
  },
  {
    songSrc: "./music8.mp3",
    title: "Chuyện những người yêu xa",
    artist: "Chúc em valentine vui vẻ nha",
    imgSrc: "./music8.jpg",
  },
  
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  index = (index + 1) % songDataBase.length; // Lặp lại từ bài đầu tiên khi hết danh sách
  loadMusic();
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  index = (index + 1) % songDataBase.length; // Lặp lại từ bài đầu tiên khi hết danh sách
  loadMusic();
  play();
});
previousButton.addEventListener("click", () => {
  index = (index - 1 + songDataBase.length) % songDataBase.length; // Lặp lại từ bài cuối cùng khi vượt quá bài đầu tiên
  loadMusic();
  play();
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
