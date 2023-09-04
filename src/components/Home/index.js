import React, { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import Robot from '../../assets/images/Robot.png';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [letterClass, setLetterClass] = useState('text-animate');
  const nameArray = "Welcome to".split("");
  const jobArray = "Study Smart Bot!".split("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLetterClass('text-animate-hover');
      setIsLoading(false); 
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <img src={Robot} alt="Robot" />
            <br />
            <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={12} />
            <br />
            <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={15} />
          </h1>
          <h2>
            Discover a unified learning hub with our Study Buddy Chat Bot and Live Chat platform designed for students.
            <br />
            <br />Experience a holistic solution that fosters connections among peers and incorporates a YouTube API linker, enabling synchronized video discussions to elevate your educational journey.
          </h2>
          <Link to="/teams" className="flat-button">GET STARTED</Link>
        </div>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <Loader type="pacman"/>
        </div>
      ) : null}
    </>
  )
}

export default Home;
