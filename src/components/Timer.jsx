import { useEffect, useState } from "react";

const Timer = (props) => {
  const [paused, setPaused] = useState(true);
  const [over, setOver] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [pausedValue, setPausedValue] = useState([null, null]);
  const [timerUpdate, setTimerUpdate] = useState(false);

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
    } else if (s === 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
  };

  const updateTimer = () => {
    const fromStorage = JSON.parse(sessionStorage.getItem('todos'));
    const idx = fromStorage.findIndex((el) => el.id === id);
    console.log(fromStorage)

    if (fromStorage[idx].date) {
      const nowDate = Date.now();
      const difference = nowDate - fromStorage[idx].date;
      const newSeconds = fromStorage[idx].sec - Math.floor(difference / 1000);

      let [m, s] = time;
      setTime([m, newSeconds]);
      setTimerUpdate(true);

    }
  };

  useEffect(() => {

    if (!paused) {
      console.log(paused)
      updateTimer();
    }
    
  }, []);

  const handlePause = () => {
    setPaused(true);
    setPausedValue(time);
  };

  const handleResume = () => {
    setPaused(false);
    console.log(paused)
    setStartTimer(true);

    if (paused && ![Number(initialMin), Number(initialSec)]) {
      setTime(pausedValue);
    }
  };


  useEffect(() => {
    let intervalId;

    if (timerUpdate) {
      intervalId = setInterval(tick, 1000);
    } else if (!paused && !over && startTimer) {
      clearInterval(intervalId);
      intervalId = setInterval(tick, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [paused, over, time, startTimer, timerUpdate]);

  useEffect(() => {
    props.onPauseTimer(id, time, paused);
  }, [time, paused]);

  useEffect(() => {
    if (props.done) {
      handlePause();
      props.onPauseTimer(id, time, paused);
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