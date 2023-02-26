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

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {

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
    }
  ],

  handleEvents: () => {
    const cd = $('.cd')
    const cdWidth = cd.offsetWidth

    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
    }
  }, 
  
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
       <div class="song">
          <div class="thumb" style="
              background-image: url('${song.image}');
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

    $('.playlist').innerHTML = htmls.join('')
  }, 

  start: function () {
    this.handleEvents()
    this.render()
  },
};

app.start();
