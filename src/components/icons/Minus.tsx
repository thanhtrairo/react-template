type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const Minus = ({ width = 12, height = 5, color = "#F9F9F9" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.75C0 0.335786 0.335786 0 0.75 0L11.25 0C11.6642 0 12 0.335786 12 0.75C12 1.16421 11.6642 1.5 11.25 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75Z"
        fill={color}
      />
    </svg>
  );
};
