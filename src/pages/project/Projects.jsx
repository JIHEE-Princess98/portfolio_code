import { Card } from 'antd';
import { motion } from 'framer-motion';
import code_img from '../../assets/images/code-img.jpg';

const { Meta } = Card;

const items = [
  {
    id: 1,
    title: 'Mobius',
    desc: 'Backend',
    img: code_img,
  },
  {
    id: 2,
    title: '모니터링 점검 시스템',
    desc: 'FullStack',
    img: code_img,
  },
  {
    id: 3,
    title: ' 인천 GIS 모니터링 서비스',
    desc: 'Backend',
    img: code_img,
  },
  {
    id: 4,
    title: '포항 GIS 스마트시티',
    desc: 'Backend',
    img: code_img,
  },
  {
    id: 5,
    title: '도장 공장 MES 생산관리 백엔드 시스템 개발',
    desc: 'Backend',
    img: code_img,
  },
  {
    id: 6,
    title: 'PRINT 프로젝트 (산업용 라벨 자동화)',
    desc: 'Backend',
    img: code_img,
  },
  {
    id: 7,
    title: '비대면 프로젝트 (조직/사용자 관리 시스템)',
    desc: 'FrontEnd',
    img: code_img,
  },
  {
    id: 8,
    title: '환경알리미',
    desc: 'FrontEnd',
    img: code_img,
  },
  {
    id: 9,
    title: '예산 스마트시티',
    desc: 'FrontEnd',
    img: code_img,
  },
  {
    id: 10,
    title: '박스수출 공장 MES',
    desc: 'FrontEnd',
    img: code_img,
  }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
export const Projects = () => {
  return (
    <div>
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-300">제가 만든 프로젝트들을 소개합니다.</p>

          <motion.div
            className="mt-5 mb-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {items.map(({ id, title, desc, img }) => (
              <motion.div
                key={id}
                variants={item}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-80"
              >
                <Card
                  hoverable
                  className="w-80"
                  cover={
                    <img
                      draggable={false}
                      alt={title}
                      src={img}
                      className="aspect-video object-cover"
                    />
                  }
                >
                  <Meta title={title} description={desc} />
                </Card>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>
    </div>
  );
};