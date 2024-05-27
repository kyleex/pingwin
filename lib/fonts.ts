import { Indie_Flower, Roboto } from "next/font/google";

const indieFlower_init = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indie",
});

const roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

export const indieFlower = indieFlower_init.className;
export const roboto = roboto_init.className;
