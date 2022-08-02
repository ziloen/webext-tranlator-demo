<script setup lang="ts">
import { useEventListener, onClickOutside } from '@vueuse/core'
import { asType } from '@wai-ri/core'
import 'virtual:windi.css'

const topVal = ref(0)
const leftVal = ref(0)
const rootEl = ref<HTMLDivElement>()
const showTranslate = ref(false)
const tranlationText = ref('')
const resultText = ref('')
const showBtn = ref(true)

useEventListener(document, 'pointerup', (e) => {
  asType<NonNullable<typeof rootEl.value>>(rootEl.value)

  if (e.button !== 0) return
  if (rootEl.value.contains(e.target as HTMLDivElement)) return

  const selection = document.getSelection()
  if (!selection) return
  const text = selection.toString()
  if (text === '') return showTranslate.value = false


  showTranslate.value = true
  showBtn.value = true

  tranlationText.value = text
  resultText.value = ''



  // const rect = selection.getRangeAt(0).getBoundingClientRect()
  // console.log(rect)
  // topVal.value = rect.top
  // leftVal.value = rect.left

  const { clientX, clientY } = e
  topVal.value = clientY
  leftVal.value = clientX
})

function onTraslate(e: MouseEvent) {
  e.stopPropagation()
  showBtn.value = false
  fetch(
    'https://api.66mz8.com/api/translation.php?info=' + encodeURIComponent(tranlationText.value),
    { mode: 'cors', method: 'POST' }
  )
    .then(res => res.json())
    .then(result => {
      if (result.code !== 200) return Promise.reject()
      resultText.value = result.fanyi
    })
    .catch(e => resultText.value = '翻译时出错')
}



</script>

<template>
  <div
    v-show="showTranslate"
    ref="rootEl"
  >
    <div
      class="fixed"
      :style="{ top: `${topVal}px`, left: `${leftVal}px` }"
    >
      <button
        v-if="showBtn"
        @click.stop="onTraslate"
      >
        翻译
      </button>
      <div
        v-else
        class="bg-light-50 shadow-sm text-black"
      >
        {{ resultText || '翻译中...' }}
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>
