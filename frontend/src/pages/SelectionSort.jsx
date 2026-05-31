import { useState, useRef } from 'react'

const SelectionSort = () => {
  const [array, setArray] = useState([64, 25, 12, 22, 11])
  const [inputValue, setInputValue] = useState('64, 25, 12, 22, 11')
  const [speed, setSpeed] = useState(500)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [comparingIndices, setComparingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [minIndex, setMinIndex] = useState(-1)

  const pauseRef = useRef(false)
  const stopRef = useRef(false)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const selectionSort = async () => {
    setIsSorting(true)
    pauseRef.current = false
    stopRef.current = false
    let arr = [...array]
    let n = arr.length
    let newSorted = []

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      setMinIndex(minIdx)
      for (let j = i + 1; j < n; j++) {
        while (pauseRef.current) {
          await sleep(100)
          if (stopRef.current) return
        }
        if (stopRef.current) return

        setComparingIndices([j, minIdx])
        await sleep(speed)
        if (arr[j] < arr[minIdx]) {
          minIdx = j
          setMinIndex(minIdx)
        }
        setComparingIndices([])
      }
      let temp = arr[minIdx]
      arr[minIdx] = arr[i]
      arr[i] = temp
      setArray([...arr])
      newSorted.push(i)
      setSortedIndices([...newSorted])
      await sleep(speed)
    }
    setSortedIndices([...Array(n).keys()])
    setMinIndex(-1)
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
    setMinIndex(-1)
    handleInputChange()
  }

  const handleInputChange = () => {
    const newArr = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (newArr.length > 0) {
      setArray(newArr)
    }
  }

  const code = `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            int min_idx = i;
            for (int j = i+1; j < n; j++)
                if (arr[j] < arr[min_idx])
                    min_idx = j;
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }
}`

  return (
    <div className="vis-page">
      <h1>Selection Sort</h1>
      <p className="vis-description">
        Selection Sort is an in-place comparison sorting algorithm that divides the input list into a sorted and an unsorted region.
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
          <button className="btn-success" onClick={selectionSort} disabled={isSorting}>
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
                : idx === minIndex
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

export default SelectionSort
