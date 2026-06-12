import type { BoundBox } from './IBaseReader';
export default class ToolsReader {
    static readonly R = 6378137;
    static readonly RAD2DEG: number;
    static readonly DEG2RAD: number;
    static getColorByValue(z: number | string, level: (number | string)[], color: (number[] | string)[]): string;
    static getLevelIndexByValue(value: number, level: (number | string)[]): number;
    protected static metersToLatitude(meters: number): number;
    protected static metersToLongitude(meters: number, latitude: number): number;
    static getGridBoundsFromCenter(latitude: number, longitude: number, rowSideLength: number, columnSideLength: number, rowCellSize: number, columnCellSize: number): BoundBox;
    static DataTypeMap: Record<number, string>;
    static getDataTypeName(dataType: number): string;
}
