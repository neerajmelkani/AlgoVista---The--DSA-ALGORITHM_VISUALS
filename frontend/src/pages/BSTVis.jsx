import { useState } from 'react'

const BSTVis = () => {
  const [values, setValues] = useState([50, 30, 70, 20, 40, 60, 80])
  const [valueInput, setValueInput] = useState('')

  const handleInsert = () => {
    let val = parseInt(valueInput)
    if (!isNaN(val) && !values.includes(val)) {
      setValues([...values, val])
    }
  }

  const handleReset = () => {
    setValues([50, 30, 70, 20, 40, 60, 80])
  }

  return (
    <div className="vis-page">
      <h1>Binary Search Tree Visualization</h1>
      <p className="vis-description">
        Binary Search Tree is a tree data structure that allows fast lookup, addition, and removal of items.
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
          <button className="btn-success" onClick={handleInsert}>
            Insert
          </button>
          <button className="btn-danger" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="visualization">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="bst-node">50</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '300px' }}>
            <div className="bst-node">30</div>
            <div className="bst-node">70</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '400px' }}>
            <div className="bst-node">20</div>
            <div className="bst-node">40</div>
            <div className="bst-node">60</div>
            <div className="bst-node">80</div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="complexity-info">
          <div className="complexity-card">
            <h4>Insertion (Average)</h4>
            <p>O(log n)</p>
          </div>
          <div className="complexity-card">
            <h4>Deletion (Average)</h4>
            <p>O(log n)</p>
          </div>
          <div className="complexity-card">
            <h4>Search (Average)</h4>
            <p>O(log n)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BSTVis
