import { useState } from 'react'

const BinarySearch = () => {
  const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38, 56, 72, 91])
  const [inputValue, setInputValue] = useState('2, 5, 8, 12, 16, 23, 38, 56, 72, 91')
  const [target, setTarget] = useState('23')
  const [speed, setSpeed] = useState(1000)
  const [isSearching, setIsSearching] = useState(false)
  const [lowIndex, setLowIndex] = useState(-1)
  const [highIndex, setHighIndex] = useState(-1)
  const [midIndex, setMidIndex] = useState(-1)
  const [foundIndex, setFoundIndex] = useState(-1)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const binarySearch = async () => {
    setIsSearching(true)
    setFoundIndex(-1)
    let arr = [...array]
    let low = 0
    let high = arr.length - 1
    let t = parseInt(target)

    while (low <= high) {
      setLowIndex(low)
      setHighIndex(high)
      let mid = Math.floor((low + high) / 2)
      setMidIndex(mid)
      await sleep(speed)

      if (arr[mid] === t) {
        setFoundIndex(mid)
        setLowIndex(-1)
        setHighIndex(-1)
        setMidIndex(-1)
        setIsSearching(false)
        return
      } else if (arr[mid] < t) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    setFoundIndex(-2)
    setLowIndex(-1)
    setHighIndex(-1)
    setMidIndex(-1)
    setIsSearching(false)
  }

  const handleReset = () => {
    setIsSearching(false)
    setLowIndex(-1)
    setHighIndex(-1)
    setMidIndex(-1)
    setFoundIndex(-1)
    handleInputChange()
  }

  const handleInputChange = () => {
    const newArr = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (newArr.length > 0) {
      newArr.sort((a, b) => a - b)
      setArray(newArr)
      setInputValue(newArr.join(', '))
    }
  }

  const code = `public class BinarySearch {
    public static int binarySearch(int[] arr, int x) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low)/2;
            if (arr[mid] == x)
                return mid;
            if (arr[mid] < x)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    }
}`

  return (
    <div className="vis-page">
      <h1>Binary Search</h1>
      <p className="vis-description">
        Binary Search is a search algorithm that finds the position of a target value within a sorted array.
      </p>

      <div className="controls">
        <div className="control-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter sorted numbers"
            disabled={isSearching}
          />
          <button className="btn-primary" onClick={handleInputChange} disabled={isSearching}>
            Update Array
          </button>
        </div>
        <div className="control-row">
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target value"
            disabled={isSearching}
          />
          <button className="btn-success" onClick={binarySearch} disabled={isSearching}>
            Search
          </button>
          <button className="btn-danger" onClick={handleReset}>
            Reset
          </button>
          <div className="speed-control">
            <label>Speed:</label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={2100 - speed}
              onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
              disabled={isSearching}
            />
          </div>
        </div>
        {foundIndex === -2 && <p style={{ color: 'var(--danger-color)', marginTop: '10px' }}>Value not found</p>}
        {foundIndex >= 0 && <p style={{ color: 'var(--success-color)', marginTop: '10px' }}>Found at index {foundIndex}</p>}
      </div>

      <div className="visualization">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`array-bar ${
              idx === foundIndex
                ? 'sorted'
                : idx === midIndex
                ? 'swapping'
                : idx >= lowIndex && idx <= highIndex
                ? 'comparing'
                : ''
            }`}
            style={{ height: `${value * 3}px` }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="info-section">
        <div className="complexity-info">
          <div className="complexity-card">
            <h4>Time Complexity</h4>
            <p>O(log n)</p>
          </div>
          <div className="complexity-card">
            <h4>Space Complexity</h4>
            <p>O(1)</p>
          </div>
        </div>
        <h3>Java Code</h3>
        <div className="code-viewer">
          <pre>{code}</pre>
        </div>
      </div>
    </div>
  )
}

export default BinarySearch
