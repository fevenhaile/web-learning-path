module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'customBlue': '#4640DE',
        'customGreen': '#56CDAD',
        'customYellow': '#FFB836',
      },
      fontFamily: {
        'epilogue': ['Epilogue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};