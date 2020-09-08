import React, { useState, useCallback } from "react"
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server';
import Document from "./Document"
import { jsPDF } from 'jspdf'

function App() {
  const [textOne, setTextOne] = useState("")
  const [textTwo, setTextTwo] = useState("")

  const createPDF = useCallback(() => {
    const printWindow = window.open("", "")
    const stylesheet = printWindow.document.createElement("style")
    stylesheet.innerText = document.head.querySelector("style").innerText
    printWindow.document.head.append(stylesheet)

    const el = printWindow.document.createElement("div")
    printWindow.document.body.append(el)
    ReactDOM.render(
      <div className="print" style={{maxWidth: "100%" }}>
        <Document
          textOne={textOne}
          textTwo={textTwo}
        />
      </div>,
      el
    )

    printWindow.print()

//     const doc = new jsPDF()

//     doc.html(el)
//     // doc.html('<p>fuck this thing</p>')
//       // callback: doc => {
//       //   doc.save("aligned.pdf")
//       // },
//       // x: 10,
//       // y: 10,
//     // })
//     doc.save("aligned.pdf")
  }, [ textOne, textTwo] )

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
        <button onClick={createPDF}>
          create
        </button>
      </div>
      <div className="print">
        <Document textOne={textOne} textTwo={textTwo} />
      </div>
    </div>
  )
}

export default App
