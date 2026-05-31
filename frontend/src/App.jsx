import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import BubbleSort from './pages/BubbleSort'
import SelectionSort from './pages/SelectionSort'
import InsertionSort from './pages/InsertionSort'
import MergeSort from './pages/MergeSort'
import QuickSort from './pages/QuickSort'
import BinarySearch from './pages/BinarySearch'
import ArrayVis from './pages/ArrayVis'
import LinkedListVis from './pages/LinkedListVis'
import StackVis from './pages/StackVis'
import QueueVis from './pages/QueueVis'
import BSTVis from './pages/BSTVis'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bubble-sort" element={<BubbleSort />} />
              <Route path="/selection-sort" element={<SelectionSort />} />
              <Route path="/insertion-sort" element={<InsertionSort />} />
              <Route path="/merge-sort" element={<MergeSort />} />
              <Route path="/quick-sort" element={<QuickSort />} />
              <Route path="/binary-search" element={<BinarySearch />} />
              <Route path="/array" element={<ArrayVis />} />
              <Route path="/linked-list" element={<LinkedListVis />} />
              <Route path="/stack" element={<StackVis />} />
              <Route path="/queue" element={<QueueVis />} />
              <Route path="/bst" element={<BSTVis />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
