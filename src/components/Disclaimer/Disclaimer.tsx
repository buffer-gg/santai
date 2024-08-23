import Link from "next/link";


export default function Disclaimer() {
    return (
<span className="text-sm text-white">
          This site is not affiliated with{" "}
          <Link href="https://mountaintop.gg/" rel="noopener noreferrer" target="_blank">Mountaintop Studios</Link>.
          All imagery and data is owned by{" "}
          <Link href="https://mountaintop.gg/" rel="noopener noreferrer" target="_blank">Mountaintop Studios</Link>.
          Created by <Link href="https://discordapp.com/users/177939960597315584" rel="noopener noreferrer" target="_blank">LIMIT</Link>
        </span>
    )
}