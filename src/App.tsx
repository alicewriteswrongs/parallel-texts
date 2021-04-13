import React, { useState, useEffect, useCallback } from "react"

import Document from "./Document"
import AddDocumentDialog from './AddDocumentDialog'
import { db, ParallelText, Translation } from "./db"

// @ts-ignore
window.db = db

async function getTranslationsForText(
  activeParallelText: ParallelText | undefined,
  setTranslationsForText: (t: Translation[]) => void
) {
  if (activeParallelText) {
    const translations = await db.translations
      .where({ parallelTextID: activeParallelText.id })
      .toArray()
    setTranslationsForText(translations)
  }
}

async function getParallelTexts(
  setParallelTexts: (xs: ParallelText[]) => void
) {
  const texts = await db.parallelTexts.toArray()
  setParallelTexts(texts)
}

export default function App() {
  const [textOne, setTextOne] = useState("")
  const [textTwo, setTextTwo] = useState("")

  const [parallelTexts, setParallelTexts] = useState<ParallelText[]>([])
  const [activeParallelText, setActiveParallelText] = useState<ParallelText>()

  const [translationsForText, setTranslationsForText] = useState<Translation[]>(
    []
  )

  const [showDocDialog, setShowDocDialog] = useState(false)

  useEffect(() => {
    getParallelTexts(setParallelTexts)
  }, [])

  useEffect(() => {
    getTranslationsForText(activeParallelText, setTranslationsForText)
  }, [activeParallelText, setTranslationsForText])

  const toggleDocDialog = useCallback(e => {
    e.preventDefault()
    setShowDocDialog(open => !open)
  }, [setShowDocDialog])

  console.log(parallelTexts);

  return (
    <div className="app main-page">
      <div className="noprint">
        { showDocDialog ?
        <AddDocumentDialog
          setShowDocDialog={setShowDocDialog}
        />
      : null }
        <div className="control-header">
          <select name="parallelText">
            { parallelTexts.map((parallelText) => (
              <option
                value={parallelText.id}
                onSelect={(e: React.ChangeEvent<HTMLOptionElement>) => {
                  e.preventDefault()
                  const id = e.target.value
                  const newParallelText = parallelTexts.find(
                    (parallelText) => parallelText.id === Number(id)
                  )
                  setActiveParallelText(newParallelText)
                }}
              >
                {parallelText.title}
              </option>
            ))}
          </select>
          <button onClick={toggleDocDialog}>
            Add a new document
          </button>
        </div>
        <div className="document">
          <div className="inputs">
            <div className="col">
              <span className="label">Text One</span>
              <textarea
                className="text-one"
                onChange={(e) => {
                  setTextOne(e.target.value)
                }}
              />
            </div>
            <div className="col">
              <span className="label">Text Two</span>
              <textarea
                className="text-two"
                onChange={(e) => {
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
    </div>
  )
}
