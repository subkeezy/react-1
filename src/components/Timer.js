import { useEffect, useState } from "react";

const Timer = (props) => {
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [pausedValue, setPausedValue] = useState([null, null])

  const { id, min: initialMin, sec: initialSec} = props;

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
  

  const handlePause = () => {
    setPaused(true);
    setPausedValue(time)

  };

  useEffect(() => {
    let intervalId;

    clearInterval(intervalId);
    if (!paused && !over && startTimer) {
      intervalId = setInterval(tick, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [paused, over, time, startTimer]);
  
  useEffect(() => {
    return () => {
      props.onPauseTimer(id, time)
    }
  }, [time])

  useEffect(() => {
    if (props.done) {
      handlePause()
      props.onPauseTimer(id, time)
    }
  }, [props.done])

  const handleResume = () => {
    setPaused(false);
    setStartTimer(true)

    if ((paused && ![Number(initialMin), Number(initialSec)])) {
      setTime(pausedValue)
    }

  };

  return (
    <span className="description">
      <button className="icon icon-play" onClick={handleResume}></button>
      <button className="icon icon-pause" onClick={handlePause}></button>
      <br />
      {`${Number(time[0]).toString().padStart(2, '0')}:${Number(time[1]).toString().padStart(2, '0')}`}
    </span>
  );
}

export default Timer;
