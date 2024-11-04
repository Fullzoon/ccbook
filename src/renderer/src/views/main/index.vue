<template>
  <div class="main">
    <div class="head-bar">
      <div class="bookshelf"></div>
      <div class="tool-box">
        <label class="tool" for="add-input" title="添加">
          <PlusOutlined />
          <input
            id="add-input"
            style="display:none;"
            type="file"
            accept=".txt"
            @change="handleAddBook" />
        </label>
      </div>
    </div>
    <div class="book-list">
      <div
        class="book"
        v-for="(book, index) in bookStore.bookList"
        @click="handleOpenBook(book)"
        @contextmenu="handleOpenMenu(book, index)"
        :key="book.id">
        <div class="cover-image">
          <img
            class="image"
            v-if="book.image"
            :src="book.image"
            alt="" />
          <div class="no-image">
            暂无封面
          </div>
        </div>
        <div class="book-name">
          {{ book.name }}
        </div>
      </div>
      <div class="no-book" v-if="!bookStore.bookList.length">
        <a-empty description="暂无书籍" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import useBookStore from '../../stores/book'
const fs = require('fs')
const chardet = require('chardet')
const iconv = require('iconv-lite')

const router = useRouter()
const bookStore = useBookStore()
let adding = () => {}


const handleAddBook = async e => {
  const file = e.target.files[0]
  const hasBook = bookStore.bookList.some(item => {
    return item.originName === file.name.split('.')[0]
  })
  adding = message.loading('正在添加...', 0)

  if (hasBook) {
    Modal.confirm({
      title: '似乎添加过这本书了，是否继续添加？',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '添加',
      cancelText: '取消',
      content: createVNode(
        'div',
        {
          style: 'color:red;font-size: 20px;',
        },
        file.name,
      ),
      onOk() {
        funAddBook(file)
      },
      onCancel() {
        adding()
      },
      class: 'has-book',
    })
  }
  else {
    funAddBook(file)
  }

  e.target.value = ''
}
// const addBook = async e => {
//   // 文件选择器选项配置
//   const [fileHandle] = await window.showOpenFilePicker({
//     excludeAcceptAllOption: true,
//     startIn: 'desktop',
//     multiple: false,
//     types: [
//       {
//         description: "TXT文本文件",
//         accept: {
//           'text/plain': ['.txt', '.text'],
//         },
//       },
//     ]
//   })
//   console.log('fileHandle', fileHandle.getFile())
// }
const handleOpenBook = book => {
  try {
    fs.opendirSync(`./book/${book.id}`)
    book.readTime = (new Date()).getTime()
    router.push(`/book?id=${book.id}`)
  } catch (error) {
    message.error('未找到书籍')
  }
}
const handleOpenMenu = (book, index) => {
  Modal.confirm({
    title: '删除此书？',
    icon: createVNode(ExclamationCircleOutlined),
    content: book.name,
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      fs.rmdirSync(`./book/${book.id}`, {recursive: true})
      bookStore.bookList.splice(index, 1)
    },
    onCancel() {
    },
  })
}

const funMakeDir = () => {
  try {
    fs.opendirSync('./book/')
  } catch (error) {
    fs.mkdirSync('./book/')
  }
}
const funAddBook = file => {
  let encoding
  funMakeDir()
  const tmp = (new Date()).getTime()
  fs.mkdirSync(`./book/${tmp}`)

  // 文件流形式读取部分buffer来判断文件编码格式
  const stream = fs.createReadStream(file.path, { start: 0, end: 9999 })
  stream.on('data', (chunk) => {
    encoding = chardet.detect(chunk)
    // console.log('获取文件编码格式', encoding,(new Date()).getTime() - tmp)
  })
  stream.on('end', () => {
    const textBuffer = fs.readFileSync(file.path)
    // console.log('读取文件buffer', (new Date()).getTime() - tmp)
    const content = encoding === 'UTF-8' ? textBuffer : iconv.decode(textBuffer, encoding)
    // console.log('文件转编码格式', (new Date()).getTime() - tmp)
    fs.writeFileSync(`./book/${tmp}/book.txt`, content, { encoding: 'utf-8' })
    // console.log('文件写入', (new Date()).getTime() - tmp)
    bookStore.bookList.push({
      id: tmp,
      originName: file.name.split('.')[0],
      name: file.name.split('.')[0],
      image: '',
      source: 'local', // onlion
      group: '',
      createTime: tmp,
      readTime: tmp,
    })
    adding()
    message.success('添加成功🎉')
    // console.log('完成', (new Date()).getTime() - tmp)
  })
}


</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  user-select: none;
  .head-bar {
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #0000000f;
    .bookshelf {
      flex: 1;
      flex-shrink: 0;
    }
    .tool-box {
      height: 100%;
      .tool {
        display: block;
        width: 40px;
        height: 100%;
        border-left: 1px solid #0000000f;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          background-color: #F0F0F0;
        }
      }
    }
  }
  .book-list {
    position: relative;
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
        .image {
          -webkit-user-drag: none;
          width: 100%;
          height: 100%;
          object-fit: cover; 
        }
        .no-image {
          width: 100%;
          height: 100%;
          background-color: #E3EEFF;
          text-align: center;
          writing-mode: vertical-lr;
          letter-spacing: 10px;
          line-height: 120px;
          color: #666;
          font-size: 12px;
        }
      }
      .book-name {
        width: 100%;
        padding-top: 10px;
        font-size: 14px;
        text-align: center;
        color: #000;
      }
      &:hover .cover-image {
        box-shadow: 0 0px 10px rgba(0,0,0,.35);
      }
    }
    .no-book {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 100px 0;
      color: #ccc;
    }
  }
}
</style>