import { useState, useRef } from 'react'

const MergeSort = () => {
  const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10])
  const [inputValue, setInputValue] = useState('38, 27, 43, 3, 9, 82, 10')
  const [speed, setSpeed] = useState(500)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sortedIndices, setSortedIndices] = useState([])

  const pauseRef = useRef(false)
  const stopRef = useRef(false)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const mergeSort = async (arr, start, end) => {
    if (start >= end || stopRef.current) return
    let mid = Math.floor((start + end) / 2)
    await mergeSort(arr, start, mid)
    await mergeSort(arr, mid + 1, end)
    await merge(arr, start, mid, end)
  }

  const merge = async (arr, start, mid, end) => {
    let left = []
    let right = []
    for (let i = start; i <= mid; i++) left.push(arr[i])
    for (let i = mid + 1; i <= end; i++) right.push(arr[i])

    let i = 0, j = 0, k = start

    while (i < left.length && j < right.length) {
      while (pauseRef.current) {
        await sleep(100)
        if (stopRef.current) return
      }
      if (stopRef.current) return

      if (left[i] <= right[j]) {
        arr[k] = left[i]
        i++
      } else {
        arr[k] = right[j]
        j++
      }
      setArray([...arr])
      await sleep(speed)
      k++
    }

    while (i < left.length) {
      while (pauseRef.current) {
        await sleep(100)
        if (stopRef.current) return
      }
      if (stopRef.current) return
      arr[k] = left[i]
      setArray([...arr])
      await sleep(speed)
      i++
      k++
    }

    while (j < right.length) {
      while (pauseRef.current) {
        await sleep(100)
        if (stopRef.current) return
      }
      if (stopRef.current) return
      arr[k] = right[j]
      setArray([...arr])
      await sleep(speed)
      j++
      k++
    }
  }

  const startSort = async () => {
    setIsSorting(true)
    pauseRef.current = false
    stopRef.current = false
    let arr = [...array]
    await mergeSort(arr, 0, arr.length - 1)
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
    handleInputChange()
  }

  const handleInputChange = () => {
    const newArr = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (newArr.length > 0) {
      setArray(newArr)
    }
  }

  const code = `public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = (l + r)/2;
            mergeSort(arr, l, m);
            mergeSort(arr, m+1, r);
            merge(arr, l, m, r);
        }
    }
    public static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int L[] = new int[n1];
        int R[] = new int[n2];
        for (int i=0; i<n1; ++i)
            L[i] = arr[l + i];
        for (int j=0; j<n2; ++j)
            R[j] = arr[m + 1+ j];
        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }
}`

  return (
    <div className="vis-page">
      <h1>Merge Sort</h1>
      <p className="vis-description">
        Merge Sort is a divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
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
            className={`array-bar ${sortedIndices.includes(idx) ? 'sorted' : ''}`}
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
            <p>O(n)</p>
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

export default MergeSort
