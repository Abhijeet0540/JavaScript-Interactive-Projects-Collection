// Get DOM elements
const box = document.querySelector('#center');
const colorCode = document.querySelector('#color-code');
const hexValue = document.querySelector('#hex-value');
const rgbValue = document.querySelector('#rgb-value');
const hslValue = document.querySelector('#hsl-value');
const resetBtn = document.querySelector('#reset-btn');
const randomBtn = document.querySelector('#random-btn');
const saveBtn = document.querySelector('#save-btn');
const generatePaletteBtn = document.querySelector('#generate-palette-btn');
const redSlider = document.querySelector('#red-slider');
const greenSlider = document.querySelector('#green-slider');
const blueSlider = document.querySelector('#blue-slider');
const redValue = document.querySelector('#red-value');
const greenValue = document.querySelector('#green-value');
const blueValue = document.querySelector('#blue-value');
const colorPalette = document.querySelector('#color-palette');
const savedColors = document.querySelector('#saved-colors');
const colorGrid = document.querySelector('#color-grid');
const toast = document.querySelector('#toast');
const paletteTypeButtons = document.querySelectorAll('.palette-type-btn');
const categoryButtons = document.querySelectorAll('.category-btn');
const copyButtons = document.querySelectorAll('.copy-btn');

// Default color
const defaultColor = '#FFFFFF';
let currentColor = defaultColor;

// Saved colors array
let savedColorsArray = [];

// Color library
const colorLibrary = {
    red: [
        '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C',
        '#FF8A80', '#FF5252', '#FF1744', '#D50000'
    ],
    pink: [
        '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F',
        '#FF80AB', '#FF4081', '#F50057', '#C51162'
    ],
    purple: [
        '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C',
        '#EA80FC', '#E040FB', '#D500F9', '#AA00FF'
    ],
    deepPurple: [
        '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92',
        '#B388FF', '#7C4DFF', '#651FFF', '#6200EA'
    ],
    indigo: [
        '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E',
        '#8C9EFF', '#536DFE', '#3D5AFE', '#304FFE'
    ],
    blue: [
        '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1',
        '#82B1FF', '#448AFF', '#2979FF', '#2962FF'
    ],
    lightBlue: [
        '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B',
        '#80D8FF', '#40C4FF', '#00B0FF', '#0091EA'
    ],
    cyan: [
        '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064',
        '#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4'
    ],
    teal: [
        '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40',
        '#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5'
    ],
    green: [
        '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20',
        '#B9F6CA', '#69F0AE', '#00E676', '#00C853'
    ],
    lightGreen: [
        '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E',
        '#CCFF90', '#B2FF59', '#76FF03', '#64DD17'
    ],
    lime: [
        '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717',
        '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00'
    ],
    yellow: [
        '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17',
        '#FFFF8D', '#FFFF00', '#FFEA00', '#FFD600'
    ],
    amber: [
        '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00',
        '#FFE57F', '#FFD740', '#FFC400', '#FFAB00'
    ],
    orange: [
        '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100',
        '#FFD180', '#FFAB40', '#FF9100', '#FF6D00'
    ],
    deepOrange: [
        '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C',
        '#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00'
    ],
    brown: [
        '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723'
    ],
    gray: [
        '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121'
    ],
    blueGray: [
        '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238'
    ]
};

// Color conversion functions
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// Function to generate random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return rgbToHex(r, g, b);
}

// Function to update color values
function updateColorValues(hex) {
    // Update hex value
    hexValue.value = hex;

    // Update RGB value
    const rgb = hexToRgb(hex);
    rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    // Update HSL value
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hslValue.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    // Update sliders
    redSlider.value = rgb.r;
    greenSlider.value = rgb.g;
    blueSlider.value = rgb.b;

    // Update slider value displays
    redValue.textContent = rgb.r;
    greenValue.textContent = rgb.g;
    blueValue.textContent = rgb.b;
}

// Function to update box color and display the color code
function updateColor(color) {
    currentColor = color;
    box.style.backgroundColor = color;
    colorCode.textContent = color;

    // Update all color values
    updateColorValues(color);

    // Adjust text color based on background brightness for better visibility
    const rgb = hexToRgb(color);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    if (brightness > 125) {
        colorCode.style.color = '#333333';
    } else {
        colorCode.style.color = '#FFFFFF';
    }
}

