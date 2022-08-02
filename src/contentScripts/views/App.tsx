import { useRef, useState } from 'react'
import { asType } from '@wai-ri/core'
import 'virtual:windi.css'


function App() {
  const [showBtn, setShowBtn] = useState(true)
  const [resultText, setResultText] = useState('')
  const [showTranslate, setShowTranslate] = useState(false)
  const [tranlationText, setTranlationText] = useState('')
  const [topVal, setTopVal] = useState(0)
  const [leftVal, setLeftVal] = useState(0)
  const rootEl = useRef<HTMLDivElement>(null)

  document.addEventListener('pointerup', (event) => {
    asType<NonNullable<typeof rootEl.current>>(rootEl.current)

    if (event.button !== 0) return
    if (rootEl.current.contains(event.target as HTMLDivElement)) return

    const selection = document.getSelection()
    if (!selection) return
    const text = selection.toString()
    if (text === '') return setShowTranslate(false)

    setShowTranslate(true)
    setShowBtn(true)

    setTranlationText(text)
    setResultText('')

    const { clientX, clientY } = event
    setTopVal(clientY)
    setLeftVal(clientX)
  })

  function onTraslate(event: MouseEvent) {
    event.stopPropagation()
    setShowBtn(false)
    fetch(
      'https://api.66mz8.com/api/translation.php?info=' + encodeURIComponent(tranlationText),
      { mode: 'cors', method: 'POST' }
    )
      .then(res => res.json())
      .then(result => {
        if (result.code !== 200) return Promise.reject()
        setResultText(result.fanyi)
      })
      .catch(err => setResultText('翻译时出错'))
  }

  return (
    <div ref={rootEl} style={{ display: showTranslate ? 'block' : 'none' }}>
      <div className='fixed' style={{ top: `${topVal}px`, left: `${leftVal}px` }}>
        {showBtn
          ? <button onClick={onTraslate as any}>翻译</button>
          : <div className="bg-light-50 shadow-sm text-black"> {resultText || "翻译中..."} </div>
        }
      </div>
    </div>
  )
}

export default App
