export const RoundedBarMiddle = ({ x, y, width, height, fill }) => {
  const radius = height / 2;
  return (
    <path
      d={`
          M ${x + radius},${y}
          h ${width - radius}
          v ${height}
          h -${width}
          a ${radius},${radius} 0 0 1 -${radius},${-radius}
          a ${radius},${radius} 0 0 1 ${radius},${-radius}
          Z
        `}
      fill={fill}
    />
  );
};
