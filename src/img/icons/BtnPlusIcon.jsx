import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BtnPlusIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12} // Adjusted for a plus icon to be more square
      viewBox="0 0 12 12" // Added to ensure the SVG scales correctly
      fill="none"
      {...props}
    >
      <Path
        fill="#ED7635"
        d="M11 5H7V1a1 1 0 1 0-2 0v4H1a1 1 0 0 0 0 2h4v4a1 1 0 1 0 2 0V7h4a1 1 0 0 0 0-2z"
      />
    </Svg>
  )
}

export default BtnPlusIcon;
