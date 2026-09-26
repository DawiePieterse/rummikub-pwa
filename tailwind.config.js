// Build tailwind.css from the classes used in index.html: `npm install && npm run build:css`.
// The named colour scales are remapped onto Apple's system palette; the class names in the
// markup stay the same, only what they resolve to changes.
module.exports = {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                amber:   { 100: '#EAF3FF', 200: '#0B5FBF', 300: '#0071E3', 400: '#0071E3', 500: '#0A84FF', 600: '#0071E3', 700: '#0059B3', 800: '#D6ECFF', 900: '#D6ECFF' },
                emerald: { 100: '#E3F9E9', 300: '#17853A', 400: '#30D158', 500: '#27AE4E', 600: '#1F9C46', 700: '#17853A', 900: '#E3F9E9' },
                sky:     { 500: '#7A79F5', 600: '#5E5CE6', 700: '#4A48C4', 900: '#E7E6FB' },
                red:     { 100: '#FFD9D6', 400: '#D70015', 600: '#FF453A', 700: '#D70015', 900: '#3A0906' },
                yellow:  { 400: '#FFD60A', 500: '#E6C200' },
                zinc:    { 900: '#1C1C1E', 950: '#0B0B0D' },
                violet:  { 700: '#8944D6', 900: '#3B1A66' },
                fuchsia: { 600: '#BF5AF2' },
                rose:    { 600: '#FF375F' },
                blue:    { 600: '#0A84FF', 700: '#0059B3' }
            }
        }
    }
};
