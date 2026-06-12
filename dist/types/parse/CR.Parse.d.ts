import type { DrawParams, ProductParamsByTypeMap, ProductParamsType } from './reader/IBaseReader';
import BaseGridParse from './BaseGridParse';
import type { FeatureCollection } from 'geojson';
export default class CRParse extends BaseGridParse {
    constructor(dv: DataView, littleEndian: boolean, dataStartOffset: number);
    drawCanvas(_params: ProductParamsType<keyof ProductParamsByTypeMap>, level: (number | string)[], color: (number[] | string)[], drawParams?: DrawParams): HTMLCanvasElement;
    drawGrayCanvas(drawParams?: DrawParams): HTMLCanvasElement;
    getGeoJson(level: (number | string)[]): FeatureCollection;
}
