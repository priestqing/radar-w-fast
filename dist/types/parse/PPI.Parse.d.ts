import type IParse from './base/IParse';
import type { BoundBox, DrawParams, GeoJsonOptions, ProductParamsByTypeMap, ProductParamsType } from './reader/IBaseReader';
import Reader from './reader/Reader';
import type { FeatureCollection } from 'geojson';
interface RadialDataPoint {
    angle: number;
    data: number[];
}
export type PPIParseResult = RadialHeadType & {
    data: RadialDataPoint[];
};
export default class PPIParser extends Reader implements IParse {
    dataStartOffset: number;
    parseResult: PPIParseResult | null;
    constructor(dv: DataView, littleEndian: boolean, dataStartOffset: number);
    parse(): {
        data: RadialDataPoint[];
        /**
         * 数据类型 INT 4字节 (1～64) 数据类型见表2-6
         */
        dataType: number;
        /**
         * 比例 INT 4字节 数据编码比例
         */
        scale: number;
        /**
         * 偏移量 INT 4字节 数据编码偏移量
         */
        offset: number;
        /**
         * 库长 SHORT 2字节 (1～2) 保存的数据占用的字节数
         */
        binLength: number;
        /**
         * 标志位 SHORT 2字节  数据掩码标志位，暂时保留。
         */
        flags: number;
        /**
         * 分辨率 INT 4字节 Meter 米 (1～20,000) 径向数据的库长分辨率
         */
        resolution: number;
        /**
         * 起始距离 INT 4字节 Meter 米 (0～500,000) 用户请求的数据起始距离
         */
        startRange: number;
        /**
         * 最大范围 INT 4字节 Meter 米 (1～500,000) 请求的数据的最大距离
         */
        maxRange: number;
        /**
         * 径向个数 INT 4字节 (1～32768) 在数据块中的径向个数
         */
        numberOfRadials: number;
        /**
         * 最大值 INT 4字节 数据块中的最大编码值
         */
        maximumValue: number;
        /**
         * 最大值距离 INT 4字节 Meter 米 (0～500,000)
         */
        rangeOfMaximumValue: number;
        /**
         * 最大值方位角 FLOAT 4字节 Degree 度 (0.00～360.00)
         */
        azimuthOfMaximumValue: number;
        /**
         * 最小值 INT 4字节 数据块中的最小值的编码值
         */
        minimumValue: number;
        /**
         * 最小值距离 INT 4字节 Meter 米 (0～500,000)
         */
        rangeOfMinimumValue: number;
        /**
         * 最小值方位角 FLOAT 4字节 Degree 度 (0.00～360.00)
         */
        azimuthOfMinimumValue: number;
        /**
         * 保留 8字节
         */
        reserved: string;
    };
    drawCanvas(_params: ProductParamsType<keyof ProductParamsByTypeMap>, level: (number | string)[], color: (number[] | string)[]): HTMLCanvasElement;
    drawGrayCanvas(drawParams?: DrawParams): HTMLCanvasElement;
    getRadialHeadView(offset: number): RadialHeadType;
    /**
     * 径向数据块的基础信息 32字节
     * @param offset
     */
    getRadialBaseView(offset: number): RadialDataBaseType;
    getBounds(centerLatitude: number, centerLongitude: number): BoundBox;
    getGeoJson(level: (number | string)[], options?: GeoJsonOptions): FeatureCollection;
}
/**
 * 径向头块 64字节
 */
export interface RadialHeadType {
    /**
     * 数据类型 INT 4字节 (1～64) 数据类型见表2-6
     */
    dataType: number;
    /**
     * 比例 INT 4字节 数据编码比例
     */
    scale: number;
    /**
     * 偏移量 INT 4字节 数据编码偏移量
     */
    offset: number;
    /**
     * 库长 SHORT 2字节 (1～2) 保存的数据占用的字节数
     */
    binLength: number;
    /**
     * 标志位 SHORT 2字节  数据掩码标志位，暂时保留。
     */
    flags: number;
    /**
     * 分辨率 INT 4字节 Meter 米 (1～20,000) 径向数据的库长分辨率
     */
    resolution: number;
    /**
     * 起始距离 INT 4字节 Meter 米 (0～500,000) 用户请求的数据起始距离
     */
    startRange: number;
    /**
     * 最大范围 INT 4字节 Meter 米 (1～500,000) 请求的数据的最大距离
     */
    maxRange: number;
    /**
     * 径向个数 INT 4字节 (1～32768) 在数据块中的径向个数
     */
    numberOfRadials: number;
    /**
     * 最大值 INT 4字节 数据块中的最大编码值
     */
    maximumValue: number;
    /**
     * 最大值距离 INT 4字节 Meter 米 (0～500,000)
     */
    rangeOfMaximumValue: number;
    /**
     * 最大值方位角 FLOAT 4字节 Degree 度 (0.00～360.00)
     */
    azimuthOfMaximumValue: number;
    /**
     * 最小值 INT 4字节 数据块中的最小值的编码值
     */
    minimumValue: number;
    /**
     * 最小值距离 INT 4字节 Meter 米 (0～500,000)
     */
    rangeOfMinimumValue: number;
    /**
     * 最小值方位角 FLOAT 4字节 Degree 度 (0.00～360.00)
     */
    azimuthOfMinimumValue: number;
    /**
     * 保留 8字节
     */
    reserved: string;
}
/**
 * 径向数据块的基础信息 32字节
 */
export interface RadialDataBaseType {
    /**
     * 起始方位角 FLOAT 度 (0.00～360.00)
     */
    startAngle: number;
    /**
     * 径向角度宽度 FLOAT 度 (0.00～2.00)
     */
    angularWidth: number;
    /**
     * 库数 INT (1～4096)
     */
    numberOfBins: number;
    /**
     * 保留 20字节
     */
    reserved: string;
}
export {};
