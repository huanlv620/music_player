/**
 * 1. render songs
 * 2. scroll top
 * 3. play / pause / seek
 *{
      name: "Intro",
      singer: "Sơn Tùng MTP",
      path: "assets/music/song1.mp3",
      image: "assets/img/song1.jpg",
    },
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player')
const heading = $("header h2");
const cdThumd = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $('.btn-toggle-play')
console.log(playBtn);
console.log(player);

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

  defineProperty: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    // xử lý phóng to thu nhỏ Cd
    const cdWidth = cd.offsetWidth;
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0
      cd.style.opacity = newCdWidth / cdWidth
    }

    // xử lý khi click play
    playBtn.onclick = () => {
      if(_this.isPlaying) {
        _this.isPlaying = false
        audio.pause()
        player.classList.remove('playing')
      } else { 
        _this.isPlaying = true
        audio.play()
        player.classList.add('playing')
      }
    } 
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
       <div class="song">
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
      `
    })

    $(".playlist").innerHTML = htmls.join("")
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name
    cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  start: function () {
    // định nghĩa các thuộc tính cho object
    this.defineProperty();

    // lắng nghe / xử lý các sự kiện (dom event)
    this.handleEvents();

    // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // render
    this.render();
  },
};

app.start();
