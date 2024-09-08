export default (rank: string, height?: number) => {

  return (
    <img
      className="inline"
      title={`${rank} league`}
      width={height ?? 60}
      alt={`${rank} league`}
      src={`/images/${rank.toLowerCase().replace(" ", "-")}.png`}
    />
  );
};
