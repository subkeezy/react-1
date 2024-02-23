import { useEffect, useState } from "react";

const Timer = (props) => {
  const [paused, setPaused] = useState(true);
  const [over, setOver] = useState(false);

  const { id, min: initialMin, sec: initialSec } = props;

  const [time, setTime] = useState(
    (initialMin !== undefined && initialSec !== undefined) ?
      [Number(initialMin), Number(initialSec)] :
      [0, 0]
  );

  const tick = () => {
    if (paused || over) return;

    let [m, s] = time;

    if (m === 0 && s === 0) {
      setOver(true);
      setTime([0, 0])
    } else if (s === 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
  };

  const handlePause = () => {
    setPaused(true);
    props.onTimerUnmount(id, time, paused)
  };

  const handleResume = () => {
    setPaused(false);
  };
  
  const updateTimer = () => {
    const fromStorage = JSON.parse(sessionStorage.getItem('todos'));
    const idx = fromStorage.findIndex((el) => el.id === id);
    
    if (fromStorage[idx].date) {
      const nowDate = Date.now();
      const differenceInSeconds = Math.floor((nowDate - fromStorage[idx].date) / 1000);
      let totalSeconds = fromStorage[idx].min * 60 + fromStorage[idx].sec - differenceInSeconds;
      
      if (totalSeconds < 0) {
        totalSeconds = 0;
      }
      
      const newMinutes = Math.floor(totalSeconds / 60);
      const newSeconds = totalSeconds % 60;
      
      setTime([newMinutes, newSeconds]);
    }
  };

  useEffect(() => {
    let timerId;
    const fromStorage = JSON.parse(sessionStorage.getItem('todos'));
    const idx = fromStorage.findIndex((el) => el.id === id);
    if (!fromStorage[idx].timerPaused) {
      timerId = setInterval(tick, 1000)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [tick])
  

  useEffect(() => {
    props.onTimerUnmount(id, time, paused);
  }, [id, time, paused])


  useEffect(() => {
    const fromStorage = JSON.parse(sessionStorage.getItem('todos'));
    const idx = fromStorage.findIndex((el) => el.id === id);
    setPaused(fromStorage[idx].timerPaused)

    if (!fromStorage[idx].timerPaused) {
      updateTimer();
    }
    
  }, []);

  useEffect(() => {
    if (props.done) {
      handlePause();
      props.onTimerUnmount(id, time, paused);
    }
  }, [props.done]);


  return (
    <span className="description">
      <button className="icon icon-play" onClick={handleResume}></button>
      <button className="icon icon-pause" onClick={handlePause}></button>
      <br />
      {`${Number(time[0]).toString().padStart(2, '0')}:${Number(time[1]).toString().padStart(2, '0')}`}
    </span>
  );
};

export default Timer;