import BinaryReader from './BinaryReader';
import type { BaseHeadersType, BaseScanType, BaseStationType, BaseTaskType, IRadarReader, ProductHeadType, ProductParamsByTypeMap, ProductParamsType, RadarConfig, BaseType } from './IBaseReader';
export default class BaseReader extends BinaryReader implements IRadarReader {
    filePath: string;
    magicNumber: number;
    dataStartOffset: number;
    stationInfo: BaseStationType | null;
    base: BaseType;
    radarBaseInfo: RadarBaseInfoType;
    constructor(filePath?: string);
    start(config?: RadarConfig): Promise<void>;
    /**
     * 通用头块 32字节
     */
    getHeadView(offset: number): BaseHeadersType;
    /**
     * 站点配置块 128字节
     */
    getStationView(offset: number): BaseStationType;
    /**
     * 任务配置块 256字节
     */
    getTaskView(offset: number): BaseTaskType;
    /**
     * 扫描配置块 256字节
     */
    getScanView(offset: number): BaseScanType;
    /**dataType
     * 产品头块 128字节
     * @param offset
     */
    getProductHeadView(offset: number): ProductHeadType;
    /**
     * 产品参数块, 固定长度64字节, 不够的剩余字节是空. 每个产品有不同的参数结构
     * 这里暂时只写了 PPI 产品的参数结构
     * @param offset
     * @param productType
     */
    getProductParamsView<T extends keyof ProductParamsByTypeMap>(offset: number, productType: keyof ProductParamsByTypeMap): ProductParamsType<T> | null;
}
interface RadarBaseInfoType {
    productType: number | null;
    productParams: ProductParamsType<keyof ProductParamsByTypeMap> | null;
}
export {};
