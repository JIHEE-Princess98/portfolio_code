import { Link } from 'react-scroll';

export const Navigation = () => {
  return(
    <div>
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 w-full text-white shadow-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-end gap-8 px-8 py-4">
          {[
            { to: "home", label: "Home" },
            { to: "about", label: "About" },
            { to: "projects", label: "Projects" },
            { to: "contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={600}
              spy={true}
              offset={-80}
              activeClass="text-pink-400"
              className="cursor-pointer hover:text-pink-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}