import React, { useLayoutEffect, useRef } from "react";
import "./App.css";
import { Bird1, Bird2, Cloud1, Cloud2, Car, Road } from "./Images";
import { Grid } from "@material-ui/core";

function App() {
  const clouds = useRef(null);
  const birds = useRef(null);
  const car = useRef(null);

  useLayoutEffect(() => {
    var cloudsFrame = [
      { transform: "translateX(80%)" },
      { transform: "translateX(-70%)" },
    ];

    var cloudsTiming = {
      duration: 24000,
      iterations: Infinity,
    };

    var birdsFrame = [
      { transform: "translateX(-100%)" },
      { transform: "translateX(100%)" },
    ];

    var birdsTiming = {
      duration: 35000,
      iterations: Infinity,
    };

    var carFrame = [
      { transform: "translateX(-10%)" },
      { transform: "translateX(130%)" },
    ];

    var carTiming = {
      duration: 12000,
      iterations: Infinity,
    };

    var cloudsMovement = clouds.current.animate(cloudsFrame, cloudsTiming);
    var birdsMovement = birds.current.animate(birdsFrame, birdsTiming);
    var carMovement = car.current.animate(carFrame, carTiming);

    var background = [cloudsMovement, birdsMovement];

    var adjustBackgroundPlayback = function () {
      if (carMovement.playbackRate < 0.8) {
        background.forEach(function (anim) {
          anim.playbackRate = carMovement.playbackRate / 2;
        });
      } else if (carMovement.playbackRate > 1.2) {
        background.forEach(function (anim) {
          anim.playbackRate = carMovement.playbackRate / 1.5;
        });
      } else {
        background.forEach(function (anim) {
          anim.playbackRate = 1;
        });
      }
    };
    adjustBackgroundPlayback();

    setInterval(function () {
      if (carMovement.playbackRate > 0.4) {
        carMovement.playbackRate *= 0.9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    var goFaster = function () {
      carMovement.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    };

    window.addEventListener("click", goFaster);
    window.addEventListener("touchstart", goFaster);
  });

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <div className="wrapper">
          <div ref={clouds} className="clouds-div">
            <img src={Cloud1} id="cloud1" alt="cloud1" />
            <img src={Cloud2} id="cloud2" alt="cloud2" />
          </div>

          <div ref={birds} className="birds-div">
            <img src={Bird1} id="bird1" alt="bird1" />
            <img src={Bird2} id="bird2" alt="bird2" />
          </div>

          <div ref={car} className="car-div">
            <img src={Car} id="car" alt="car" />
          </div>

          <div className="road-div">
            <img src={Road} id="road" alt="road" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default App;