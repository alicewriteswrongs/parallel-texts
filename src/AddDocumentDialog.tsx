import React, { useState, useCallback } from "react"
import { db, ParallelText } from "./db"
import Dialog from './Dialog'

type Props = {
  setShowDocDialog: (bool: boolean) => void
}

export default function AddDocumentDialog(props: Props) {
  const { setShowDocDialog} = props

  // const closeDialog = useCallback((e: MouseEvent<HTMLDivElement>): void => {
  const closeDialog = useCallback((e: MouseEvent): void => {
    e.preventDefault()
    setShowDocDialog(false)
  }, [setShowDocDialog])

  const closeAndSave = useCallback(inputs => {
    async function saveNewText () {
      await db.parallelTexts.add(inputs)
      setShowDocDialog(false)
    }
    saveNewText()
  }, [
    setShowDocDialog
  ])

  return (
    <Dialog
      className="doc-dialog"
      inputs={[["title", "Title"]]}
      closeDialog={closeDialog}
      closeAndSave={closeAndSave}
      title="Add a new text"
    />
  )
}
