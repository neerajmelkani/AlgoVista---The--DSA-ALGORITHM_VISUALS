import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const modules = [
    { path: '/array', title: 'Array', desc: 'Visualize array operations' },
    { path: '/linked-list', title: 'Linked List', desc: 'Visualize linked list operations' },
    { path: '/stack', title: 'Stack', desc: 'Visualize LIFO operations' },
    { path: '/queue', title: 'Queue', desc: 'Visualize FIFO operations' },
    { path: '/bst', title: 'Binary Search Tree', desc: 'Visualize BST operations' },
    { path: '/bubble-sort', title: 'Bubble Sort', desc: 'Simple comparison sort' },
    { path: '/selection-sort', title: 'Selection Sort', desc: 'In-place comparison sort' },
    { path: '/insertion-sort', title: 'Insertion Sort', desc: 'Build sorted array one item at a time' },
    { path: '/merge-sort', title: 'Merge Sort', desc: 'Divide and conquer algorithm' },
    { path: '/quick-sort', title: 'Quick Sort', desc: 'Efficient divide and conquer' },
    { path: '/binary-search', title: 'Binary Search', desc: 'Search in sorted array' },
  ]

  return (
    <div>
      <div className="home-header">
        <h1>Welcome to AlgoVista</h1>
        <p>Interactive Data Structures and Algorithms Visualizer</p>
      </div>

      <div className="modules-grid">
        {modules.map((module, idx) => (
          <div
            key={idx}
            className="module-card"
            onClick={() => navigate(module.path)}
          >
            <h3>{module.title}</h3>
            <p>{module.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
