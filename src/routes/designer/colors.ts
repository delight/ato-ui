/**
 * Provided by @javisperez under the MIT license: https://github.com/javisperez/tailwindcolorshades/blob/master/src/composables/colors.ts
 */

import tinycolor from 'tinycolor2';

import type { Rgb, Palette, Contrast, PaletteShades, Shade, ShadeValues } from "./types.d";

function hexToRgb(hex: string): Rgb | null {
	const sanitizedHex = hex.replaceAll('##', '#');
	const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sanitizedHex);

	if (!colorParts) {
		return null;
	}

	const [, r, g, b] = colorParts;

	return {
		r: parseInt(r, 16),
		g: parseInt(g, 16),
		b: parseInt(b, 16)
	} as Rgb;
}

function rgbToHex(r: number, g: number, b: number): string {
	const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getTextColor(color: string): '#FFF' | '#333' {
	const rgbColor = hexToRgb(color);

	if (!rgbColor) {
		return '#333';
	}

	const { r, g, b } = rgbColor;
	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	return luma < 120 ? '#FFF' : '#333';
}

function lighten(hex: string, intensity: number): string {
	const color = hexToRgb(`#${hex}`);

	if (!color) {
		return '';
	}

	const r = Math.round(color.r + (255 - color.r) * intensity);
	const g = Math.round(color.g + (255 - color.g) * intensity);
	const b = Math.round(color.b + (255 - color.b) * intensity);

	return rgbToHex(r, g, b);
}

function darken(hex: string, intensity: number): string {
	const color = hexToRgb(hex);

	if (!color) {
		return '';
	}

	const r = Math.round(color.r * intensity);
	const g = Math.round(color.g * intensity);
	const b = Math.round(color.b * intensity);

	return rgbToHex(r, g, b);
}

function find_best_contrast(hex: string): Contrast {
	const black_contrast = tinycolor.readability(hex, '#000');
	const white_contrast = tinycolor.readability(hex, '#fff');

	let contrast = black_contrast;
	let contrast_color = '#000000';

	if (white_contrast > black_contrast) {
		contrast = white_contrast;
		contrast_color = '#ffffff';
	}

	return {
		contrast,
		onColor: contrast_color
	}
}

export default function generate_palette(baseColor: string): PaletteShades {
	const response: Palette = {
		500: `#${baseColor}`.replace('##', '#')
	};

	const shade_values: ShadeValues[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

	const intensityMap: {
		[key: number]: number;
	} = {
		// 50: 0.95,
		// 100: 0.9,
		// 200: 0.75,
		// 300: 0.6,
		// 400: 0.3,
		// 600: 0.9,
		// 700: 0.75,
		// 800: 0.6,
		// 900: 0.49,
        // 950: 0.44
		50: 0.95,
		100: 0.75,
		200: 0.5,
		300: 0.3,
		400: 0.15,
		600: 0.9,
		700: 0.8,
		800: 0.65,
		900: 0.55,
        950: 0.4
	};

	(<ShadeValues[]>[50, 100, 200, 300, 400]).forEach((level) => {
		response[level] = lighten(baseColor, intensityMap[level]);
	});

	(<ShadeValues[]>[600, 700, 800, 900, 950]).forEach((level) => {
		response[level] = darken(baseColor, intensityMap[level]);
	});

	let palette_shades: PaletteShades = {};

	shade_values.forEach((v) => {
		const contrast = find_best_contrast(<string>response[v]);
		
		palette_shades[v] = {
			color: <string>response[v],
			...contrast
		} satisfies Shade;
	});

	// console.log('tertiary-400:', tinycolor.readability('#378b63', '#000000'), tinycolor.readability('#378b63', "#06061f"))

	return palette_shades satisfies PaletteShades;
}