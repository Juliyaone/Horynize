import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const ConnectionIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={190}
    height={190}
    fill="none"
    {...props}
  >
    <Path
      fill="#DDD"
      d="M190 95c0 52.467-42.533 95-95 95S0 147.467 0 95 42.533 0 95 0s95 42.533 95 95ZM14.25 95c0 44.597 36.153 80.75 80.75 80.75s80.75-36.153 80.75-80.75S139.597 14.25 95 14.25 14.25 50.403 14.25 95Z"
    />
    <Circle cx={95} cy={76} r={4} fill="#DDD" />
    <Circle cx={95} cy={95} r={4} fill="#DDD" />
    <Circle cx={95} cy={114} r={4} fill="#DDD" />
    <Path fill="#DDD" d="M94 82h2v7h-2zM94 101h2v7h-2z" />
    <Circle
      cx={111.536}
      cy={85.5}
      r={4}
      fill="#DDD"
      transform="rotate(60 111.536 85.5)"
    />
    <Circle
      cx={78.627}
      cy={104.5}
      r={4}
      fill="#DDD"
      transform="rotate(60 78.627 104.5)"
    />
    <Path
      fill="#DDD"
      d="m105.84 87.634 1 1.732-6.062 3.5-1-1.732zM89.385 97.134l1 1.732-6.062 3.5-1-1.732z"
    />
    <Circle
      cx={111.373}
      cy={104.5}
      r={4}
      fill="#DDD"
      transform="rotate(120 111.373 104.5)"
    />
    <Circle
      cx={78.464}
      cy={85.5}
      r={4}
      fill="#DDD"
      transform="rotate(120 78.464 85.5)"
    />
    <Path
      fill="#DDD"
      d="m106.677 100.634-1 1.732-6.062-3.5 1-1.732zM90.223 91.134l-1 1.732-6.063-3.5 1-1.732z"
    />
  </Svg>
)
export default ConnectionIcon;
