import { HubIconPack } from '../models/icon-pack';

/** Options for {@link svgPack}. */
export interface SvgPackOptions {
	/**
	 * Resolves an icon name (and optional variant) to inline SVG markup. Return
	 * `null`/`undefined` for unknown icons. Takes precedence over {@link map}.
	 */
	resolve?: (name: string, variant?: string) => string | null | undefined;
	/** Static `name → svg` lookup, used when {@link SvgPackOptions.resolve} is absent. */
	map?: Readonly<Record<string, string>>;
	/** Variant applied when a call site omits one. */
	defaultVariant?: string;
}

/**
 * Creates an inline-SVG icon pack. SVG markup comes from developer-provided
 * configuration (a map or a resolver) and is treated as trusted.
 *
 * @param options - A resolver and/or a static map, plus optional defaults.
 * @returns A {@link HubIconPack}.
 * @throws If no SVG can be resolved for the requested name.
 */
export function svgPack(options: SvgPackOptions): HubIconPack {
	return {
		defaultVariant: options.defaultVariant,
		resolve(name: string, variant?: string) {
			const svg = options.resolve ? options.resolve(name, variant ?? options.defaultVariant) : options.map?.[name];
			if (!svg) {
				throw new Error(`[ng-hub-ui-icons] svgPack: no SVG registered for "${name}".`);
			}
			return { kind: 'svg', svg };
		}
	};
}
