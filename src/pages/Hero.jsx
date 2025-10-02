import { Button, Image } from 'antd';
import profile from '../assets/images/profile-img.jpg';
import { Link } from 'react-scroll';
import { motion } from "framer-motion";

export const Hero = () => {

  const container = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 14, staggerChildren: 0.1 }
    }
  };
  const item = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <section
        id="home"
        className="flex flex-row items-center justify-center min-h-screen px-12 gap-12"
      >
        <Image
          width={200}
          src={profile}
          className="rounded-full object-cover"
          preview={false}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-start"
        >
          <motion.h1 variants={item} className="text-5xl font-bold mb-2">Hi,</motion.h1>

          <motion.h1 variants={item} className="text-5xl font-bold mb-2">
            I'm <span className="glow-animate text-pink-500">JIHEE</span>
          </motion.h1>

          <motion.h1 variants={item} className="text-5xl font-bold mb-6">Web developer</motion.h1>

          <motion.div variants={item} className="text-sm text-gray-400 tracking-wide">
            Front-End / Back-End
          </motion.div>

          <motion.div variants={item}>
            <Link to="contact" smooth className="hover:text-pink-100">
              <Button className="mt-5 w-37" style={{height: 40}}>
                CONTACT
              </Button>
            </Link>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
};