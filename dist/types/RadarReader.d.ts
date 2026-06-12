import type { ParseCtor } from './parse/base/Registry';
import type IParse from './parse/base/IParse';
import Reader from './parse/reader/Reader';
import type { GeoJsonOptions } from './parse/reader/IBaseReader';
declare class RadarReader extends Reader {
    result: unknown;
    parser: IParse | null;
    constructor(filePath?: string);
    registryParser(map: Map<number, ParseCtor>): void;
    parse(): Promise<unknown>;
    getDefaultLegend(): {
        colors: string[];
        levels: string[];
    };
    drawCanvas(...args: Parameters<NonNullable<IParse['drawCanvas']>>): HTMLCanvasElement | undefined;
    getBounds(): import("./parse/reader/IBaseReader").BoundBox | undefined;
    drawGrayCanvas(...args: Parameters<NonNullable<IParse['drawGrayCanvas']>>): HTMLCanvasElement | undefined;
    getGeoJson(level: (number | string)[], options?: GeoJsonOptions): import("geojson").FeatureCollection<import("geojson").Geometry, import("geojson").GeoJsonProperties> | undefined;
}
export default RadarReader;
