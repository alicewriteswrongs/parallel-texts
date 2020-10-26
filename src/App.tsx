import React, { useState } from "react"
import Document from "./Document"

export default function App() {
  const [textOne, setTextOne] = useState("")
  const [textTwo, setTextTwo] = useState("")

  return (
    <div className="app main-page">
      <div className="noprint">
        <div className="inputs">
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
