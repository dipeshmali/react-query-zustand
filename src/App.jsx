import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './components/Post'

function App() {
  const [show, setShow] = useState(true)

  return (
    <>
      {/* <button onClick={() => setShow(prev => !prev)}>{show ? 'Hide Me' : 'Show Me'}</button> */}
      <h1>React Query Basic Example</h1>
      {show &&
        <div className='posts'>
          <Post />
        </div>
      }
    </>
  )
}

export default App
