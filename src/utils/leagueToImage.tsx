import Image from "next/image";

export default (rank: string, height?: number) => {
  return (
    <Image
      className="inline"
      title={`${rank}`}
      width={height ?? 60}
      alt={`${rank}`}
      src={`/${rank.toLowerCase().replace(" ", "-")}.png`}
      height={height ?? 60}
    />
  );
};
