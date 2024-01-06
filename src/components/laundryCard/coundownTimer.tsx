import { useLaundryStore } from "@/stores/laundryStore";
import Countdown from "react-countdown";
import { CountdownTimeDelta } from "react-countdown";

interface ICountdownTimer {
  timer: number;
  index: number;
}

export default function CountdownTimer({ timer, index }: ICountdownTimer) {
  const { endWashing } = useLaundryStore();

  const renderer = ({
    minutes,
    seconds,
    completed,
  }: CountdownTimeDelta): JSX.Element => {
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
