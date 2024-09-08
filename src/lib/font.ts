//👇 Import Open Sans font
import localFont from "next/font/local";
import { Bebas_Neue, Inter, Orbitron } from "next/font/google";

export const dharma = localFont({
  src: [
    {
      path: "../../public/fonts/DharmaGothicE_ExLight_R.otf",
      weight: "200",
    },
    {
      path: "../../public/fonts/DharmaGothicE_Light_R.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/DharmaGothicE_Regular_R.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/DharmaGothicE_Bold_R.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/DharmaGothicE_ExBold_R.otf",
      weight: "800",
    },
  ],
  variable: "--font-dharma-gothic-e",
});

export const projectkosmos = localFont({
  src: [
    {
      path: "../../public/fonts/PlanetKosmos/planetkosmos.ttf",
      style: "normal",
      weight: "400"
    }
  ],
  variable: "--font-planetkosmos"
})

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const orbitron = Orbitron({
    subsets: ["latin"],
})

export const bebasneue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "auto",
})