// Function to generate color palette
function generatePalette(baseColor, type = 'monochromatic') {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    let palette = [];

    switch (type) {
        case 'monochromatic':
            // Generate shades and tints
            for (let i = 0; i < 10; i++) {
                const l = Math.min(Math.max(hsl.l - 40 + i * 8, 5), 95);
                const newRgb = hslToRgb(hsl.h, hsl.s, l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;

        case 'analogous':
            // Generate colors with adjacent hues
            for (let i = 0; i < 10; i++) {
                const h = (hsl.h + 360 - 40 + i * 8) % 360;
                const newRgb = hslToRgb(h, hsl.s, hsl.l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;

        case 'complementary':
            // Generate base color and its complement with variations
            for (let i = 0; i < 5; i++) {
                const l = Math.min(Math.max(hsl.l - 20 + i * 10, 10), 90);
                const newRgb = hslToRgb(hsl.h, hsl.s, l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }

            // Add complementary color and variations
            const complementHue = (hsl.h + 180) % 360;
            for (let i = 0; i < 5; i++) {
                const l = Math.min(Math.max(hsl.l - 20 + i * 10, 10), 90);
                const newRgb = hslToRgb(complementHue, hsl.s, l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;

        case 'triadic':
            // Generate colors with 3 equidistant hues
            const triadicHues = [hsl.h, (hsl.h + 120) % 360, (hsl.h + 240) % 360];

            for (const h of triadicHues) {
                for (let i = 0; i < 3; i++) {
                    const s = Math.min(Math.max(hsl.s - 10 + i * 10, 20), 100);
                    const l = Math.min(Math.max(hsl.l - 10 + i * 10, 30), 70);
                    const newRgb = hslToRgb(h, s, l);
                    palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                }
            }

            // Add neutral color
            palette.push(rgbToHex(240, 240, 240));
            break;

        case 'tetradic':
            // Generate colors with 4 equidistant hues
            const tetradicHues = [hsl.h, (hsl.h + 90) % 360, (hsl.h + 180) % 360, (hsl.h + 270) % 360];

            for (const h of tetradicHues) {
                for (let i = 0; i < 2; i++) {
                    const s = Math.min(Math.max(hsl.s - 5 + i * 10, 30), 90);
                    const l = Math.min(Math.max(hsl.l - 5 + i * 10, 40), 60);
                    const newRgb = hslToRgb(h, s, l);
                    palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                }
            }

            // Add neutral colors
            palette.push(rgbToHex(240, 240, 240));
            palette.push(rgbToHex(200, 200, 200));
            break;
    }

    return palette;
}

// Function to display color palette
function displayPalette(palette) {
    colorPalette.innerHTML = '';

    palette.forEach((color, index) => {
        const colorElement = document.createElement('div');
        colorElement.className = 'palette-color';
        colorElement.style.backgroundColor = color;
        colorElement.setAttribute('data-color', color);
        colorElement.style.animationDelay = `${index * 0.05}s`;

        const colorLabel = document.createElement('span');
        colorLabel.textContent = color;
        colorElement.appendChild(colorLabel);

        colorElement.addEventListener('click', () => {
            updateColor(color);
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            colorElement.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        colorPalette.appendChild(colorElement);
    });
}

// Function to save a color
function saveColor(color) {
    if (!savedColorsArray.includes(color)) {
        savedColorsArray.push(color);
        updateSavedColors();
        showToast('Color saved!');
    } else {
        showToast('Color already saved!');
    }
}

// Function to update saved colors display
function updateSavedColors() {
    savedColors.innerHTML = '';

    if (savedColorsArray.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No saved colors yet. Click the heart icon to save colors you like.';
        savedColors.appendChild(emptyMessage);
        return;
    }

    savedColorsArray.forEach((color, index) => {
        const colorElement = document.createElement('div');
        colorElement.className = 'saved-color';
        colorElement.style.backgroundColor = color;
        colorElement.setAttribute('data-color', color);
        colorElement.style.animationDelay = `${index * 0.05}s`;

        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            savedColorsArray.splice(index, 1);
            updateSavedColors();
            showToast('Color removed!');
        });

        colorElement.appendChild(removeBtn);

        colorElement.addEventListener('click', () => {
            updateColor(color);
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            colorElement.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        savedColors.appendChild(colorElement);
    });
}

// Function to display color library
function displayColorLibrary(category = 'all') {
    colorGrid.innerHTML = '';

    let colors = [];

    if (category === 'all') {
        // Get a selection of colors from each category
        Object.keys(colorLibrary).forEach(cat => {
            colors = colors.concat(colorLibrary[cat].filter((_, i) => i % 3 === 0));
        });
    } else {
        // Get colors for the specific category
        const categoryMap = {
            'red': [...colorLibrary.red, ...colorLibrary.deepOrange.slice(5)],
            'orange': [...colorLibrary.orange, ...colorLibrary.amber.slice(5)],
            'yellow': [...colorLibrary.yellow, ...colorLibrary.lime.slice(8)],
            'green': [...colorLibrary.green, ...colorLibrary.lightGreen.slice(5), ...colorLibrary.teal.slice(5)],
            'blue': [...colorLibrary.blue, ...colorLibrary.lightBlue, ...colorLibrary.indigo.slice(5)],
            'purple': [...colorLibrary.purple, ...colorLibrary.deepPurple],
            'pink': [...colorLibrary.pink],
            'brown': [...colorLibrary.brown],
            'gray': [...colorLibrary.gray, ...colorLibrary.blueGray]
        };

        colors = categoryMap[category] || [];
    }

    // Limit to a reasonable number of colors
    colors = colors.slice(0, 60);

    // Create a container for the animation effect
    const container = document.createElement('div');
    container.className = 'color-grid-container';
    colorGrid.appendChild(container);

    // Add colors with staggered animation
    colors.forEach((color, index) => {
        const colorElement = document.createElement('div');
        colorElement.className = 'color-swatch';
        colorElement.style.backgroundColor = color;
        colorElement.setAttribute('data-color', color);
        colorElement.style.animationDelay = `${index * 0.03}s`;
        colorElement.style.width = '80px';
        colorElement.style.height = '80px';
        colorElement.style.flexShrink = '0';

        colorElement.addEventListener('click', () => {
            updateColor(color);
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            colorElement.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        container.appendChild(colorElement);
    });
}

// Function to show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
        showToast('Failed to copy!');
    });
}

// Event Listeners

// Mouse movement over the color box
box.addEventListener('mousemove', (event) => {
    // Get mouse position relative to the box
    const rect = box.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the box
    const y = event.clientY - rect.top;  // y position within the box

    // Calculate color based on position
    const r = Math.floor((x / rect.width) * 255);
    const g = Math.floor((y / rect.height) * 255);
    const b = Math.floor(((x + y) / (rect.width + rect.height)) * 255);

    const color = rgbToHex(r, g, b);
    updateColor(color);
});

// Click on the color box
box.addEventListener('click', () => {
    const randomColor = getRandomColor();
    updateColor(randomColor);
});

// RGB sliders
redSlider.addEventListener('input', updateFromSliders);
greenSlider.addEventListener('input', updateFromSliders);
blueSlider.addEventListener('input', updateFromSliders);

function updateFromSliders() {
    const r = parseInt(redSlider.value);
    const g = parseInt(greenSlider.value);
    const b = parseInt(blueSlider.value);

    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;

    const color = rgbToHex(r, g, b);
    updateColor(color);
}

// Button click events
resetBtn.addEventListener('click', () => {
    updateColor(defaultColor);
});

randomBtn.addEventListener('click', () => {
    const randomColor = getRandomColor();
    updateColor(randomColor);
});

saveBtn.addEventListener('click', () => {
    saveColor(currentColor);
});

generatePaletteBtn.addEventListener('click', () => {
    const activeType = document.querySelector('.palette-type-btn.active').dataset.type;
    const palette = generatePalette(currentColor, activeType);
    displayPalette(palette);
});

// Palette type buttons
paletteTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        paletteTypeButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Generate and display palette
        const palette = generatePalette(currentColor, button.dataset.type);
        displayPalette(palette);
    });
});

// Category buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Display color library for the selected category
        displayColorLibrary(button.dataset.category);
    });
});

