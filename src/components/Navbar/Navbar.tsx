import Image from "next/image";

export default function Navbar() {
    return (
        <header className="border-b-[1px] xl:border-r-[1px] xl:border-b-0 border-[rgba(255,255,255,0.075)] flex flex-row xl:flex-col fixed z-50 p-[--space-xs] w-screen xl:h-screen xl:w-auto">
            <div className="border-r-[1px] xl:border-b-[1px] xl:border-r-0 border-[rgba(255,255,255,0.075)] pb-[--space-xs] pr-[--space-xs] xl:pr-0">
                {/* Logo */}
                <a href="/">
                    <Image alt="logo" src={"/logo.png"} width={42} height={42}/>
                </a>
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    {/* Top Nav Items */}
                </div>
                <div>
                    {/* Bottom Nav Items (i.e. User & Settings)*/}
                </div>
            </div>
        </header>
    )
} 