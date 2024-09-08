import Image from "next/image";

export default (rank: string, height?: number) => {

  return (
    <Image
      className="inline"
      title={`${rank} league`}
      width={height ?? 60}
      alt={`${rank} league`}
      src={`/images/${rank.toLowerCase().replace(" ", "-")}.png`}
      height={height ?? 60}
    />
  );
};
