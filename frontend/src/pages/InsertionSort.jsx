import { useState, useRef } from 'react'

const InsertionSort = () => {
  const [array, setArray] = useState([12, 11, 13, 5, 6])
  const [inputValue, setInputValue] = useState('12, 11, 13, 5, 6')
  const [speed, setSpeed] = useState(500)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [comparingIndices, setComparingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [keyIndex, setKeyIndex] = useState(-1)

  const pauseRef = useRef(false)
  const stopRef = useRef(false)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const insertionSort = async () => {
    setIsSorting(true)
    pauseRef.current = false
    stopRef.current = false
    let arr = [...array]
    let n = arr.length

    for (let i = 1; i < n; i++) {
      let key = arr[i]
      let j = i - 1
      setKeyIndex(i)
      setSortedIndices([...Array(i).keys()])

      while (j >= 0 && arr[j] > key) {
        while (pauseRef.current) {
          await sleep(100)
          if (stopRef.current) return
        }
        if (stopRef.current) return

        setComparingIndices([j, j + 1])
        arr[j + 1] = arr[j]
        setArray([...arr])
        await sleep(speed)
        j--
        setComparingIndices([])
      }
      arr[j + 1] = key
      setArray([...arr])
      await sleep(speed)
    }
    setSortedIndices([...Array(n).keys()])
    setKeyIndex(-1)
    setIsSorting(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
    pauseRef.current = !isPaused
  }

  const handleReset = () => {
    stopRef.current = true
    pauseRef.current = false
    setIsSorting(false)
    setIsPaused(false)
    setComparingIndices([])
    setSortedIndices([])
    setKeyIndex(-1)
    handleInputChange()
  }

  const handleInputChange = () => {
    const newArr = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (newArr.length > 0) {
      setArray(newArr)
    }
  }

  const code = `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`

  return (
    <div className="vis-page">
      <h1>Insertion Sort</h1>
      <p className="vis-description">
        Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.
      </p>

      <div className="controls">
        <div className="control-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter numbers separated by commas"
            disabled={isSorting}
          />
          <button className="btn-primary" onClick={handleInputChange} disabled={isSorting}>
            Update Array
          </button>
        </div>
        <div className="control-row">
          <button className="btn-success" onClick={insertionSort} disabled={isSorting}>
            Start
          </button>
          <button className="btn-warning" onClick={handlePause} disabled={!isSorting}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button className="btn-danger" onClick={handleReset}>
            Reset
          </button>
          <div className="speed-control">
            <label>Speed:</label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={1050 - speed}
              onChange={(e) => setSpeed(1050 - parseInt(e.target.value))}
              disabled={isSorting}
            />
          </div>
        </div>
      </div>

      <div className="visualization">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`array-bar ${
              comparingIndices.includes(idx)
                ? 'comparing'
                : sortedIndices.includes(idx)
                ? 'sorted'
                : idx === keyIndex
                ? 'swapping'
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
            <p>O(n²)</p>
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

export default InsertionSort
