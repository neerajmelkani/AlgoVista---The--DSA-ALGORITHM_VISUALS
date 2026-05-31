import { NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const Sidebar = () => {
  const { toggleTheme } = useTheme()

  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <span>📊</span>
          AlgoVista
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Data Structures</div>
          <NavLink to="/array" className="nav-link">Array</NavLink>
          <NavLink to="/linked-list" className="nav-link">Linked List</NavLink>
          <NavLink to="/stack" className="nav-link">Stack</NavLink>
          <NavLink to="/queue" className="nav-link">Queue</NavLink>
          <NavLink to="/bst" className="nav-link">Binary Search Tree</NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Sorting</div>
          <NavLink to="/bubble-sort" className="nav-link">Bubble Sort</NavLink>
          <NavLink to="/selection-sort" className="nav-link">Selection Sort</NavLink>
          <NavLink to="/insertion-sort" className="nav-link">Insertion Sort</NavLink>
          <NavLink to="/merge-sort" className="nav-link">Merge Sort</NavLink>
          <NavLink to="/quick-sort" className="nav-link">Quick Sort</NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Searching</div>
          <NavLink to="/binary-search" className="nav-link">Binary Search</NavLink>
        </div>
      </aside>

      <button className="theme-toggle" onClick={toggleTheme}>
        🌓
      </button>
    </>
  )
}

export default Sidebar
