/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 启用手动切换暗色模式
  theme: {
    extend: {
      colors: {
        // Endfield Palette
        'end-yellow': '#FFC107', // 警告/高亮黄
        'end-black': '#0F0F0F', // 深邃黑背景
        'end-dark': '#1A1A1A',  // 模块背景
        'end-gray': '#888888',  // 辅助文字
        'end-light': '#E5E5E5', // 白天模式背景
        'end-cyan': '#00E5FF',  // 科技感辅助色
      },
      fontFamily: {
        sans: ['"Montserrat"', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}