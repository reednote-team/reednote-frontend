import { Ref, ref } from "vue"
const useScrollToTop = (theRef: Ref<null | HTMLElement>) => {
  if (theRef.value) {
    theRef.value.scrollTop = 0
  }
}

export default useScrollToTop