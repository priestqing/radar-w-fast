import type { BoundBox, DrawParams, GeoJsonOptions, ProductParamsByTypeMap, ProductParamsType } from '../reader/IBaseReader';
import type IReader from '../reader/IReader';
import type Reader from '../reader/Reader';
import type { FeatureCollection } from 'geojson';
export default interface IParse extends IReader {
    parse: () => unknown;
    drawCanvas?: (params: ProductParamsType<keyof ProductParamsByTypeMap>, level: (number | string)[], color: (number[] | string)[], drawParams?: DrawParams) => HTMLCanvasElement;
    getBounds?: (lat: number, lon: number) => BoundBox;
    drawGrayCanvas?: (drawParams?: DrawParams) => HTMLCanvasElement;
    syncContextFrom?: (reader: Reader) => void;
    getGeoJson?: (level: (number | string)[], options?: GeoJsonOptions) => FeatureCollection;
}
