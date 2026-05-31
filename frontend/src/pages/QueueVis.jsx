import { useState } from 'react'

const QueueVis = () => {
  const [queue, setQueue] = useState([10, 20, 30])
  const [valueInput, setValueInput] = useState('')
  const [frontValue, setFrontValue] = useState(null)

  const handleEnqueue = () => {
    let val = parseInt(valueInput)
    if (!isNaN(val)) {
      setQueue([...queue, val])
    }
  }

  const handleDequeue = () => {
    if (queue.length > 0) {
      let dequeued = queue[0]
      setQueue(queue.slice(1))
      setFrontValue(dequeued)
      setTimeout(() => setFrontValue(null), 2000)
    }
  }

  const handleFront = () => {
    if (queue.length > 0) {
      setFrontValue(queue[0])
      setTimeout(() => setFrontValue(null), 2000)
    }
  }

  return (
    <div className="vis-page">
      <h1>Queue Visualization</h1>
      <p className="vis-description">
        Queue is a linear data structure which follows FIFO (First In First Out) principle.
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
          <button className="btn-success" onClick={handleEnqueue}>
            Enqueue
          </button>
          <button className="btn-danger" onClick={handleDequeue}>
            Dequeue
          </button>
          <button className="btn-primary" onClick={handleFront}>
            Front
          </button>
        </div>
        {frontValue !== null && <p style={{ marginTop: '10px', color: 'var(--primary-color)' }}>Front: {frontValue}</p>}
      </div>

      <div className="visualization">
        <div className="queue-visualization">
          {queue.map((value, idx) => (
            <div key={idx} className="queue-item">
              {value}
            </div>
          ))}
          {queue.length === 0 && <p style={{ color: 'var(--secondary-color)' }}>Empty queue</p>}
        </div>
      </div>

      <div className="info-section">
        <div className="complexity-info">
          <div className="complexity-card">
            <h4>Enqueue</h4>
            <p>O(1)</p>
          </div>
          <div className="complexity-card">
            <h4>Dequeue</h4>
            <p>O(1)</p>
          </div>
          <div className="complexity-card">
            <h4>Front</h4>
            <p>O(1)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueVis
