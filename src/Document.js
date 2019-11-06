import React from 'react';
import { zip } from 'ramda'
import { Remarkable } from "remarkable"

const md = new Remarkable()

const splitTags = string => {
  const div = document.createElement('div')
  div.innerHTML = string
  return [...div.children].map(child => child.outerHTML)
}

const MarkdownElement = ({string}) => <div
  className="pgraph"
  dangerouslySetInnerHTML={{__html: string}}
/>

export default function Document (props) {
  const { textOne, textTwo } = props

  const tags = zip(
    splitTags(md.render(textOne)),
    splitTags(md.render(textTwo))
  )

  return <div className="parallel-doc">
    {tags.map(([elOne, elTwo]) => (
      <div className="parallel-paragraph">
        <MarkdownElement string={elOne || ""} />
        <MarkdownElement string={elTwo || ""} />
      </div>
    ))}
  </div>
}

