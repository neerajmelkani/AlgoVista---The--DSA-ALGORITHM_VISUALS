import { useState } from 'react'

const ArrayVis = () => {
  const [array, setArray] = useState([10, 20, 30, 40, 50])
  const [inputValue, setInputValue] = useState('10, 20, 30, 40, 50')
  const [indexInput, setIndexInput] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleUpdate = () => {
    const newArr = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (newArr.length > 0) {
      setArray(newArr)
    }
  }

  const handleInsert = () => {
    let idx = parseInt(indexInput)
    let val = parseInt(valueInput)
    if (!isNaN(idx) && !isNaN(val)) {
      if (idx < 0) idx = 0
      if (idx > array.length) idx = array.length
      let newArr = [...array]
      newArr.splice(idx, 0, val)
      setArray(newArr)
    }
  }

  const handleDelete = () => {
    let idx = parseInt(indexInput)
    if (!isNaN(idx) && idx >= 0 && idx < array.length) {
      let newArr = [...array]
      newArr.splice(idx, 1)
      setArray(newArr)
    }
  }

  const handleGet = () => {
    let idx = parseInt(indexInput)
    if (!isNaN(idx) && idx >= 0 && idx < array.length) {
      setSelectedIndex(idx)
      setTimeout(() => setSelectedIndex(-1), 2000)
    }
  }

  return (
    <div className="vis-page">
      <h1>Array Visualization</h1>
      <p className="vis-description">
        Array is a collection of elements stored at contiguous memory locations.
      </p>

      <div className="controls">
        <div className="control-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter array elements"
          />
          <button className="btn-primary" onClick={handleUpdate}>
            Update Array
          </button>
        </div>
        <div className="control-row">
          <input
            type="text"
            value={indexInput}
            onChange={(e) => setIndexInput(e.target.value)}
            placeholder="Index"
            style={{ width: '100px' }}
          />
          <input
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Value"
            style={{ width: '100px' }}
          />
          <button className="btn-success" onClick={handleInsert}>
            Insert
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn-primary" onClick={handleGet}>
            Get
          </button>
        </div>
      </div>

      <div className="visualization">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`array-bar ${idx === selectedIndex ? 'sorted' : ''}`}
            style={{ height: '100px', width: '70px' }}
          >
            <div>{value}</div>
            <div style={{ fontSize: '10px', marginTop: '5px' }}>[{idx}]</div>
          </div>
        ))}
      </div>

      <div className="info-section">
        <div className="complexity-info">
          <div className="complexity-card">
            <h4>Access Time</h4>
            <p>O(1)</p>
          </div>
          <div className="complexity-card">
            <h4>Insertion</h4>
            <p>O(n)</p>
          </div>
          <div className="complexity-card">
            <h4>Deletion</h4>
            <p>O(n)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArrayVis
