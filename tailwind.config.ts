import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        nav_primary: "#383F50",
        nav_secondary: "#000000",
        nav_bg:"#F9F9F9"
        
      },
      boxShadow: {
        'nav-shadow': '-3px 4.02px 10.3px -3px #00000015 inset', // Adjust opacity to match #00000015
      },
      fontFamily: {
        pretendard: ['Pretendard',  ...fontFamily.sans], // Custom font family
      },
      fontWeight: {
        'semi-bold': '400',
      },
      // fontFamily: {
      //   sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      // },
    },
  },
  plugins: [],
} satisfies Config;