// Copy buttons
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        const targetElement = document.getElementById(targetId);
        copyToClipboard(targetElement.value);
    });
});

// Navigation and Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.section-container');

    // Make sure the first section is active by default
    if (sections.length > 0 && !document.querySelector('.section-container.active-section')) {
        sections[0].classList.add('active-section');
        if (navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active-section'));

            // Add active class to clicked link and corresponding section
            link.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            } else {
                console.error(`Section with id ${targetId} not found`);
                // Fallback to first section if target not found
                if (sections.length > 0) {
                    sections[0].classList.add('active-section');
                    navLinks[0].classList.add('active');
                }
            }
        });
    });
});

// Gradient Generator Functions
function updateGradientPreview() {
    const gradientType = document.querySelector('.gradient-type-btn.active').dataset.type;
    const colorStops = document.querySelectorAll('.color-stop');
    let gradientString = '';

    if (gradientType === 'linear') {
        const direction = document.querySelector('.direction-btn.active').dataset.direction;
        gradientString = `linear-gradient(${direction}, `;
    } else if (gradientType === 'radial') {
        gradientString = 'radial-gradient(circle, ';
    } else if (gradientType === 'conic') {
        gradientString = 'conic-gradient(from 0deg, ';
    }

    const stopStrings = [];
    colorStops.forEach(stop => {
        const color = stop.querySelector('.color-stop-input').value;
        const position = stop.querySelector('.color-stop-position').value;
        stopStrings.push(`${color} ${position}%`);
    });

    gradientString += stopStrings.join(', ') + ')';

    const gradientPreview = document.getElementById('gradient-preview');
    const gradientCode = document.getElementById('gradient-code');

    gradientPreview.style.background = gradientString;
    gradientCode.textContent = gradientString;

    return gradientString;
}

