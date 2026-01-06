/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,svelte}',
  ],
  theme: {
    extend: {
      // You can extend Tailwind's theme here
    },
  },
  plugins: [],
  
  // This ensures Tailwind's styles don't conflict with WebTUI
  important: true,

  // Disable Tailwind's preflight to avoid conflicts with WebTUI's base styles
  corePlugins: {
    preflight: false,
  },
}

