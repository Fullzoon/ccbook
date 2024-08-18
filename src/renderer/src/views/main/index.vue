<template>
  <div class="main">
    <div class="book-list">
      <div
        class="book"
        v-for="(book, index) in bookList"
        :key="index">
        <div class="cover-image">
          <img class="image" :src="book.image" alt="">
        </div>
        <div class="book-name">
          {{ book.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const bookList = [
  {
    id: 0,
    name: '牧神记',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },
  {
    id: 0,
    name: '牧神记牧',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },{
    id: 0,
    name: '牧神记',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },{
    id: 0,
    name: '牧神记',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },{
    id: 0,
    name: '牧神记',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },{
    id: 0,
    name: '牧神记',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },{
    id: 0,
    name: '牧神记',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },{
    id: 0,
    name: '牧神记',
    image: 'https://s11.ax1x.com/2023/09/11/pPcz9Pg.jpg'
  },
]
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  user-select: none;
  .book-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    .book {
      width: 120px;
      flex-shrink: 0;
      margin: 20px;
      cursor: pointer;
      .cover-image {
        width: 120px;
        height: 160px;
        overflow: hidden;
        border-radius: 8px;
        transition: all ease-in-out .2s;
        &:hover {
          box-shadow: 0 0px 10px rgba(0,0,0,.35);
        }
        .image {
          -webkit-user-drag: none;
          width: 100%;
          height: 100%;
          object-fit: cover; 
        }
      }
      .book-name {
        width: 100%;
        padding-top: 10px;
        font-size: 14px;
        text-align: center;
        color: #000;
      }
    }
  }
}
</style>