// Initialize gradient controls if they exist
if (document.getElementById('gradient-preview')) {
    // Gradient type buttons
    const gradientTypeButtons = document.querySelectorAll('.gradient-type-btn');
    gradientTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            gradientTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateGradientPreview();
        });
    });

    // Direction buttons
    const directionButtons = document.querySelectorAll('.direction-btn');
    directionButtons.forEach(button => {
        button.addEventListener('click', () => {
            directionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateGradientPreview();
        });
    });

    // Color stop inputs
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('color-stop-input')) {
            // Update the hex display when color changes
            const colorStop = e.target.closest('.color-stop');
            const hexDisplay = colorStop.querySelector('.hex-display');
            if (hexDisplay) {
                hexDisplay.textContent = e.target.value;
            }
            updateGradientPreview();
        } else if (e.target.classList.contains('color-stop-position')) {
            updateGradientPreview();
        }
    });

    // Add color stop button
    const addColorStopBtn = document.getElementById('add-color-stop');
    if (addColorStopBtn) {
        addColorStopBtn.addEventListener('click', () => {
            const colorStops = document.getElementById('color-stops');
            const newStop = document.createElement('div');
            newStop.className = 'color-stop flex items-center gap-3 bg-gray-800 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-0.5';

            // Generate a random color
            const randomColor = getRandomColor();
            const position = Math.floor(Math.random() * 100);

            newStop.innerHTML = `
                <div class="flex flex-col items-center gap-1">
                    <input type="color" value="${randomColor}" class="color-stop-input w-10 h-10 rounded-md cursor-pointer">
                    <span class="text-xs text-blue-400 font-mono hex-display">${randomColor}</span>
                </div>
                <input type="number" value="${position}" min="0" max="100" class="color-stop-position w-14 bg-gray-900 text-white px-2 py-1 rounded-md">
                <span class="text-gray-400">%</span>
                <button class="remove-stop ml-auto bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"><i class="fas fa-times"></i></button>
            `;

            colorStops.appendChild(newStop);
            updateGradientPreview();

            // Add event listener to the new remove button
            const removeBtn = newStop.querySelector('.remove-stop');
            removeBtn.addEventListener('click', removeColorStop);
        });
    }

    // Remove color stop function
    function removeColorStop(e) {
        const colorStops = document.querySelectorAll('.color-stop');
        if (colorStops.length > 2) {
            e.target.closest('.color-stop').remove();
            updateGradientPreview();
        } else {
            showToast('Minimum 2 color stops required');
        }
    }

    // Add event listeners to existing remove buttons
    document.querySelectorAll('.remove-stop').forEach(button => {
        button.addEventListener('click', removeColorStop);
    });

    // Copy gradient button
    const copyGradientBtn = document.getElementById('copy-gradient');
    if (copyGradientBtn) {
        copyGradientBtn.addEventListener('click', () => {
            const gradientCode = document.getElementById('gradient-code').textContent;
            copyToClipboard(gradientCode);
        });
    }

    // Random gradient button
    const randomGradientBtn = document.getElementById('random-gradient');
    if (randomGradientBtn) {
        randomGradientBtn.addEventListener('click', () => {
            // Generate random gradient type
            const types = ['linear', 'radial', 'conic'];
            const randomType = types[Math.floor(Math.random() * types.length)];

            // Set active type button
            document.querySelectorAll('.gradient-type-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === randomType);
            });

            // If linear, set random direction
            if (randomType === 'linear') {
                const directions = document.querySelectorAll('.direction-btn');
                const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                directions.forEach(btn => btn.classList.remove('active'));
                randomDirection.classList.add('active');
            }

            // Generate random color stops (2-5)
            const numStops = Math.floor(Math.random() * 4) + 2;
            const colorStopsContainer = document.getElementById('color-stops');
            colorStopsContainer.innerHTML = '';

            for (let i = 0; i < numStops; i++) {
                const position = i === 0 ? 0 : i === numStops - 1 ? 100 : Math.floor(Math.random() * 100);
                const color = getRandomColor();

                const newStop = document.createElement('div');
                newStop.className = 'color-stop';
                newStop.innerHTML = `
                    <input type="color" value="${color}" class="color-stop-input">
                    <input type="number" value="${position}" min="0" max="100" class="color-stop-position">
                    <span>%</span>
                    <button class="remove-stop"><i class="fas fa-times"></i></button>
                `;

                colorStopsContainer.appendChild(newStop);
            }

            // Add event listeners to new remove buttons
            document.querySelectorAll('.remove-stop').forEach(button => {
                button.addEventListener('click', removeColorStop);
            });

            updateGradientPreview();
        });
    }

    // Initialize gradient preview
    updateGradientPreview();
}

