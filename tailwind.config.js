export default {
    content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
    theme: { extend: {} },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.mask-gradient': {
                    maskImage: 'linear-gradient(black, transparent)',
                    WebkitMaskImage: 'linear-gradient(black, transparent)',
                },
                '.mask-circle': {
                    maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
                },
            }
            addUtilities(newUtilities, ['responsive'])
        },
    ],
};