import { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="32" cy="32" r="32" className="fill-blue-100" />
      <path
        d="M44 20H20v24h24V20z"
        className="fill-blue-500"
        fillOpacity={0.4}
      />
      <path
        d="M32 16L16 32l16 16 16-16L32 16z"
        className="fill-blue-600"
        fillOpacity={0.8}
      />
      <circle cx="32" cy="32" r="8" className="fill-white" />
      <circle cx="32" cy="32" r="4" className="fill-blue-500" />
    </svg>
  );
}