// Color Shades Generator
if (document.getElementById('shade-base-color')) {
    const shadeBaseColor = document.getElementById('shade-base-color');
    const shadeHexInput = document.getElementById('shade-hex-input');
    const generateShadesBtn = document.getElementById('generate-shades-btn');
    const shadeResults = document.getElementById('shade-results');
    const shadeCountSlider = document.getElementById('shade-count-slider');
    const shadeCountValue = document.getElementById('shade-count-value');

    // Update hex input when color picker changes
    shadeBaseColor.addEventListener('input', () => {
        shadeHexInput.value = shadeBaseColor.value;
    });

    // Update color picker when hex input changes
    shadeHexInput.addEventListener('input', () => {
        // Validate hex color
        if (/^#[0-9A-F]{6}$/i.test(shadeHexInput.value)) {
            shadeBaseColor.value = shadeHexInput.value;
        }
    });

    // Generate shades button
    if (generateShadesBtn) {
        generateShadesBtn.addEventListener('click', () => {
            const baseColor = shadeBaseColor.value;
            const shadeType = document.querySelector('.shade-type-btn.active')?.dataset.type || 'monochromatic';
            const shadeCount = parseInt(shadeCountValue.textContent);
            generateShades(baseColor, shadeType, shadeCount);
        });

        // Shade type buttons
        document.querySelectorAll('.shade-type-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.shade-type-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Generate shades with the new type
                const baseColor = shadeBaseColor.value;
                const shadeType = this.dataset.type;
                const shadeCount = parseInt(shadeCountValue.textContent);
                generateShades(baseColor, shadeType, shadeCount);
            });
        });

        // Shade count slider
        if (shadeCountSlider && shadeCountValue) {
            shadeCountSlider.addEventListener('input', function () {
                shadeCountValue.textContent = this.value;

                // Generate shades with the new count
                const baseColor = shadeBaseColor.value;
                const shadeType = document.querySelector('.shade-type-btn.active')?.dataset.type || 'monochromatic';
                const shadeCount = parseInt(this.value);
                generateShades(baseColor, shadeType, shadeCount);
            });
        }

        // Copy all shades
        document.getElementById('copy-all-shades')?.addEventListener('click', function () {
            const shades = document.querySelectorAll('.shade-swatch span');
            const colors = Array.from(shades).map(span => span.textContent).join('\n');

            navigator.clipboard.writeText(colors).then(() => {
                showToast('All shades copied to clipboard!');
            });
        });

        // Save all shades
        document.getElementById('save-all-shades')?.addEventListener('click', function () {
            const shades = document.querySelectorAll('.shade-swatch');

            Array.from(shades).forEach(shade => {
                const color = shade.querySelector('span').textContent;
                if (!savedColorsArray.includes(color)) {
                    savedColorsArray.push(color);
                }
            });

            updateSavedColors();
            showToast('All shades saved!');
        });

        // Generate shades on initial load
        generateShadesBtn.click();
    }

    // Function to generate shades
    function generateShades(baseColor, type = 'monochromatic', count = 5) {
        const shadeResults = document.getElementById('shade-results');
        shadeResults.innerHTML = '';

        try {
            // Convert hex to RGB
            const rgb = hexToRgb(baseColor);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

            let shades = [];

            switch (type) {
                case 'tints':
                    // Generate tints (lighter versions)
                    for (let i = 0; i < count; i++) {
                        const lightness = hsl.l + ((100 - hsl.l) / count) * i;
                        const newRgb = hslToRgb(hsl.h, hsl.s, lightness);
                        shades.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                    }
                    break;

                case 'shades':
                    // Generate shades (darker versions)
                    for (let i = 0; i < count; i++) {
                        const lightness = hsl.l - (hsl.l / count) * i;
                        const newRgb = hslToRgb(hsl.h, hsl.s, lightness);
                        shades.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                    }
                    break;

                case 'monochromatic':
                default:
                    // Generate monochromatic colors (both lighter and darker)
                    const middleIndex = Math.floor(count / 2);

                    // Add the original color
                    shades.push(baseColor);

                    // Add darker shades
                    for (let i = 1; i <= middleIndex; i++) {
                        const lightness = Math.max(0, hsl.l - (hsl.l / middleIndex) * i);
                        const newRgb = hslToRgb(hsl.h, hsl.s, lightness);
                        shades.unshift(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                    }

                    // Add lighter shades
                    for (let i = 1; i < count - middleIndex; i++) {
                        const lightness = Math.min(100, hsl.l + ((100 - hsl.l) / (count - middleIndex - 1)) * i);
                        const newRgb = hslToRgb(hsl.h, hsl.s, lightness);
                        shades.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                    }
                    break;
            }

            shades.forEach((shade, index) => {
                const swatch = document.createElement('div');
                swatch.className = 'shade-swatch';
                swatch.style.backgroundColor = shade;
                swatch.style.animationDelay = `${index * 0.05}s`;

                const label = document.createElement('span');
                label.textContent = shade;
                swatch.appendChild(label);

                swatch.addEventListener('click', () => {
                    updateColor(shade);
                    // Add ripple effect
                    const ripple = document.createElement('div');
                    ripple.className = 'ripple';
                    swatch.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });

                shadeResults.appendChild(swatch);
            });
        } catch (error) {
            console.error('Invalid color format', error);
            shadeResults.innerHTML = '<p class="error-message">Invalid color format. Please use a valid HEX color (e.g., #3498db).</p>';
        }
    }
}

