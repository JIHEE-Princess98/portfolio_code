import { Button, Col, Row } from 'antd';
import { RightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const AboutMe = () => {

  return(
    <div>
      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Row className="m-4 pt-5">
              <Col span={22} offset={1}>
                <motion.button className="btn-profile" variants={item}>
                  <span>Profile</span>
                  <RightOutlined />
                </motion.button>
              </Col>
            </Row>

            <Row className="m-4">
              <Col span={22} offset={1}>
                <motion.button className="btn-profile" variants={item}>
                  <span>My Skill</span>
                  <RightOutlined />
                </motion.button>
              </Col>
            </Row>

            <Row className="m-4">
              <Col span={22} offset={1}>
                <motion.button className="btn-profile" variants={item}>
                  <span>CV</span>
                  <RightOutlined />
                </motion.button>
              </Col>
            </Row>

            <motion.p className="text-gray-300 m-4 pt-5" variants={item}>
              I am a web developer <span className="text-pink-500 font-semibold">"Jihee Kim" </span> who works on both the frontend and backend. <br/>
              I value user experience and enjoy creating beautiful UIs and stable backends.
            </motion.p>

            <motion.p className="text-gray-300 m-4 pt-0" variants={item}>
              저는 프론트엔드와 백엔드 모두 다루는 웹 개발자 <span className="text-pink-500 font-semibold">"김지희"</span>입니다. <br/>
              사용자 경험을 중시하고, 멋진 UI와 안정적인 백엔드를 만드는 것을 좋아해요.
            </motion.p>


          </motion.div>
        </div>
      </section>
    </div>
  )
}