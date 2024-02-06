import { useEffect, useState } from "react";

const Timer = (props) => {
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  
  let res = JSON.parse(sessionStorage.getItem('todos')) || []
  let newArr = res.find(el => el.id === props.id)
  const [time, setTime] = useState([Number(newArr.min), Number(newArr.sec)])
  let m = time[0]
  let s = time[1]

  const tick = () => {
    if (paused || over) return
    
    if (m === 0 && s === 0) {
      setOver(true)
    } else if (s === 0) {
      setTime([m - 1, 59])
    } else {
      setTime([m, s - 1])
    }
  }


  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerID)
      props.onPauseTimer(props.id, m, s)
    }
  }, [m, s])

  const handlePause = () => {
    setPaused(true);
    props.onPauseTimer(props.id, m, s);
  };

  const handleResume = () => {
    setPaused(false);
    setTime([m, s]);
    tick();
  };



  return (
    <span className="description">
      <button className="icon icon-play" onClick={handleResume}>
      </button>
      <button className="icon icon-pause"
        onClick={handlePause}
        >
      </button>
      <br />
      {`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
    </span>
  )

}

export default Timer;