// Theme Colors Library
const themeColors = {
    pastel: [
        '#FFD1DC', '#FFECDB', '#FFFBD6', '#D7F9E9', '#D6EAFF', '#E8D6FF', '#F4D6FF', '#FFD6F5',
        '#FFC8C8', '#FFE5C8', '#FFFAC8', '#C8F9D6', '#C8E5FF', '#D9C8FF', '#EFC8FF', '#FFC8EB'
    ],
    vintage: [
        '#8D8741', '#659DBD', '#DAAD86', '#BC986A', '#FBEEC1', '#7D8A2E', '#2E4057', '#C4A287',
        '#A37B45', '#E3D18A', '#5A6521', '#1D2B3A', '#9A7B4F', '#7A5C28', '#D1BC65'
    ],
    retro: [
        '#FF6B6B', '#4ECDC4', '#F9F9F9', '#556270', '#C7F464', '#FF4365', '#45B7D1', '#FFFBBD',
        '#424254', '#94E8B4', '#FF3A3A', '#33A1BD', '#FFFAA8', '#2D2D39', '#6BDE94'
    ],
    neon: [
        '#FF00FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000', '#FE00FE', '#00FEFE', '#00FE00',
        '#FEFE00', '#FE0000', '#CC00CC', '#00CCCC', '#00CC00', '#CCCC00', '#CC0000'
    ],
    gold: [
        '#D4AF37', '#CFB53B', '#C5B358', '#D9D6CF', '#F0E68C', '#B29700', '#C9B037', '#D6BE97',
        '#E6C35C', '#BBA14F', '#A67C00', '#BF9B30', '#C4B454', '#D1B000', '#F5D033'
    ],
    light: [
        '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#F5F5F5', '#E8E8E8', '#D4D4D4',
        '#C0C0C0', '#A9A9A9', '#F0F0F0', '#E0E0E0', '#D0D0D0', '#C8C8C8', '#A0A0A0'
    ],
    dark: [
        '#212529', '#343A40', '#495057', '#6C757D', '#ADB5BD', '#1A1A1A', '#2D2D2D', '#444444',
        '#5E5E5E', '#777777', '#121212', '#292929', '#3D3D3D', '#575757', '#707070'
    ],
    warm: [
        '#FF7B00', '#FF8800', '#FF9500', '#FFA200', '#FFAA00', '#FFB700', '#FFC300', '#FFD000',
        '#FFDD00', '#FFEA00', '#F9A602', '#F6AE2D', '#F3B94C', '#F0C169', '#EEC987'
    ],
    cold: [
        '#00308F', '#004AAD', '#0063CA', '#007CE2', '#0096FF', '#002A7F', '#00429A', '#005AB5',
        '#0071CC', '#0088E2', '#001F5C', '#003785', '#004E9A', '#0066B4', '#007DCE'
    ],
    summer: [
        '#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590', '#F9414A',
        '#F37232', '#F8961F', '#F9C750', '#90BE6E', '#43AA8C', '#577591'
    ],
    fall: [
        '#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F5DEB3', '#7E3517', '#954D2A', '#C17F3A',
        '#D6AA7E', '#F0D6A9', '#6B2E14', '#8A4726', '#B57035', '#CE9C75', '#EBCDA0'
    ],
    winter: [
        '#021024', '#052659', '#5483B3', '#7DA0CA', '#C1E8FF', '#021025', '#05265A', '#5483B4',
        '#7DA0CB', '#C1E8FF', '#021026', '#05265B', '#5483B5', '#7DA0CC', '#C1E8FF'
    ],
    spring: [
        '#A8E6CE', '#DCEDC2', '#FFD3B5', '#FFAAA6', '#FF8C94', '#A8E6CF', '#DCEDC3', '#FFD3B6',
        '#FFAAA7', '#FF8C95', '#A8E6D0', '#DCEDC4', '#FFD3B7', '#FFAAA8', '#FF8C96'
    ],
    happy: [
        '#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845', '#FFC301', '#FF5734', '#C7003A',
        '#900C40', '#581846', '#FFC302', '#FF5735', '#C7003B', '#900C41', '#581847'
    ],
    nature: [
        '#1B5E20', '#388E3C', '#4CAF50', '#81C784', '#C8E6C9', '#1B5E21', '#388E3D', '#4CAF51',
        '#81C785', '#C8E6CA', '#1B5E22', '#388E3E', '#4CAF52', '#81C786', '#C8E6CB'
    ],
    earth: [
        '#795548', '#A1887F', '#BCAAA4', '#D7CCC8', '#EFEBE9', '#795549', '#A1887E', '#BCAAA5',
        '#D7CCC9', '#EFEBEA', '#79554A', '#A1887D', '#BCAAA6', '#D7CCCA', '#EFEBEB'
    ],
    night: [
        '#121212', '#1E1E1E', '#2A2A2A', '#363636', '#424242', '#121213', '#1E1E1F', '#2A2A2B',
        '#363637', '#424243', '#121214', '#1E1E20', '#2A2A2C', '#363638', '#424244'
    ],
    space: [
        '#0B3D91', '#1A3668', '#283747', '#34495E', '#5D6D7E', '#0B3D92', '#1A3669', '#283748',
        '#34495F', '#5D6D7F', '#0B3D93', '#1A366A', '#283749', '#344960', '#5D6D80'
    ],
    rainbow: [
        '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#FF0001',
        '#FF7F01', '#FFFF01', '#00FF01', '#0000FE', '#4B0083', '#9400D4'
    ],
    gradient: [
        '#833ab4', '#fd1d1d', '#fcb045', '#833ab5', '#fd1d1e', '#fcb046', '#833ab6', '#fd1d1f',
        '#fcb047', '#833ab7', '#fd1d20', '#fcb048', '#833ab8', '#fd1d21', '#fcb049'
    ],
    sunset: [
        '#FF7E5F', '#FEB47B', '#FFD56B', '#FFF1A8', '#FFFCDC', '#FF7E60', '#FEB47C', '#FFD56C',
        '#FFF1A9', '#FFFCDD', '#FF7E61', '#FEB47D', '#FFD56D', '#FFF1AA', '#FFFCDE'
    ],
    sky: [
        '#021024', '#052659', '#5483B3', '#7DA0CA', '#C1E8FF', '#021025', '#05265A', '#5483B4',
        '#7DA0CB', '#C1E8FF', '#021026', '#05265B', '#5483B5', '#7DA0CC', '#C1E8FF'
    ],
    sea: [
        '#004D7A', '#008793', '#00BFB2', '#1FECAC', '#C9FDD7', '#004D7B', '#008794', '#00BFB3',
        '#1FECAD', '#C9FDD8', '#004D7C', '#008795', '#00BFB4', '#1FECAE', '#C9FDD9'
    ],
    kids: [
        '#FF5252', '#FF7752', '#FF9A52', '#FFBD52', '#FFE252', '#E2FF52', '#BDFF52', '#9AFF52',
        '#77FF52', '#52FF52', '#52FF77', '#52FF9A', '#52FFBD', '#52FFE2', '#52E2FF'
    ],
    skin: [
        '#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFDBAC', '#8D5525', '#C68643', '#E0AC6A',
        '#F1C27E', '#FFDBAD', '#8D5526', '#C68644', '#E0AC6B', '#F1C27F', '#FFDBAE'
    ],
    food: [
        '#FF5252', '#FF9800', '#FFEB3B', '#8BC34A', '#03A9F4', '#FF5253', '#FF9801', '#FFEB3C',
        '#8BC34B', '#03A9F5', '#FF5254', '#FF9802', '#FFEB3D', '#8BC34C', '#03A9F6'
    ],
    cream: [
        '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFF8E2', '#FFECB4', '#FFE083',
        '#FFD550', '#FFCA29', '#FFF8E3', '#FFECB5', '#FFE084', '#FFD551', '#FFCA2A'
    ],
    coffee: [
        '#4B3832', '#854442', '#BE9B7B', '#E4B083', '#3C2F2F', '#4B3833', '#854443', '#BE9B7C',
        '#E4B084', '#3C2F30', '#4B3834', '#854444', '#BE9B7D', '#E4B085', '#3C2F31'
    ],
    wedding: [
        '#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#F5F5F6', '#E0E0E1', '#BDBDBE',
        '#9E9E9F', '#757576', '#F5F5F7', '#E0E0E2', '#BDBDBF', '#9E9EA0', '#757577'
    ],
    christmas: [
        '#B71C1C', '#1B5E20', '#F1F8E9', '#FFCDD2', '#C8E6C9', '#B71C1D', '#1B5E21', '#F1F8EA',
        '#FFCDD3', '#C8E6CA', '#B71C1E', '#1B5E22', '#F1F8EB', '#FFCDD4', '#C8E6CB'
    ],
    halloween: [
        '#FF6D00', '#FF9100', '#FFB74D', '#000000', '#263238', '#FF6D01', '#FF9101', '#FFB74E',
        '#000001', '#263239', '#FF6D02', '#FF9102', '#FFB74F', '#000002', '#26323A'
    ]
};

