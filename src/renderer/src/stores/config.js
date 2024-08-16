import { defineStore } from "pinia"

const useConfigStore = defineStore('userInfo', {
  state: () => ({
    title: 'Hello world ccbook'
  })
})

export default useConfigStore