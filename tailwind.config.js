
module.exports = {
  
  theme: {
    extend: {
      container: {
        width: {
          DEFAULT: '100%',
          sm: '540px',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        "primary": {DEFAULT : "var(--primary-color)"},
   
      },
      fontSize: {
        'xxs':'calc(10px + 0.15vw)', // Extra Small font size
        'xs':'calc(11px + 0.20vw)', // Extra Small font size
        'sm':'calc(12px + 0.25vw)', // Small font size
        'md':'calc(14px + 0.4vw)', // Medium font size
        'lg':'calc(16px + 0.6vw)', // Large font size
        'xl':'calc(18px + 0.8vw)', // Extra Large font size
        '2xl':'calc(20px + 1vw)', // 2x Large font size
        '3xl':'calc(22px + 1.2vw)', // 3x Large font size
        '4xl':'calc(24px + 1.4vw)', // 4x Large font size
        '5xl':'calc(26px + 1.6vw)', // 5x Large font size
        '6xl':'calc(28px + 1.8vw)', // 6x Large font size
        '7xl':'calc(30px + 2vw)', // 7x Large font size
        '8xl':'calc(32px + 2.2vw)', // 8x Large font size
        '9xl':'calc(34px + 2.4vw)', // 9x Large font size
        '10xl':'calc(36px + 2.6vw)', // 10x Large font size
      }
    },
  },
  plugins: [],
}

