import React from 'react';
import { motion } from 'framer-motion';
import '../Styles/MissionGoal.css';
import Community from '../icons/community.png';
import graduation from '../icons/graduation.png';
import sustainable_travel from '../icons/sustainable-travel.png';

const boxVariants = {
  hidden: { opacity: 0, transform: 'translateX(-100px)' },
  visible: { opacity: 1, transform: 'translateX(0)' },
};


function MissionGoal() {
  const animationProps = {
    variants: boxVariants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5 },
  };

  return (
    <div>
      <div className="Mission">
        <h1>Mission And Vision</h1>
        <div className="blocks">
          {[{
            img: Community,
            title: "Community",
            desc: "Our Rotary Club is built  on the strength of community, where unity drives meaningful change."
          }, {
            img: sustainable_travel,
            title: "Sustanibility",
            desc: "We champion sustainability through eco-friendly initiatives that protect our planet for future generations"
          }, {
            img: graduation,
            title: "Education",
            desc: "We empower br lives through education, providing access to knowledge and learning opportunities for all"
          }].map(({ img, title, desc }, index) => (
            <motion.div className="box" key={index} {...animationProps}>
              <div className="ImageBlock">
                <img src={img} alt="" width={100} height={100} style={{ margin: 10 }} />
              </div>
              <div className="ImageInfo">
                <h2>{title}</h2>
                <p>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="Goals">
        <h1>Our Goals</h1>
        <div className="blocks">
          {[
            {
              title: "Promote Community Service",
              desc: "Serve local communities through impactful, need-based projects.",
            },
            {
              title: "Empower Youth & Education",
              desc: "Support learning, mentorship, and leadership among students and young professionals.",
            },
            {
              title: "Advance Public Health",
              desc: "Organize health camps, blood donation drives, and awareness programs",
            }
          ].map(({ title, desc }, index) => (
            <motion.div className="box" key={index} {...animationProps}>
              <div className="ImageInfo1">
                <h2>{title}</h2>
                <p>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MissionGoal;
