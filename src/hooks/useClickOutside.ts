import { onMounted, onUnmounted, Ref, ref } from "vue"
const useClickOutside = (theRef: Ref<null | HTMLElement>) => {
  let isClickOutSide = ref(false)
  const handler = (e: MouseEvent) => {
    if (theRef.value) {
      if (theRef.value.contains(e.target as HTMLElement)) {
        isClickOutSide.value = false
      }
      else {
        isClickOutSide.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutSide
}

export default useClickOutside