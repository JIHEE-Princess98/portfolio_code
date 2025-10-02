import './styles/App.css'
import SpaceBackground from './components/SpaceBackground.jsx';
import { Navigation } from './components/Navigation.jsx';
import { Hero } from './pages/Hero.jsx';
import { AboutMe } from './pages/about/AboutMe.jsx';
import { Projects } from './pages/project/Projects.jsx';
import { Contact } from './pages/connect/Contact.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { FloatButton } from 'antd';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <CustomCursor />
      <Navigation/>
      <Hero/>
      <AboutMe/>
      <Projects/>
      <Contact/>
      <FloatButton.BackTop />
      {/* 배경 */}
      <div className="fixed inset-0 -z-10">
        <SpaceBackground className="h-screen w-screen" />
      </div>
    </div>

  )
}

export default App
