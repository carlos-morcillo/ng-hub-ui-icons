import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bootstrapPack } from '../packs/bootstrap';
import { faPack } from '../packs/font-awesome';
import { materialSymbolsPack } from '../packs/material-symbols';
import { svgPack } from '../packs/svg-pack';
import { provideHubIcons } from '../services/icons-config';
import { HubIconDirective } from './icon.directive';

/**
 * Host applying `[hubIcon]` to an element that keeps its own class. Uses signal
 * inputs so tests can drive them reliably with `componentRef.setInput`.
 */
@Component({
	standalone: true,
	imports: [HubIconDirective],
	template: `<i class="keep" hubIcon [name]="name()" [pack]="pack()" [variant]="variant()"></i>`
})
class DirectiveHostComponent {
	readonly name = input('house');
	readonly pack = input<string | undefined>(undefined);
	readonly variant = input<string | undefined>(undefined);
}

describe('HubIconDirective', () => {
	let fixture: ComponentFixture<DirectiveHostComponent>;

	const el = (): HTMLElement => fixture.nativeElement.querySelector('i');

	const setInput = (name: string, value: unknown): void => fixture.componentRef.setInput(name, value);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [DirectiveHostComponent],
			providers: [
				provideHubIcons({
					defaultPack: 'fa',
					packs: {
						fa: faPack(),
						bi: bootstrapPack(),
						ms: materialSymbolsPack(),
						svg: svgPack({ map: { star: '<svg data-testid="star"></svg>' } })
					}
				})
			]
		});

		fixture = TestBed.createComponent(DirectiveHostComponent);
		fixture.detectChanges();
	});

	afterEach(() => TestBed.resetTestingModule());

	it('adds the resolved classes while keeping the host class and base class', () => {
		const node = el();
		expect(node.classList.contains('keep')).toBe(true);
		expect(node.classList.contains('hub-icon')).toBe(true);
		expect(node.classList.contains('fa-solid')).toBe(true);
		expect(node.classList.contains('fa-house')).toBe(true);
	});

	it('swaps classes on change without leaking the previous pack classes', () => {
		setInput('pack', 'bi');
		fixture.detectChanges();

		const node = el();
		expect(node.classList.contains('fa-solid')).toBe(false);
		expect(node.classList.contains('fa-house')).toBe(false);
		expect(node.classList.contains('bi')).toBe(true);
		expect(node.classList.contains('bi-house')).toBe(true);
		expect(node.classList.contains('keep')).toBe(true);
	});

	it('writes the ligature text for a ligature pack', () => {
		setInput('name', 'home');
		setInput('pack', 'ms');
		fixture.detectChanges();

		const node = el();
		expect(node.classList.contains('material-symbols-outlined')).toBe(true);
		expect(node.textContent?.trim()).toBe('home');
	});

	it('injects inline SVG for an svg pack', () => {
		setInput('name', 'star');
		setInput('pack', 'svg');
		fixture.detectChanges();

		expect(el().querySelector('svg[data-testid="star"]')).toBeTruthy();
	});

	it('clears content when the name becomes empty', () => {
		setInput('name', '');
		fixture.detectChanges();

		expect(el().textContent).toBe('');
		expect(el().classList.contains('fa-house')).toBe(false);
	});
});
