import { useState } from 'react'

const LinkedListVis = () => {
  const [list, setList] = useState([10, 20, 30, 40])
  const [valueInput, setValueInput] = useState('')

  const handleAddFirst = () => {
    let val = parseInt(valueInput)
    if (!isNaN(val)) {
      setList([val, ...list])
    }
  }

  const handleAddLast = () => {
    let val = parseInt(valueInput)
    if (!isNaN(val)) {
      setList([...list, val])
    }
  }

  const handleDeleteFirst = () => {
    if (list.length > 0) {
      setList(list.slice(1))
    }
  }

  const handleDeleteLast = () => {
    if (list.length > 0) {
      setList(list.slice(0, -1))
    }
  }

  return (
    <div className="vis-page">
      <h1>Linked List Visualization</h1>
      <p className="vis-description">
        Linked List is a linear data structure where elements are not stored at contiguous memory locations.
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
          <button className="btn-success" onClick={handleAddFirst}>
            Add First
          </button>
          <button className="btn-success" onClick={handleAddLast}>
            Add Last
          </button>
          <button className="btn-danger" onClick={handleDeleteFirst}>
            Delete First
          </button>
          <button className="btn-danger" onClick={handleDeleteLast}>
            Delete Last
          </button>
        </div>
      </div>

      <div className="visualization" style={{ alignItems: 'center' }}>
        <div className="linked-list-visualization">
          {list.map((value, idx) => (
            <div key={idx} className="linked-list-node">
              <div className="node-value">{value}</div>
              {idx < list.length - 1 && <div className="node-arrow">→</div>}
            </div>
          ))}
          {list.length === 0 && <p style={{ color: 'var(--secondary-color)' }}>Empty list</p>}
        </div>
      </div>

      <div className="info-section">
        <div className="complexity-info">
          <div className="complexity-card">
            <h4>Access</h4>
            <p>O(n)</p>
          </div>
          <div className="complexity-card">
            <h4>Insertion (Start/End)</h4>
            <p>O(1)</p>
          </div>
          <div className="complexity-card">
            <h4>Deletion (Start/End)</h4>
            <p>O(1)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkedListVis
