import { Link } from 'react-scroll';

export const Navigation = () => {
  return(
    <div>
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 w-full text-white shadow-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-end gap-8 px-8 py-4">
          <Link
            to="home"
            smooth={true}
            duration={600}
            className="cursor-pointer hover:text-pink-400"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={600}
            className="cursor-pointer hover:text-pink-400"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={600}
            className="cursor-pointer hover:text-pink-400"
          >
            Projects
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={600}
            className="cursor-pointer hover:text-pink-400"
          >
            Contact
          </Link>
        </div>
      </nav>
    </div>
  )
}