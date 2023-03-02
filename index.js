/**
 * 1. render songs
 * 2. scroll top
 * 3. play / pause / seek
 * 4. CD rotate
 * 5. next / prev
 * 6. random song 
 * 7. next / repeat when ended
 * 8. active song
 * 9. Scroll active song into view
 * 10. play song when click 
 *{
      name: "Intro",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song1.mp3",
      image: "assets/img/song1.jpg",
    },
 */
// 1.41.10
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $(".player");
const heading = $("header h2");
const cdThumd = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,

  songs: [
    {
      name: "Intro",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song1.mp3",
      image: "assets/img/song1.jpg",
    },
    {
      name: "Cơn mưa xa dần",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song2.mp3",
      image: "assets/img/song2.jpg",
    },

    {
      name: "Nắng ấm ngang qua",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song3.mp3",
      image: "assets/img/song3.jpg",
    },
    {
      name: "Muộn rồi mà sao còn",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song4.mp3",
      image: "assets/img/song4.jpg",
    },
    {
      name: "Hãy trao cho anh",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song5.mp3",
      image: "assets/img/song5.jpg",
    },
    {
      name: "Em của ngày hôm qua",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song6.mp3",
      image: "assets/img/song6.jpg",
    },
    {
      name: "Âm thầm bên em",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song7.mp3",
      image: "assets/img/song7.jpg",
    },
    {
      name: "Thái Bình Mồ Hôi Rơi",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song8.mp3",
      image: "assets/img/song8.jpg",
    },
  ],

  isPlaying: false,
  isRandom: false,
  isReapeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function(key, value) { 
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  }, 
  defineProperty: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    // xử lý CD quay / dừng
    // animate https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
    const newspaperSpinning = [
      {
        transform: "rotate(360deg)",
      },
    ];
    const newspaperTiming = {
      duration: 10000, //10s
      iterations: Infinity,
    };

    const cdThumdAnimate = cdThumd.animate(newspaperSpinning, newspaperTiming);
    cdThumdAnimate.pause();

    // xử lý phóng to thu nhỏ Cd
    const cdWidth = cd.offsetWidth;
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // xử lý khi click play
    playBtn.onclick = () => {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // khi song dc play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumdAnimate.play();
    };

    // khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumdAnimate.pause();
    };

    // khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        //  const currentPercent = Math.floor(audio.currentTime / audio.duration * 100);
        const currentPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = currentPercent;
      }
    };

    // xử lý khi tua song
    // onchange sửa thành on input
    progress.oninput = function (e) {
      // this e.target.value = 40%
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRanDomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRanDomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
    };

    // random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);

      // if(this.isRandom) {
      //   randomBtn.classList.remove("active");
      //   this.isRandom = false;
      // } else {
      //   randomBtn.classList.add("active");
      //   this.isRandom = true;
      // }
    };

    // Xử lý lặp lại một bài hát
    repeatBtn.onclick = function (e) {
      _this.isReapeat = !_this.isReapeat;
      _this.setConfig('isReapeat', _this.isReapeat);
      repeatBtn.classList.toggle("active", _this.isReapeat);
    };

    // xử lý next song ->khi audio ended
    audio.onended = function () {
      if (_this.isReapeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // lắng nghe hành vi click và playlist
    playlist.onclick = function (e) {
      const songNote = e.target.closest(".song:not(.active");
      //.song:not(.active) khoong co class active
      if (songNote || e.target.closest(".option")) {
        // xử lý khi click vào song
        if (songNote) {
          _this.currentIndex = Number(songNote.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
          // songNote.getAttribute('data-index') = (songNote.dataset.index)
        }

        // xử lý khi click vào song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
       <div class="song ${
         index === this.currentIndex ? "active" : ""
       }" data-index ='${index}'>
          <div class="thumb" style="
              background-image: url('${song.image}')
            "></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `;
    });

    playlist.innerHTML = htmls.join("");
  },

  scrollToActiveSong: function () {
    setTimeout(function () {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom
    this.isReapeat = this.config.isReapeat

   },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRanDomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    // gán cấu hình từ config vào ứng dụng 
    this.loadConfig();

    // định nghĩa các thuộc tính cho object
    this.defineProperty();

    // lắng nghe / xử lý các sự kiện (dom event)
    this.handleEvents();

    // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // render
    this.render();

    // Hiện thị trạng thái ban đầu của button repeat và random 
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isReapeat);
  },
};
app.start();
