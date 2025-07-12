import './App.css'
import Content from './components/Content.tsx'
import Header from './components/Header.tsx'
import HeardleContext from './context/HeardleContext.tsx'

const App = () => {

  return (
      <HeardleContext>
          <main>
              <Header />
              <Content />
          </main>
    </HeardleContext>
  )
}

export default App
