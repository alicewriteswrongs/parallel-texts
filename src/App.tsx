import React, { useState, useEffect } from "react"
import Document from "./Document"
import { db, ParallelText, Translation } from './db'

// @ts-ignore
window.db = db

async function getTranslationsForText (activeParallelText: ParallelText | undefined, setTranslationsForText: (t: Translation[]) => void) {
  if (activeParallelText) {
    const translations = await db.translations.where({ parallelTextID: activeParallelText.id }).toArray()
    setTranslationsForText(translations)
  }
}

export default function App() {
  const [textOne, setTextOne] = useState("")
  const [textTwo, setTextTwo] = useState("")

  const [parallelTexts, setParallelTexts] = useState<ParallelText[]>([])
  const [activeParallelText, setActiveParallelText] = useState<ParallelText>()

  const [translationsForText, setTranslationsForText] = useState<Translation[]>([])

  useEffect(() => {
    async function fetchDataOnStartup () {
      const texts = await db.parallelTexts.toArray()
      setParallelTexts(texts)
    }
    fetchDataOnStartup()
  }, [])

  useEffect(() => {
    getTranslationsForText(activeParallelText, setTranslationsForText)
  }, [activeParallelText, setTranslationsForText]
  )

  return (
    <div className="app main-page">
      <div className="noprint">
        <div className="inputs">
          <select name="parallelText">
            {parallelTexts.map(parallelText =>
            <option
              value={parallelText.id}
              onSelect={(e: React.ChangeEvent<HTMLOptionElement> ) => {
                e.preventDefault()
                const id = e.target.value
                const newParallelText = parallelTexts.find(parallelText =>
                  parallelText.id === Number(id)
                )
                setActiveParallelText(newParallelText)
              }}
            >
              {parallelText.title}
            </option>
            )}
          </select>
          <div className="col">
            <span className="label">Text One</span>
            <textarea
              className="text-one"
              onChange={e => {
                setTextOne(e.target.value)
              }}
            />
          </div>
          <div className="col">
            <span className="label">Text Two</span>
            <textarea
              className="text-two"
              onChange={e => {
                setTextTwo(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="dynamic-preview">
          <span className="label">Preview</span>
          <Document textOne={textOne} textTwo={textTwo} />
        </div>
      </div>
      <div className="noprint help-text">
        Paste in your text, adjust till the preview looks right, then print!
      </div>
      <div className="print">
        <Document textOne={textOne} textTwo={textTwo} />
      </div>
    </div>
  )
}