// Function to display theme colors
function displayThemeColors(theme) {
    const colorGrid = document.getElementById('color-grid');
    if (!colorGrid) return;

    colorGrid.innerHTML = '';

    // Get colors for the selected theme
    const colors = themeColors[theme] || [];

    if (colors.length === 0) {
        colorGrid.innerHTML = '<p class="empty-message">No colors available for this theme.</p>';
        return;
    }

    // Create a container for the animation effect
    const container = document.createElement('div');
    container.className = 'color-grid-container';
    colorGrid.appendChild(container);

    // Display colors
    colors.forEach((color, index) => {
        const colorSwatch = document.createElement('div');
        colorSwatch.className = 'color-swatch';
        colorSwatch.style.backgroundColor = color;
        colorSwatch.setAttribute('data-color', color);
        colorSwatch.style.animationDelay = `${index * 0.03}s`;
        colorSwatch.style.width = '80px';
        colorSwatch.style.height = '80px';
        colorSwatch.style.flexShrink = '0';

        colorSwatch.addEventListener('click', () => {
            updateColor(color);
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            colorSwatch.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        container.appendChild(colorSwatch);
    });
}

// Add event listeners to theme tags and tab buttons
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Theme tag buttons
    const tagButtons = document.querySelectorAll('.tag-btn');
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tagButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Display colors for the selected theme
            const theme = button.dataset.theme;
            displayThemeColors(theme);
        });
    });

    // Initialize with default theme if tag buttons exist
    if (tagButtons.length > 0) {
        // Set first button as active
        tagButtons[0].classList.add('active');
        const defaultTheme = tagButtons[0].dataset.theme;
        displayThemeColors(defaultTheme);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateColor(defaultColor);
    displayColorLibrary('all');
    displayPalette(generatePalette(defaultColor, 'monochromatic'));

    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Display color library for the selected category
            const category = button.dataset.category;
            displayColorLibrary(category);
        });
    });
});