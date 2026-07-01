import { TestBed } from '@angular/core/testing';
import { HubIconClassesSpec } from '../models/icon-render-spec';
import { bootstrapPack } from '../packs/bootstrap';
import { faPack } from '../packs/font-awesome';
import { materialSymbolsPack } from '../packs/material-symbols';
import { HubIconRegistry } from './icon-registry.service';
import { provideHubIcons } from './icons-config';

/** Builds a registry backed by the given provider config. */
function registryWith(config: Parameters<typeof provideHubIcons>[0]): HubIconRegistry {
	TestBed.configureTestingModule({ providers: [provideHubIcons(config)] });
	return TestBed.inject(HubIconRegistry);
}

describe('HubIconRegistry', () => {
	afterEach(() => TestBed.resetTestingModule());

	it('resolves through the configured default pack', () => {
		const registry = registryWith({ defaultPack: 'fa', packs: { fa: faPack() } });
		expect((registry.resolve('house') as HubIconClassesSpec).classes).toBe('fa-solid fa-house');
	});

	it('resolves an explicitly named pack', () => {
		const registry = registryWith({ defaultPack: 'fa', packs: { fa: faPack(), bi: bootstrapPack() } });
		expect((registry.resolve('house', 'bi') as HubIconClassesSpec).classes).toBe('bi bi-house');
	});

	it('expands the pack:variant:name shorthand', () => {
		const registry = registryWith({ packs: { fa: faPack() } });
		expect((registry.resolve('fa:brands:github') as HubIconClassesSpec).classes).toBe('fa-brands fa-github');
	});

	it('expands the pack:name shorthand', () => {
		const registry = registryWith({ packs: { bi: bootstrapPack() } });
		expect((registry.resolve('bi:house') as HubIconClassesSpec).classes).toBe('bi bi-house');
	});

	it('lets explicit arguments win over the shorthand', () => {
		const registry = registryWith({ packs: { fa: faPack(), bi: bootstrapPack() } });
		// shorthand says fa:solid, explicit args force bi + (bi ignores variant)
		expect((registry.resolve('fa:solid:house', 'bi', 'regular') as HubIconClassesSpec).classes).toBe('bi bi-house');
	});

	it('applies the pack default variant when none is given', () => {
		const registry = registryWith({ packs: { ms: materialSymbolsPack({ variant: 'rounded' }) } });
		expect((registry.resolve('home', 'ms') as HubIconClassesSpec).classes).toBe('material-symbols-rounded');
	});

	it('throws when no pack and no defaultPack are available', () => {
		const registry = registryWith({ packs: { fa: faPack() } });
		expect(() => registry.resolve('house')).toThrowError(/No icon pack specified/);
	});

	it('throws with the registered packs listed for an unknown pack', () => {
		const registry = registryWith({ defaultPack: 'fa', packs: { fa: faPack() } });
		expect(() => registry.resolve('house', 'nope')).toThrowError(/Unknown icon pack "nope".*fa/);
	});

	it('exposes a pack cssVars bridge', () => {
		const registry = registryWith({
			defaultPack: 'x',
			packs: { x: { resolve: () => ({ kind: 'classes', classes: 'x' }), cssVars: { '--x': 'var(--hub-icon-color)' } } }
		});
		expect(registry.cssVars()).toEqual({ '--x': 'var(--hub-icon-color)' });
		expect(registry.cssVars('x')).toEqual({ '--x': 'var(--hub-icon-color)' });
	});
});
