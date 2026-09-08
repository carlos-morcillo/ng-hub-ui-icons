import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HubIconComponent } from '../components/icon/icon.component';
import { HubIconDirective } from '../directives/icon.directive';
import { faPack } from '../packs/font-awesome';
import { provideHubIcons } from '../services/icons-config';

/**
 * The library's stylesheet is injected at RUNTIME, so it always lands after the sheet the
 * consuming application shipped. This one is appended at module scope — before any component
 * is created and therefore before Angular appends the library's own — so the document is in
 * the order the defect needs: consumer first, library second. Appending it inside a test
 * would put it after the library sheet from the second test onwards and let source order
 * hand the utility a win it had not earned.
 */
const consumerSheet = document.createElement('style');

consumerSheet.textContent = `
	.text-danger { color: rgb(220, 53, 69); }
	.brand-ink { color: rgb(0, 128, 96); }
`;
document.head.appendChild(consumerSheet);

@Component({
	imports: [HubIconComponent, HubIconDirective],
	template: `
		<hub-icon class="text-danger" name="house" />
		<hub-icon class="brand-ink" name="house" />
		<hub-icon class="text-danger" name="house" color="rgb(1, 2, 3)" />
		<hub-icon class="undressed" name="house" />
		<i hubIcon name="house" class="text-danger"></i>
	`
})
class CascadeHostComponent {}

describe('a consumer colour utility on an icon', () => {
	let host: HTMLElement;

	/** The colour the cascade actually settles on for the nth icon of the template. */
	const colorOf = (selector: string): string => getComputedStyle(host.querySelector(selector) as HTMLElement).color;

	beforeEach(async () => {
		TestBed.resetTestingModule();
		await TestBed.configureTestingModule({
			imports: [CascadeHostComponent],
			providers: [provideHubIcons({ defaultPack: 'fa', packs: { fa: faPack() } })]
		}).compileComponents();

		const fixture = TestBed.createComponent(CascadeHostComponent);

		host = fixture.nativeElement as HTMLElement;
		document.body.appendChild(host);
		fixture.detectChanges();
	});

	it('wins over the primitive, which is the whole point of writing it', () => {
		expect(colorOf('hub-icon.text-danger:not([color])')).toBe('rgb(220, 53, 69)');
	});

	/**
	 * The class the library has never heard of. A fix that taught `ng-hub-ui-ds` to
	 * out-specify the icon would pass the test above and fail this one, leaving broken every
	 * utility a consumer writes for themselves.
	 */
	it('wins even when the library has never heard of the class', () => {
		expect(colorOf('hub-icon.brand-ink')).toBe('rgb(0, 128, 96)');
	});

	it('wins on the directive form too, which dresses the consumer own element', () => {
		expect(colorOf('i[hubIcon]')).toBe('rgb(220, 53, 69)');
	});

	/**
	 * The per-instance input is the deliberate, typed choice of whoever wrote that one icon,
	 * so it outranks a class the element also happens to carry — the way an inline style
	 * outranks a class everywhere else in CSS.
	 */
	it('loses to the color input, which was written for this icon and no other', () => {
		expect(colorOf('hub-icon[color]')).toBe('rgb(1, 2, 3)');
	});

	/**
	 * And with no utility in play the token still drives the colour: the defect is not fixed
	 * by deleting the declaration, which would leave `--hub-icon-color` theming nothing.
	 */
	it('leaves the token in charge of an icon nobody dressed', () => {
		expect(colorOf('hub-icon.undressed')).toBe('var(--hub-icon-color)');
	});
});
