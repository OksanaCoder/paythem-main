/* eslint-disable */
import React from 'react';

const RouletteGame = ({ colorScheme }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -40 535 535">
    <defs>
      <linearGradient id="a" x1="50%" x2="50%" y1=".166%" y2="100%">
        <stop offset="0%" stopColor="#FFF"></stop>
        <stop offset="100%" stopColor="#FFF" stopOpacity="0"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g transform="rotate(150 291.546 281.517)">
        <circle
          cx="305.429"
          cy="305.429"
          r="305.429"
          stroke={`${colorScheme.bg_wheel}`}
          strokeOpacity="0.5"
          strokeWidth="4"
          opacity="0.1"
        ></circle>
        <circle cx="304.93" cy="305.928" r="267.001" fill="#FFF"></circle>
        <circle
          cx="304.93"
          cy="305.928"
          r="267.001"
          fill={`${colorScheme.bg_wheel}`}
          opacity="0.15"
        ></circle>
        <circle cx="304.431" cy="305.429" r="242.547" fill={`${colorScheme.bg_wheel}`}></circle>
        <circle
          cx="304.431"
          cy="305.429"
          r="242.547"
          fill="url(#a)"
          opacity="0.4"
          transform="rotate(-105 304.431 305.43)"
        ></circle>
        <path
          fill="#FFF"
          d="M303.433 37.929H305.429V571.9309999999999H303.433z"
          opacity="0.2"
        ></path>
        <path
          fill="#FFF"
          d="M303.433 37.929H305.429V571.9309999999999H303.433z"
          opacity="0.2"
          transform="rotate(60 304.431 304.93)"
        ></path>
        <path
          fill="#FFF"
          d="M303.433 37.929H305.429V571.9309999999999H303.433z"
          opacity="0.2"
          transform="rotate(120 304.431 304.93)"
        ></path>
        <text
          fill={`${colorScheme.text_wheel}`}
          fontFamily="OpenSans-ExtraBold, Open Sans"
          fontSize="16"
          fontWeight="600"
          transform="rotate(-150 213.6 463.99)"
        >
          <tspan x="196.64" y="458.989">
            2511%{' '}
          </tspan>
          <tspan x="177.054" y="480.989">
            Discount
          </tspan>
        </text>
        <text
          fill={`${colorScheme.text_wheel}`}
          fontFamily="OpenSans-ExtraBold, Open Sans"
          fontSize="16"
          fontWeight="600"
          transform="rotate(30 393.426 152.522)"
        >
          <tspan x="376.466" y="147.522">
            25%{' '}
          </tspan>
          <tspan x="356.88" y="169.522">
            Discount
          </tspan>
        </text>
        <text
          fill={`${colorScheme.text_wheel}`}
          fontFamily="OpenSans-ExtraBold, Open Sans"
          fontSize="16"
          fontWeight="600"
          transform="rotate(-90 123.769 306.427)"
        >
          <tspan x="106.808" y="301.427">
            2533%{' '}
          </tspan>
          <tspan x="87.222" y="323.427">
            Discount
          </tspan>
        </text>
        <text
          fill={`${colorScheme.text_wheel}`}
          fontFamily="OpenSans-ExtraBold, Open Sans"
          fontSize="16"
          fontWeight="600"
          transform="rotate(150 212.411 152.894)"
        >
          <tspan x="195.45" y="147.894">
            25%{' '}
          </tspan>
          <tspan x="175.864" y="169.894">
            Discount
          </tspan>
        </text>
        <text
          fill={`${colorScheme.text_wheel}`}
          fontFamily="OpenSans-ExtraBold, Open Sans"
          fontSize="16"
          fontWeight="600"
          transform="rotate(150 393.623 462.228)"
        >
          <tspan x="376.662" y="457.228">
            2500%{' '}
          </tspan>
          <tspan x="357.076" y="479.228">
            Discount
          </tspan>
        </text>
        <text
          fill={`${colorScheme.text_wheel}`}
          fontFamily="OpenSans-ExtraBold, Open Sans"
          fontSize="16"
          fontWeight="600"
          transform="rotate(90 484.76 304.373)"
        >
          <tspan x="467.8" y="299.373">
            25%{' '}
          </tspan>
          <tspan x="448.214" y="321.373">
            Discount
          </tspan>
        </text>
        <circle cx="305.429" cy="305.429" r="119.776" fill="#fff" opacity="0.4"></circle>
        <circle cx="305.429" cy="305.429" r="79.851" fill="#FFF"></circle>
      </g>
    </g>
  </svg>
);

export default RouletteGame;
