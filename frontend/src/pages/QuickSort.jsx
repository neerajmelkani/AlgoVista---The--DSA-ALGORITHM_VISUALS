import { useState, useRef } from 'react'

const QuickSort = () => {
  const [array, setArray] = useState([10, 7, 8, 9, 1, 5])
  const [inputValue, setInputValue] = useState('10, 7, 8, 9, 1, 5')
  const [speed, setSpeed] = useState(500)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sortedIndices, setSortedIndices] = useState([])
  const [pivotIndex, setPivotIndex] = useState(-1)

  const pauseRef = useRef(false)
  const stopRef = useRef(false)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const quickSort = async (arr, low, high) => {
    if (low < high && !stopRef.current) {
      let pi = await partition(arr, low, high)
      await quickSort(arr, low, pi - 1)
      await quickSort(arr, pi + 1, high)
    }
  }

  const partition = async (arr, low, high) => {
    let pivot = arr[high]
    setPivotIndex(high)
    let i = low - 1

    for (let j = low; j < high; j++) {
      while (pauseRef.current) {
        await sleep(100)
        if (stopRef.current) return i + 1
      }
      if (stopRef.current) return i + 1

      if (arr[j] < pivot) {
        i++
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        setArray([...arr])
        await sleep(speed)
      }
    }
    let temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    setArray([...arr])
    await sleep(speed)
    setPivotIndex(-1)
    return i + 1
  }

  const startSort = async () => {
    setIsSorting(true)
    pauseRef.current = false
    stopRef.current = false
    let arr = [...array]
    await quickSort(arr, 0, arr.length - 1)
    if (!stopRef.current) {
      setSortedIndices([...Array(arr.length).keys()])
    }
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
    setSortedIndices([])
    setPivotIndex(-1)
    handleInputChange()
  }

  const handleInputChange = () => {
    const newArr = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (newArr.length > 0) {
      setArray(newArr)
    }
  }

  const code = `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi-1);
            quickSort(arr, pi+1, high);
        }
    }
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low-1);
        for (int j=low; j<high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;
        return i+1;
    }
}`

  return (
    <div className="vis-page">
      <h1>Quick Sort</h1>
      <p className="vis-description">
        Quick Sort is a divide and conquer algorithm that selects a pivot element and partitions the array around the pivot.
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
          <button className="btn-success" onClick={startSort} disabled={isSorting}>
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
              sortedIndices.includes(idx)
                ? 'sorted'
                : idx === pivotIndex
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
            <p>O(n log n)</p>
          </div>
          <div className="complexity-card">
            <h4>Space Complexity</h4>
            <p>O(log n)</p>
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

export default QuickSort
