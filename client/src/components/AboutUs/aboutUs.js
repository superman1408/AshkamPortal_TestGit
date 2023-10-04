import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const AboutUs = () => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [Btn, setBtn] = useState(false);

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  //   var tweenFunctions = require("tween-functions");
  //   tweenFunctions.easeInQuad(1, 0, 50, 5); // => 4

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dimension]);
  return (
    <>
      <Button onClick={() => setBtn(!Btn)}>Run</Button>
      {Btn && (
        <ReactConfetti
          width={dimension.width}
          height={dimension.height}
          tweenDuration={100}
          drawShape={(shape) => {
            shape.beginPath();
            for (let i = 0; i < 25; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              shape.lineTo(x, y);
            }
            shape.stroke();
            shape.closePath();
          }}
        />
      )}
    </>
  );
};

export default AboutUs;
