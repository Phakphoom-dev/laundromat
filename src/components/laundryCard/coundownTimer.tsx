import { useLaundryStore } from "@/stores/laundryStore";
import Countdown from "react-countdown";
import { CountdownTimeDelta } from "react-countdown";
import axios from "axios";

interface ICountdownTimer {
  timer: number;
  index: number;
}

export default function CountdownTimer({ timer, index }: ICountdownTimer) {
  const { endWashing } = useLaundryStore();

  const userNotification = () => {
    //TODO Just for testing purpose need to authen
    axios.post(`https://tableauportal.online/line-notify/${index + 1}`);
  };

  const renderer = ({
    minutes,
    seconds,
    completed,
  }: CountdownTimeDelta): JSX.Element => {
    // if timer is less than one minute should send notification only once
    if (minutes < 1 && seconds === 59) userNotification();

    const minuteStyle = { "--value": minutes } as React.CSSProperties;
    const secondStyle = { "--value": seconds } as React.CSSProperties;

    if (completed) {
      return <></>;
    } else {
      return (
        <span className="countdown font-mono text-2xl">
          <span style={minuteStyle}></span>:<span style={secondStyle}></span>
        </span>
      );
    }
  };

  return (
    <Countdown
      date={timer}
      renderer={renderer}
      onComplete={() => endWashing(index)}
    />
  );
}
