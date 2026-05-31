import { useState, useEffect, useRef } from 'react'

const BubbleSort = () => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [inputValue, setInputValue] = useState('64, 34, 25, 12, 22, 11, 90')
  const [speed, setSpeed] = useState(500)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [comparingIndices, setComparingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [swappingIndices, setSwappingIndices] = useState([])

  const pauseRef = useRef(false)
  const stopRef = useRef(false)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const bubbleSort = async () => {
    setIsSorting(true)
    pauseRef.current = false
    stopRef.current = false
    let arr = [...array]
    let n = arr.length
    let newSorted = []

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        while (pauseRef.current) {
          await sleep(100)
          if (stopRef.current) return
        }
        if (stopRef.current) return

        setComparingIndices([j, j + 1])
        await sleep(speed)

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1])
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          setArray([...arr])
          await sleep(speed)
          setSwappingIndices([])
        }
        setComparingIndices([])
      }
      newSorted.push(n - i - 1)
      setSortedIndices([...newSorted])
    }
    setSortedIndices([...Array(n).keys()])
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
    setSwappingIndices([])
    handleInputChange()
  }

  const handleInputChange = () => {
    const newArr = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (newArr.length > 0) {
      setArray(newArr)
    }
  }

  const code = `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++)
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
    }
}`

  return (
    <div className="vis-page">
      <h1>Bubble Sort</h1>
      <p className="vis-description">
        Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
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
          <button className="btn-success" onClick={bubbleSort} disabled={isSorting}>
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
                : swappingIndices.includes(idx)
                ? 'swapping'
                : sortedIndices.includes(idx)
                ? 'sorted'
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

export default BubbleSort
