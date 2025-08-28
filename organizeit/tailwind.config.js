/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
      extend: {
        boxShadow: {
            '3xl': '10px 30px 60px rgba(0, 0, 0, 0.9)',
          },
        keyframes: {
            slideInRight: {
              '0%': { transform: 'translateX(20%)', opacity: '0' },
              '100%': { transform: 'translateX(0%)', opacity: '1' },
            },
           'slideInRight-md': {
               '0%': { transform: 'translateX(70%)', opacity: '0', width: '0px' },
               '50%': { opacity: '0.5', width: '50%' },
                '100%': { transform: 'translateX(0%)', opacity: '1', width: '100%' },
            }
          },
          animation: {
              slideInRight: 'slideInRight 0.5s ease-out forwards',
              slideInRightMd: 'slideInRight-md 1s ease-out forwards',
          },
    },
  },
  plugins: [flowbite.plugin(),require('@tailwindcss/typography'),],
}

