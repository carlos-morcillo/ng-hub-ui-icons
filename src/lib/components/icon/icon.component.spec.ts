import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubIconPack } from '../../models/icon-pack';
import { bootstrapPack } from '../../packs/bootstrap';
import { faPack } from '../../packs/font-awesome';
import { materialSymbolsPack } from '../../packs/material-symbols';
import { svgPack } from '../../packs/svg-pack';
import { provideHubIcons } from '../../services/icons-config';
import { HubIconComponent } from './icon.component';

const usePack: HubIconPack = { resolve: (name) => ({ kind: 'use', href: `sprite.svg#${name}` }) };
const imgPack: HubIconPack = { resolve: (name) => ({ kind: 'img', src: `/icons/${name}.png`, alt: name }) };

describe('HubIconComponent', () => {
	let fixture: ComponentFixture<HubIconComponent>;

	/** The component host element (`<hub-icon>`). */
	const root = (): HTMLElement => fixture.nativeElement as HTMLElement;
	const query = (selector: string): HTMLElement | null => root().querySelector(selector);

	/** Creates the component with the given inputs and runs a first CD pass. */
	const render = (inputs: Record<string, unknown>): void => {
		fixture = TestBed.createComponent(HubIconComponent);
		for (const [key, value] of Object.entries(inputs)) {
			fixture.componentRef.setInput(key, value);
		}
		fixture.detectChanges();
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHubIcons({
					defaultPack: 'fa',
					packs: {
						fa: faPack(),
						bi: bootstrapPack(),
						ms: materialSymbolsPack(),
						svg: svgPack({ map: { star: '<svg data-testid="star"></svg>' } }),
						use: usePack,
						img: imgPack
					}
				})
			]
		});
	});

	afterEach(() => TestBed.resetTestingModule());

	it('renders a class glyph from the default pack', () => {
		render({ name: 'house' });

		const glyph = query('.hub-icon__glyph') as HTMLElement;
		expect(glyph).toBeTruthy();
		expect(glyph.classList.contains('fa-solid')).toBe(true);
		expect(glyph.classList.contains('fa-house')).toBe(true);
	});

	it('renders a ligature glyph with the icon name as text', () => {
		render({ name: 'home', pack: 'ms' });

		const glyph = query('.hub-icon__glyph') as HTMLElement;
		expect(glyph.classList.contains('material-symbols-outlined')).toBe(true);
		expect(glyph.textContent?.trim()).toBe('home');
	});

	it('renders inline SVG for an svg pack', () => {
		render({ name: 'star', pack: 'svg' });
		expect(query('.hub-icon__svg svg[data-testid="star"]')).toBeTruthy();
	});

	it('renders a sprite <use> for a use pack', () => {
		render({ name: 'house', pack: 'use' });

		const use = query('svg.hub-icon__svg use') as SVGUseElement | null;
		expect(use?.getAttribute('href')).toBe('sprite.svg#house');
	});

	it('renders an <img> for an img pack', () => {
		render({ name: 'house', pack: 'img' });

		const img = query('img.hub-icon__img') as HTMLImageElement | null;
		expect(img?.getAttribute('src')).toBe('/icons/house.png');
		expect(img?.getAttribute('alt')).toBe('house');
	});

	it('parses the pack:variant:name shorthand', () => {
		render({ name: 'fa:brands:github' });

		const glyph = query('.hub-icon__glyph') as HTMLElement;
		expect(glyph.classList.contains('fa-brands')).toBe(true);
		expect(glyph.classList.contains('fa-github')).toBe(true);
	});

	it('exposes an accessible label as role=img + aria-label', () => {
		render({ name: 'house', label: 'Home' });

		expect(root().getAttribute('role')).toBe('img');
		expect(root().getAttribute('aria-label')).toBe('Home');
		expect(root().getAttribute('aria-hidden')).toBeNull();
	});

	it('marks a label-less icon as decorative (aria-hidden)', () => {
		render({ name: 'house' });

		expect(root().getAttribute('aria-hidden')).toBe('true');
		expect(root().getAttribute('role')).toBeNull();
	});

	it('writes size and color to the host custom properties', () => {
		render({ name: 'house', size: '2rem', color: 'rebeccapurple' });

		expect(root().style.getPropertyValue('--hub-icon-size')).toBe('2rem');
		expect(root().style.getPropertyValue('--hub-icon-color')).toBe('rebeccapurple');
	});

	it('fails soft (no throw) when the pack is unknown', () => {
		expect(() => render({ name: 'house', pack: 'missing' })).not.toThrow();
		expect(query('.hub-icon__glyph')).toBeTruthy();
	});
});
