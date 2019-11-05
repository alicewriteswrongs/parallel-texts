import React from 'react';
import { zip } from 'ramda'
import { Remarkable } from "remarkable"

const md = new Remarkable()

const getParagraphs = string => string.split('\n').filter(paragraph => paragraph !== "")

const MarkdownElement = ({string}) => <div
  className="pgraph"
  dangerouslySetInnerHTML={{__html: md.render(string)}}
/>

export default function Document (props) {
  const { textOne, textTwo } = props

  const paragraphs = zip(
    getParagraphs(textOne),
    getParagraphs(textTwo)
  )

  return <div className="parallel-doc">
    {paragraphs.map(([elOne, elTwo]) => (
      <div className="parallel-paragraph">
        <MarkdownElement string={elOne || ""} />
        <MarkdownElement string={elTwo || ""} />
      </div>
    ))}
  </div>
}

