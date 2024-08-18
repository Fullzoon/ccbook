import { defineStore } from "pinia"

const useBookshelfStore = defineStore('bookshelf', {
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
    // bookList: [
    //   {
    //     id: '1723983969579',
    //     name: '样例1',
    //     image: 'https://image.jpg',
    //     source: 'local', // onlion
    //   }
    // ]
  }),
  // persist: true
})

export default useBookshelfStore