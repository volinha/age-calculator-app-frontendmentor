/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple": "hsl(259, 100%, 65%)",
        "light-red": "hsl(0, 100%, 67%)",

        "white": "hsl(0, 0%, 100%)",
        "off-white": "hsl(0, 0%, 94%)",
        "light-grey": "hsl(0, 0%, 86%)",
        "smokey-grey": "hsl(0, 1%, 44%)",
        "off-black": "hsl(0, 0%, 8%)",
      },
      borderRadius: {
        "4xl": "5rem",
      },
      fontSize: {
        "2xs": "0.5rem",
      }
    },
  },
  plugins: [],
};

