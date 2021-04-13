import React, { useCallback, useState } from "react"

type Props = {
  inputs: Array<[string, string]>
  closeDialog: (e: React.SyntheticEvent<HTMLDivElement>) => void
  closeAndSave: (inputs: Object) => void
  className: string
  title: string
}

export default function Dialog (props: Props) {
  return ( <div>foo</div> )
  const { inputs, closeDialog, closeAndSave, className, title } = props

  const [inputState, updateInputState] = useState({})

  const onChange = useCallback(e => {
    const { name, value } = e.target
    const newInputState = {
      ...inputState,
      [name]: value
    }
    updateInputState(newInputState)
  }, [inputState, updateInputState])

  const wrappedCloseAndSave = useCallback(e => {
    closeAndSave(inputState)
  }, [closeAndSave, inputState])

  return <dialog open className={`dialog ${className}`}>
    <h2>{ title }</h2>
    <div className="close-button" onClick={closeDialog}>
      X
    </div>
    <div className="form-inputs">
      { inputs ? inputs.map(([name, label]) => (
        <label>{ label }
          <input name={name} onChange={onChange} type="text" />
        </label>
      )) : null}
    </div>
    <button className="save-button" onClick={wrappedCloseAndSave}>
      Save
    </button>
  </dialog>
}
