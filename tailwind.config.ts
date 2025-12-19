import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1200px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            }
        },
    },
    plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
