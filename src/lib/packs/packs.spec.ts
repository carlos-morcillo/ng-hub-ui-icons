import { HubIconClassesSpec, HubIconSvgSpec } from '../models/icon-render-spec';
import { bootstrapPack } from './bootstrap';
import { classPack } from './class-pack';
import { faPack } from './font-awesome';
import { ligaturePack } from './ligature-pack';
import { materialSymbolsPack } from './material-symbols';
import { solarPack } from './solar';
import { svgPack } from './svg-pack';

describe('icon packs', () => {
	describe('faPack', () => {
		it('defaults to the solid family', () => {
			expect(faPack().resolve('house')).toEqual({ kind: 'classes', classes: 'fa-solid fa-house' });
		});

		it('honours a configured default variant', () => {
			expect(faPack({ defaultVariant: 'regular' }).resolve('house')).toEqual({
				kind: 'classes',
				classes: 'fa-regular fa-house'
			});
		});

		it('lets the call site override the variant', () => {
			expect(faPack().resolve('github', 'brands')).toEqual({ kind: 'classes', classes: 'fa-brands fa-github' });
		});

		it('does not double-prefix a fully-qualified name', () => {
			expect((faPack().resolve('fa-house') as HubIconClassesSpec).classes).toBe('fa-solid fa-house');
		});
	});

	describe('bootstrapPack', () => {
		it('produces the bi class pair', () => {
			expect(bootstrapPack().resolve('house')).toEqual({ kind: 'classes', classes: 'bi bi-house' });
		});

		it('keeps -fill names intact', () => {
			expect((bootstrapPack().resolve('house-fill') as HubIconClassesSpec).classes).toBe('bi bi-house-fill');
		});

		it('does not double-prefix', () => {
			expect((bootstrapPack().resolve('bi-house') as HubIconClassesSpec).classes).toBe('bi bi-house');
		});
	});

	describe('materialSymbolsPack', () => {
		it('renders a ligature with the outlined family by default', () => {
			expect(materialSymbolsPack().resolve('home')).toEqual({
				kind: 'classes',
				classes: 'material-symbols-outlined',
				text: 'home'
			});
		});

		it('honours a configured family', () => {
			expect((materialSymbolsPack({ variant: 'rounded' }).resolve('home') as HubIconClassesSpec).classes).toBe(
				'material-symbols-rounded'
			);
		});

		it('lets the call site override the family', () => {
			expect((materialSymbolsPack().resolve('home', 'sharp') as HubIconClassesSpec).classes).toBe(
				'material-symbols-sharp'
			);
		});
	});

	describe('solarPack', () => {
		it('defaults to the linear style with a two-class output', () => {
			expect(solarPack().resolve('home')).toEqual({ kind: 'classes', classes: 'solar-linear solar-home' });
		});

		it('honours a configured variant', () => {
			expect((solarPack({ variant: 'bold' }).resolve('home') as HubIconClassesSpec).classes).toBe(
				'solar-bold solar-home'
			);
		});

		it('supports a template override', () => {
			const pack = solarPack({ template: (name, variant) => `si si-${name}-${variant}` });
			expect((pack.resolve('home', 'broken') as HubIconClassesSpec).classes).toBe('si si-home-broken');
		});
	});

	describe('generic factories', () => {
		it('classPack applies the template with the resolved variant', () => {
			const pack = classPack({ defaultVariant: 'a', template: (name, variant) => `set set-${name}-${variant}` });
			expect((pack.resolve('star') as HubIconClassesSpec).classes).toBe('set set-star-a');
			expect((pack.resolve('star', 'b') as HubIconClassesSpec).classes).toBe('set set-star-b');
		});

		it('ligaturePack carries the name as text', () => {
			const pack = ligaturePack({ baseClass: 'glyphs' });
			expect(pack.resolve('home')).toEqual({ kind: 'classes', classes: 'glyphs', text: 'home' });
		});

		it('svgPack resolves from a static map', () => {
			const pack = svgPack({ map: { home: '<svg id="home"></svg>' } });
			expect((pack.resolve('home') as HubIconSvgSpec).svg).toBe('<svg id="home"></svg>');
		});

		it('svgPack prefers a resolver over the map', () => {
			const pack = svgPack({ resolve: (name) => `<svg id="${name}"></svg>`, map: { home: 'unused' } });
			expect((pack.resolve('star') as HubIconSvgSpec).svg).toBe('<svg id="star"></svg>');
		});

		it('svgPack throws for an unknown icon', () => {
			expect(() => svgPack({ map: {} }).resolve('missing')).toThrowError(/no SVG registered for "missing"/);
		});
	});
});
