import type IParse from './IParse';
export type ParseCtor = new (dv: DataView, littleEndian: boolean, offset: number) => IParse;
declare class ParseRegistry {
    private map;
    constructor();
    register(productType: number, loader: ParseCtor): void;
    getParser(productType: number): Promise<ParseCtor | null>;
}
declare const _default: ParseRegistry;
export default _default;
