import { useState } from 'react'

const StackVis = () => {
  const [stack, setStack] = useState([10, 20, 30])
  const [valueInput, setValueInput] = useState('')
  const [topValue, setTopValue] = useState(null)

  const handlePush = () => {
    let val = parseInt(valueInput)
    if (!isNaN(val)) {
      setStack([...stack, val])
    }
  }

  const handlePop = () => {
    if (stack.length > 0) {
      let popped = stack[stack.length - 1]
      setStack(stack.slice(0, -1))
      setTopValue(popped)
      setTimeout(() => setTopValue(null), 2000)
    }
  }

  const handlePeek = () => {
    if (stack.length > 0) {
      setTopValue(stack[stack.length - 1])
      setTimeout(() => setTopValue(null), 2000)
    }
  }

  return (
    <div className="vis-page">
      <h1>Stack Visualization</h1>
      <p className="vis-description">
        Stack is a linear data structure which follows LIFO (Last In First Out) principle.
      </p>

      <div className="controls">
        <div className="control-row">
          <input
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Value"
            style={{ width: '150px' }}
          />
          <button className="btn-success" onClick={handlePush}>
            Push
          </button>
          <button className="btn-danger" onClick={handlePop}>
            Pop
          </button>
          <button className="btn-primary" onClick={handlePeek}>
            Peek
          </button>
        </div>
        {topValue !== null && <p style={{ marginTop: '10px', color: 'var(--primary-color)' }}>Top: {topValue}</p>}
      </div>

      <div className="visualization">
        <div className="stack-visualization">
          {stack.slice().reverse().map((value, idx) => (
            <div key={idx} className="stack-item">
              {value}
            </div>
          ))}
          {stack.length === 0 && <p style={{ color: 'var(--secondary-color)' }}>Empty stack</p>}
        </div>
      </div>

      <div className="info-section">
        <div className="complexity-info">
          <div className="complexity-card">
            <h4>Push</h4>
            <p>O(1)</p>
          </div>
          <div className="complexity-card">
            <h4>Pop</h4>
            <p>O(1)</p>
          </div>
          <div className="complexity-card">
            <h4>Peek</h4>
            <p>O(1)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StackVis
