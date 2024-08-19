import { defineStore } from "pinia"

const useBookStore = defineStore('book', {
  state: () => ({
    groupList: [
      {
        id: 0,
        label: '全部',
        visible: true,
        deletable: false,
      },
      // {
      //   label: '本地',
      //   visible: true,
      //   deletable: false,
      // },
      // {
      //   label: '网络',
      //   visible: true,
      //   deletable: false,
      // }
    ],
    bookList: [
      // {
      //   id: '1723983969579',
      //   originName: '样例1',
      //   name: '样例1',
      //   image: 'https://image.jpg',
      //   source: 'local', // onlion
      //   group: '',
      //   createTime: '1723983969579',
      //   readTime: '1723983969579',
      // }
    ]
  }),
  persist: true
})

export default useBookStore