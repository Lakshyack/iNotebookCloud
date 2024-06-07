import React, { useContext, useEffect } from 'react';
import noteContext from '../context/Notes/noteContext';

const About = () => {
  const a = useContext(noteContext);

  useEffect(() => {
    // Assuming there's an 'update' function in your context
    a.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is about {a.state.name}
    </div>
  );
};

export default About;
