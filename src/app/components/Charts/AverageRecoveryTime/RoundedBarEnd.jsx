export const RoundedBarEnd = ({ x, y, width, height, fill }) => {
  const radius = height / 2;
  return (
    <path
      d={`
          M ${x},${y}
          h ${width - radius}
          a ${radius},${radius} 0 0 1 0,${height}
          h -${width - radius}
          a ${radius},${radius} 0 0 1 0,-${height}
          Z
        `}
      fill={fill}
    />
  );
};
