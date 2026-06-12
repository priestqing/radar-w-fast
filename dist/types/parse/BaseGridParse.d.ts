import type { DrawParams, ProductParamsByTypeMap, ProductParamsType } from './reader/IBaseReader';
import type IParse from './base/IParse';
import Reader from './reader/Reader';
type GridParseResult = GridHeadType & {
    data: number[];
};
export default class BaseGridParse extends Reader implements IParse {
    dataStartOffset: number;
    parseResult: GridParseResult | null;
    constructor(dv: DataView, littleEndian: boolean, dataStartOffset: number);
    parse(): number[];
    drawCanvas(_params: ProductParamsType<keyof ProductParamsByTypeMap>, _level: (number | string)[], _color: (number[] | string)[], _drawParams?: DrawParams): HTMLCanvasElement;
    drawGrayCanvas(_drawParams?: DrawParams): HTMLCanvasElement;
    getGridHeadView(offset: number): GridHeadType;
    getBounds(centerLatitude: number, centerLongitude: number): import("./reader/IBaseReader").BoundBox;
}
/**
 * 格网数据头部信息 , 数据块的读取是横向优先, 然后纵向读取
 */
export interface GridHeadType {
    /**
     * 数据类型 INT (1～64) 数据类型见表 2-7
     */
    dataType: number;
    /**
     * 比例 INT  (0～32768) 数据编码比例
     */
    scale: number;
    /**
     * 偏移量 INT  (0～32768) 数据编码偏移量
     */
    offset: number;
    /**
     * 库长 SHORT Byte (1～2) 数据存储占用的字节数
     */
    binLength: number;
    /**
     * 标志位 SHORT  数据掩码标志位，暂时保留。
     */
    flags: number;
    /**
     * 横轴分辨率 INT Meter 米
     */
    rowResolution: number;
    /**
     * 纵轴分辨率 INT Meter 米
     */
    columnResolution: number;
    /**
     * 横轴边长 INT
     */
    rowSideLength: number;
    /**
     * 纵轴边长 INT
     */
    columnSideLength: number;
    /**
     * 最大值 INT  数据块中的最大编码值
     */
    maximumData: number;
    /**
     * 最大值距离 INT Meter 米 (0～500,000)
     */
    rangeOfMaximumValue: number;
    /**
     * 最大值方位角 FLOAT Degree 度 (0.00～360.00)
     */
    azimuthOfMaximumValue: number;
    /**
     * 最小值 INT  数据块中的最小值的编码值
     */
    minimumData: number;
    /**
     * 最小值距离 INT Meter 米 (0～500,000)
     */
    rangeOfMinimumValue: number;
    /**
     * 最小值方位角 FLOAT Degree 度 (0.00～360.00)
     */
    azimuthOfMinimumValue: number;
    /**
     * 保留 8 Bytes
     */
    reserved: string;
}
export {};
