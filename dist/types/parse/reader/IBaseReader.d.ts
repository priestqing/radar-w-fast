export interface IRadarReader {
    filePath: string;
    start: (config: RadarConfig) => Promise<void>;
    /**
     * 通用头块
     * @param offset
     */
    getHeadView: (offset: number) => BaseHeadersType;
    /**
     * 站点配置块
     * @param offset
     */
    getStationView: (offset: number) => BaseStationType;
    /**
     * 任务配置块
     */
    getTaskView: (offset: number) => BaseTaskType;
    /**
     * 扫描配置块
     */
    getScanView: (offset: number) => BaseScanType;
    /**
     * 产品头块
     */
    getProductHeadView: (offset: number) => ProductHeadType;
    /**
     * 产品参数块
     */
    getProductParamsView: <T extends keyof ProductParamsByTypeMap>(offset: number, productType: keyof ProductParamsByTypeMap) => ProductParamsType<T> | null;
}
export interface RadarConfig {
    magic: number;
}
export interface FieldTypeMap {
    INT: number;
    SHORT: number;
    INT8: number;
    CHAR: string;
    FLOAT: number;
    LONG: bigint;
    UINT8: number;
    UINT16: number;
    UINT32: number;
    UINT64: bigint;
}
/**
 * 文件头 32字节
 */
export interface BaseHeadersType {
    /**
     * 魔术字 INT 4字节 固定标志，用来指示雷达数据文件。(0x4D545352)
     */
    magicNumber: number;
    /**
     * 主版本号 SHORT 2字节 (0～65536)
     */
    majorVersion: number;
    /**
     * 次版本号 SHORT 2字节 (0～65536)
     */
    minorVersion: number;
    /**
     * 文件类型 INT 4字节 (1～2) 1-基数据文件, 2-气象产品文件
     */
    genericType: number;
    /**
     * 产品类型 INT 4字节 (1～100) 文件类型为1时此字段无效。
     */
    productType: number;
    /**
     * 保留字段 16字节
     */
    reserved: string;
}
/**
 * 站点配置块 128字节
 */
export interface BaseStationType {
    /**
     * 站号 具有唯一性，用来区别不同的雷达站. CHAR 8字节
     */
    siteCode: string;
    /**
     * 站点名称 如BeiJing. CHAR 32字节
     */
    siteName: string;
    /**
     * 纬度 FLOAT 4字节 度 (-90.000000～90.000000) 雷达站天线所在位置纬度
     */
    latitude: number;
    /**
     * 经度 FLOAT 4字节 度 (-180.000000～180.000000) 雷达站天线所在位置经度
     */
    longitude: number;
    /**
     * 天线高度 INT 4字节 米 (0～9000) 天线馈源水平时海拔高度
     */
    antennaHeight: number;
    /**
     * 地面高度 INT 4字节 米 (0～9000) 雷达塔楼地面海拔高度
     */
    groundHeight: number;
    /**
     * 工作频率 FLOAT 4字节 MHz (1.00～999,000.00)
     */
    frequency: number;
    /**
     * 水平波束宽度 FLOAT 4字节 Degree (0.10～2.00)
     */
    beamWidthHori: number;
    /**
     * 垂直波束宽度 FLOAT 4字节 Degree (0.10～2.00)
     */
    beamWidthVert: number;
    /**
     * RDA版本号 INT 4字节 雷达数据采集软件版本号
     */
    rdaVersion: number;
    /**
     * 雷达类型 SHORT 2字节
     * 1–SA
     * 2–SB
     * 3–SC
     * 4–SAD
     * 11-YLD1-D
     * 12-YLD2-D
     * 13-YLD3-D
     * 14-YLD4-D
     * 15-YLD5-D
     * 16-YLD6-D
     * 17-YLD7-D
     * 18-YLD8-D
     * 19-YTD2
     * 33–CA
     * 34–CB
     * 35–CC
     * 36–CCJ
     * 37–CD
     * 38-CAD
     * 39-CBD
     * 40-CCD
     * 41-CCJD
     * 42-CDD
     * 65-XA
     * 66-XAD
     */
    radarType: number;
    /**
     * 天线增益 SHORT 2字节 dB (100-10000 编码为实际100倍)
     */
    antennaGain: number;
    /**
     * 发射馈线损耗 SHORT 2字节 dB (-1000～0 编码为实际损耗100倍)
     */
    transmittingFeederLoss: number;
    /**
     * 接收馈线损耗 SHORT 2字节 dB (-1000～0 编码为实际损耗100倍)
     */
    receivingFeederLoss: number;
    /**
     * 其他损耗 SHORT 2字节 dB (-1000～0 编码为实际损耗100倍)
     */
    otherLoss: number;
    /**
     * 保留字段 46字节
     */
    reserved: string;
}
/**
 * 任务配置块 256字节
 */
export interface BaseTaskType {
    /**
     * 任务名称 CHAR 32字节 如VCP21
     */
    taskName: string;
    /**
     * 任务描述 CHAR 128字节
     */
    taskDescription: string;
    /**
     * 极化方式 INT 4字节 (1～4)
     * 1 – 水平极化
     * 2 – 垂直极化
     * 3 – 水平/垂直同时
     * 4 – 水平/垂直交替
     * 5  - 水平发射/水平垂直接收
     */
    polarizationType: number;
    /**
     * 扫描任务类型 INT 4字节 (0～6)
     * 0 – 体扫
     * 1 – 单层PPI
     * 2 – 单层RHI
     * 3 – 单层扇扫
     * 4 – 扇体扫
     * 5 – 多层RHI
     * 6 – 手工扫描
     */
    scanType: number;
    /**
     * 脉冲宽度 INT 4字节 纳秒 发射脉冲宽度 (1～10000)
     */
    pulseWidth: number;
    /**
     * 扫描开始时间 INT 4字节 秒 扫描开始时间为UTC标准时间计数,1970年1月1日0时为起始计数基准点 (0～)
     */
    scanStartTime: number;
    /**
     * 扫描层数 INT 4字节 根据扫描任务类型确定的扫描层数 (1～256)
     */
    cutNumber: number;
    /**
     * 水平通道噪声 FLOAT 4字节 dBm 水平通道的噪声电平 (-100.00～0.00)
     */
    horizontalNoise: number;
    /**
     * 垂直通道噪声 FLOAT 4字节 dBm 垂直通道的噪声电平 (-100.00～0.00)
     */
    verticalNoise: number;
    /**
     * 水平通道标定值 FLOAT 4字节 dB 水平通道的反射率标定常数 (0.00～200.00)
     */
    horizontalCalibration: number;
    /**
     * 垂直通道标定值 FLOAT 4字节 dB 垂直通道的反射率标定常数 (0.00～200.00)
     */
    verticalCalibration: number;
    /**
     * 水平通道噪声温度 FLOAT 4字节 K 开氏温标 (0.00～800.00)
     */
    horizontalNoiseTemperature: number;
    /**
     * 垂直通道噪声温度 FLOAT 4字节 K 开氏温标 (0.00～800.00)
     */
    verticalNoiseTemperature: number;
    /**
     * ZDR标定偏差 FLOAT 4字节 dB (-10.00～10.00)
     */
    zdrCalibration: number;
    /**
     * 差分相移标定偏差 FLOAT 4字节 Degree 度 (-180.00～180.00)
     */
    phidpCalibration: number;
    /**
     * 系统LDR标定偏差 FLOAT 4字节 dB (-60～0)
     */
    ldrCalibration: number;
    /**
     * 保留字段 40字节
     */
    reserved: string;
}
/**
 * 扫描配置块 256字节
 */
export interface BaseScanType {
    /**
     * 处理模式 INT 4字节 (1～2)
     * 1 - PPP
     * 2 - FFT
     */
    processMode: number;
    /**
     * 波形类别 INT 4字节 (0～6)
     * 0 – CS连续监测
     * 1 – CD连续多普勒
     * 2 – CDX多普勒扩展
     * 3 – Rx Test
     * 4 – BATCH批模式
     * 5 – Dual PRF双PRF
     * 6 -  Staggered PRT 参差PRT
     */
    waveForm: number;
    /**
     * 脉冲重复频率1 FLOAT 4字节 Hz (1～3000)
     * 对于Batch、双PRF和参差PRT模式，表示高PRF值。
     * 对于其它单PRF模式，表示唯一的PRF值。
     */
    prf1: number;
    /**
     * 脉冲重复频率2 FLOAT 4字节 Hz (1～3000)
     * 对于Batch、双PRF和参差PRT模式，表示低PRF值。
     * 对其它单PRF模式，无效。
     */
    prf2: number;
    /**
     * 速度退模糊方法 INT 4字节 (1～4)
     * 1 – 单PRF
     * 2 – 双PRF3:2模式
     * 3 – 双PRF4:3模式
     * 4 – 双PRF 5:4模式
     */
    dealiasingMode: number;
    /**
     * 方位角 FLOAT 4字节 Degree 度 (0.00～360.00) RHI模式的方位角
     */
    azimuth: number;
    /**
     * 俯仰角 FLOAT 4字节 Degree 度 (-2.00～90.00) PPI模式的俯仰角
     */
    elevation: number;
    /**
     * 起始角度 FLOAT 4字节 Degree 度 (-10.00～360.00) PPI扇扫的起始方位角，或RHI模式的高限仰角
     */
    startAngle: number;
    /**
     * 结束角度 FLOAT 4字节 Degree 度 (-10.00～360.00) PPI扇扫的结束方位角，或RHI模式的低限仰角
     */
    endAngle: number;
    /**
     * 角度分辨率 FLOAT 4字节 Degree 度 (0.00～2.00) 径向数据的角度分辨率，仅用于PPI扫描模式
     */
    angularResolution: number;
    /**
     * 扫描速度 FLOAT 4字节 Deg/sec 度/秒 (0.00～36.00) PPI扫描的方位转速，或RHI扫描的俯仰转速
     */
    scanSpeed: number;
    /**
     * 强度分辨率 INT 4字节 Meter 米 (1～5,000) 强度数据的距离分辨率
     */
    logResolution: number;
    /**
     * 多普勒分辨率 INT 4字节 Meter 米 (1～5,000) 多普勒数据的距离分辨率
     */
    dopplerResolution: number;
    /**
     * 最大距离1 INT 4字节 Meter 米 (1～500,000) 对应脉冲重复频率1的最大可探测距离
     */
    maximumRange1: number;
    /**
     * 最大距离2 INT 4字节 Meter 米 (1～500,000) 对应脉冲重复频率2的最大 可探测距离
     */
    maximumRange2: number;
    /**
     * 起始距离 INT 4字节 Meter 米 (1～500,000) 数据探测起始距离
     */
    startRange: number;
    /**
     * 采样个数1 INT 4字节 (2～512) 对应于脉冲重复频率1的采样个数
     */
    sample1: number;
    /**
     * 采样个数2 INT 4字节 (2～512) 对应于脉冲重复频率2的采样个数
     */
    sample2: number;
    /**
     * 相位编码模式 INT 4字节 (1～3)
     * 1 – 固定相位
     * 2 – 随机相位
     * 3 – SZ编码
     */
    phaseMode: number;
    /**
     * 大气衰减 FLOAT 4字节 dB/km 分贝/千米 (0.000000～10.000000) 双程大气衰减值，精度为小数点后保留6位
     */
    atmosphericLoss: number;
    /**
     * 最大不模糊速度 FLOAT 4字节 m/s 米/秒 (0～100) 理论最大不模糊速度
     */
    nyquistSpeed: number;
    /**
     * 数据类型掩码 LONG 8字节 (0～0xFFFFFFFFFFFFFFFF)
     * 以掩码的形式表示当前允许获取的数据类型，其中：
     * 0–不允许获取数据
     * 1 –允许获取数据。
     */
    momentsMask: bigint;
    /**
     * 数据大小掩码 LONG 8字节 (0～0xFFFFFFFFFFFFFFFF)
     * 以掩码形式表示每种数据类型字节数，其中：
     * 0–1个字节
     * 1 – 2个字节
     * 对应数据类型顺序同表2-6
     */
    momentsSizeMask: bigint;
    /**
     * 滤波设置掩码 INT 4字节 (0～0xFFFFFFFF)
     * 0–未应用
     * 1–应用
     */
    miscFilterMask: number;
    /**
     * SQI门限 FLOAT 4字节 (0.00～1.00)
     */
    sqiThreshold: number;
    /**
     * SIG门限 FLOAT 4字节 dB 分贝 (0.00～20.00)
     */
    sigThreshold: number;
    /**
     * CSR门限 FLOAT 4字节 dB 分贝 (0.00～100.00)
     */
    csrThreshold: number;
    /**
     * LOG门限 FLOAT 4字节 dB 分贝 (0.00～20.00)
     */
    logThreshold: number;
    /**
     * CPA门限 FLOAT 4字节 (0.00～100.00)
     */
    cpaThreshold: number;
    /**
     * PMI门限 FLOAT 4字节 (0.00～1.00)
     */
    pmiThreshold: number;
    /**
     * PMI门限 FLOAT 4字节 (0.00～1.00)
     */
    dpLogThreshold: number;
    /**
     * 阈值门限保留 CAHR*4 16字节 保留字段
     */
    thresholdsR: string;
    /**
     * dBT质控掩码 INT 4字节 (0～0xFFFFFFFF)
     * dBT数据使用的质控门限掩码，其中：
     * 0–未应用
     * 1–应用
     */
    dBTMask: number;
    /**
     * dBZ质控掩码 INT 4字节 (0～0xFFFFFFFF)
     * dBZ数据使用的质控门限掩码，具体掩码位定义见表2-8，其中：
     * 0–未应用
     * 1–应用
     */
    dBZMask: number;
    /**
     * 速度质控掩码 INT 4字节 (0～0xFFFFFFFF)
     * 速度数据使用的质控门限掩码，具体掩码位定义见表2-8，其中：
     * 0–未应用
     * 1–应用
     */
    velocityMask: number;
    /**
     * 谱宽质控掩码 INT 4字节 (0～0xFFFFFFFF)
     * 谱宽数据使用的质控门限掩码，具体掩码位定义见表2-8，其中：
     * 0–未应用
     * 1–应用
     */
    spectrumWidthMask: number;
    /**
     * 偏振量质控掩码 INT 4字节 (0～0xFFFFFFFF)
     * 偏振量数据使用的质控门限掩码，具体掩码位定义见表2-8，其中：
     * 0–未应用
     * 1–应用
     */
    dpMask: number;
    /**
     * 质控掩码保留位 12字节 保留，用于标识质控方法
     */
    maskReserved: string;
    /**
     * 扫描同步标志 INT 4字节 保留，用于多部雷达同步扫描标识
     */
    scanSync: number;
    /**
     * 天线运行方向 INT 4字节 (1～2) 仅对PPI模式有效
     * 1 – 顺时针
     * 2 – 逆时针
     */
    direction: number;
    /**
     * 地物杂波图类型 SHORT 2字节 (1～4)
     * 1 – 所有数据不滤波
     * 2 – 全程滤波
     * 3 – 使用实时动态滤波图
     * 4 – 使用静态滤波图
     */
    groundClutterClassifierType: number;
    /**
     * 地物滤波类型 SHORT 2字节 (0～5)
     * 0 –不滤波
     * 1 – 频域自适应滤波
     * 2 - 固定宽带频域滤波器
     * 3 - 可变宽带频域滤波器
     * 4 - 可变最小方差频域滤波器
     * 5 – IIR时域滤波
     */
    groundClutterFilterType: number;
    /**
     * 地物滤波宽度 SHORT 2字节 0.1 m/s (0.1～10.0)
     */
    groundClutterFilterNotchWidth: number;
    /**
     * 滤波窗口类型 SHORT 2字节 (0～4)
     * 0 – 矩形窗
     * 1 – 汉明窗
     * 2 – Blackman窗
     * 3 – 自适应窗口
     * 4 – 无
     */
    groundClutterFilterWindow: number;
    /**
     * 保留字段 72字节
     */
    reserved: string;
}
/**
 * 产品头块 128字节
 */
export interface ProductHeadType {
    /**
     * 产品类型 INT 4字节 (1～100)
     */
    productType: number;
    /**
     * 产品名称 CHAR 32字节 用户自定义的产品名称
     */
    productName: string;
    /**
     * 产品生成时间 INT 4字节 秒
     */
    productGenerationTime: number;
    /**
     * 扫描开始时间 INT 4字节 秒
     */
    scanStartTime: number;
    /**
     * 数据起始时间 INT 4字节 秒
     */
    dataStartTime: number;
    /**
     * 数据结束时间 INT 4字节 秒
     */
    dataEndTime: number;
    /**
     * 投影类型 INT 4字节 (1～18)
     */
    projectionType: number;
    /**
     * 数据类型#1 INT 4字节 (1～64)
     */
    dataType1: number;
    /**
     * 数据类型#2 INT 4字节 (1～64)
     */
    dataType2: number;
    /**
     * 保留 CHAR 64字节
     */
    reserved: string;
}
/**
 * 产品类型对照
 */
export declare enum ProductTypeEnum {
    /**
     * 平面位置显示
     */
    PPI = 1,
    /**
     * 距离高度显示
     */
    RHI = 2,
    /**
     * 等高面显示
     */
    CAPPI = 3,
    /**
     * 最大值
     */
    MAX = 4,
    /**
     * 回波顶高
     */
    ET = 6,
    /**
     * 垂直剖面
     */
    VCS = 8,
    /**
     * 分层组合反射率平均值
     */
    LRA = 9,
    /**
     * 分层组合反射率最大值
     */
    LRM = 10,
    /**
     * 风暴相对径向速度区域
     */
    SRR = 13,
    /**
     * 风暴相对径向速度
     */
    SRM = 14,
    /**
     * 组合反射率
     */
    CR = 18,
    /**
     * 组合反射率 X波段
     */
    CRX = 54,
    /**
     * 弱回波区
     */
    WER = 20,
    /**
     * 垂直累计液态水含量
     */
    VIL = 23,
    /**
     * 混合扫描反射率
     */
    HSR = 24,
    /**
     * 一小时降雨累积
     */
    OHP = 25,
    /**
     * 三小时降雨累积
     */
    THP = 26,
    /**
     * 风暴总降水累积
     */
    STP = 27,
    /**
     * 用户可选降雨累积
     */
    USP = 28,
    /**
     * 速度方位显示
     */
    VAD = 31,
    /**
     * VAD风廓线
     */
    VWP = 32,
    /**
     * 风切变
     */
    SHEAR = 34,
    /**
     * 强天气概率
     */
    SWP = 36,
    /**
     * 风暴追踪信息
     */
    STI = 37,
    /**
     * 冰雹指数
     */
    HI = 38,
    /**
     * 中尺度气旋
     */
    M = 39,
    /**
     * 龙卷涡旋特征
     */
    TVS = 40,
    /**
     * 风暴结构
     */
    SS = 41,
    /**
     * 雨量计
     */
    GAGE = 48,
    /**
     * 融化层识别
     */
    ML = 50,
    /**
     * 水汽分类
     */
    HCL = 51,
    /**
     * 双偏振定量降水估测
     */
    QPE = 52
}
export interface BaseType {
    headView: BaseHeadersType | null;
    stationView: BaseStationType | null;
    taskView: BaseTaskType | null;
    scanView: BaseScanType[];
    productHeadView: ProductHeadType | null;
    productParamsView: ProductParamsPPIType | ProductParamsRHIType | ProductParamsCAPPType | ProductParamsMAXType | ProductParamsETType | ProductParamsVCSType | ProductParamsLRAType | ProductParamsLRMType | ProductParamsSRRType | ProductParamsSRMType | ProductParamsCRType | ProductParamsWERType | ProductParamsOHPType | ProductParamsTHPType | ProductParamsSTPType | ProductParamsUSPType | ProductParamsVADType | ProductParamsVWPType | ProductParamsSHEARType | ProductParamsSWPType | ProductParamsSTIType | ProductParamsHIType | ProductParamsMType | ProductParamsTVSType | ProductParamsSSType | ProductParamsGAGEType | ProductParamsMLType | ProductParamsHCLType | ProductParamsQPEType | null;
}
/**
 * PPI
 */
export interface ProductParamsPPIType {
    /**
     * 仰角 FLOAT 度 (-2.00～90.00)
     */
    elevation: number;
}
/**
 * RHI
 */
export interface ProductParamsRHIType {
    /**
     * 方位角 FLOAT 度 (0.00～360.00)
     */
    azimuth: number;
    /**
     * 顶高 INT 米 (0～21,000)
     */
    top: number;
    /**
     * 底高 INT 米 (0～10,000)
     */
    bottom: number;
}
/**
 * CAPPI
 */
export interface ProductParamsCAPPType {
    /**
     * 层数 INT (1～50)
     */
    layers: number;
    /**
     * 顶高 INT 米 (0～21,000)
     */
    top: number;
    /**
     * 底高 INT 米 (0～21,000)
     */
    bottom: number;
    /**
     * 填充CAPPI INT (0～1)
     * 0–未填充
     * 1–填充
     */
    cappiFill: number;
}
/**
 * MAX
 */
export interface ProductParamsMAXType {
    /**
     * 顶高 INT 米 (0～21,000)
     * 截断顶高
     */
    top: number;
    /**
     * 底高 INT 米 (0～21,000)
     * 截断底高
     */
    bottom: number;
}
/**
 * ET
 */
export interface ProductParamsETType {
    /**
     * dBZ值 FLOAT dBZ (-50.0～100.0)
     */
    dBZContour: number;
}
/**
 * VCS
 */
export interface ProductParamsVCSType {
    /**
     * 起始方位角 FLOAT 度 (0.00～360.00)
     */
    azimuthOfStart: number;
    /**
     * 起始距离 INT 米 (0～500,000)
     */
    rangeOfStart: number;
    /**
     * 结束方位角 FLOAT 度 (0.00～360.00)
     */
    azimuthOfEnd: number;
    /**
     * 结束距离 INT 米 (0～500,000)
     */
    rangeOfEnd: number;
    /**
     * 顶高 INT 米 (0～21,000)
     */
    top: number;
    /**
     * 底高 INT 米 (0～21,000)
     */
    bottom: number;
}
/**
 * LRA
 */
export interface ProductParamsLRAType {
    /**
     * 顶高 INT 米 (0～21,000)
     */
    top: number;
    /**
     * 底高 INT 米 (0～21,000)
     */
    bottom: number;
}
/**
 * LRM
 */
export interface ProductParamsLRMType {
    /**
     * 顶高 INT 米 (0～21,000)
     */
    top: number;
    /**
     * 底高 INT 米 (0～21,000)
     */
    bottom: number;
}
/**
 * SRR
 */
export interface ProductParamsSRRType {
    /**
     * 仰角 FLOAT 度 (-2.00～90.00)
     */
    elevation: number;
    /**
     * 中心距离 INT 米 (0～500,000)
     */
    rangeOfCenter: number;
    /**
     * 中心方位角 FLOAT 度 (0.00～360.00)
     */
    azimuthOfCenter: number;
    /**
     * 边长 INT 米 (1～500)
     * SRR方框的边长
     */
    sideLength: number;
    /**
     * 风速 FLOAT 米/秒 (0.00～100.00)
     */
    speedOfWind: number;
    /**
     * 风向 FLOAT 度 (0.00～360.00)
     */
    directionOfWind: number;
}
/**
 * SRM
 */
export interface ProductParamsSRMType {
    /**
     * 仰角 FLOAT 度 (-2.00～90.00)  仰角
     */
    elevation: number;
    /**
     * 风速 FLOAT 米/秒 (0.00～100.00)  风速
     */
    speedOfWind: number;
    /**
     * 风向 FLOAT 度 (0.00～360.00)  风向
     */
    directionOfWind: number;
}
/**
 * SWA
 */
export interface ProductParamsSWAType {
    /**
     * 仰角 FLOAT 度 (-2.00～90.00)  仰角
     */
    elevation: number;
    /**
     * 中心距离 INT 米 (0～500,000)  中心点的范围
     */
    rangeOfCenter: number;
    /**
     * 中心方位角 FLOAT 度 (0.00～360.00)  中���点的方位
     */
    azimuthOfCenter: number;
    /**
     * 边长 INT 米 (1～500) SWA的边长
     */
    sideLength: number;
}
/**
 * CR
 */
export interface ProductParamsCRType {
}
/**
 * WER
 */
export interface ProductParamsWERType {
    /**
     * 中心距离 INT 米 (0～500,000)  产品中心的距离
     */
    range: number;
    /**
     * 中心方位角 FLOAT 度 (0.00～360.00) 产品中心的方位 角
     */
    azimuth: number;
    /**
     * 边长 INT 米 (1～500) WER方框的边长
     */
    sideLength: number;
    /**
     * 层数 INT (1～8) 仰角个数
     */
    levels: number;
}
/**
 * OHP
 */
export interface ProductParamsOHPType {
    /**
     * 输入产品类型 INT (1～100) HSR,CAPPI或 QPE，见表3-2
     */
    baseProduct: number;
    /**
     * CAPPI高度 INT 米 (1～21000) CAPPI产品高度
     */
    cappiHeight: number;
    /**
     * CAPPI填充 INT (0～1) 0–未填充 1–填充
     */
    cappiFill: number;
    /**
     * 雨量计修正 INT (0～1) 0-不修正 1-修正
     */
    rainGageAdjustment: number;
}
/**
 * THP
 */
export interface ProductParamsTHPType {
    /**
     * 输入产品类型 INT (1～100) 产品类型为 HSR,CAPPI或 QPE，见表3-2
     */
    baseProduct: number;
    /**
     * CAPPI高度 INT 米 (1～21000) CAPPI的产品高 度
     */
    cappiHeight: number;
    /**
     * CAPPI填充 INT (0～1) 0–未填充 1–填充
     */
    cappiFill: number;
    /**
     * 雨量计修正 INT (0～1) 0-不修正 1-修正
     */
    rainGageAdjustment: number;
    /**
     * 小时数 INT (3) 用户请求的雨量 积累的小时数
     */
    hours: number;
}
/**
 * STP
 */
export interface ProductParamsSTPType {
    /**
     * 输入产品类型 INT (1～100) 产品类型为 HSR,CAPPI或 QPE，见表3-2
     */
    baseProduct: number;
    /**
     * CAPPI高度 INT 米 (1～21000)
     */
    cappiHeight: number;
    /**
     * CAPPI填充 INT (0～1) 0–未填充 1–填充
     */
    cappiFill: number;
    /**
     * 雨量计修正 INT (0～1) 0-不修正 1-修正
     */
    rainGageAdjustment: number;
}
/**
 * USP
 */
export interface ProductParamsUSPType {
    /**
     * 输入产品类型 INT (1～100) 产品类型为 HSR,CAPPI或 QPE，见表3-2
     */
    baseProduct: number;
    /**
     * CAPPI高度 INT 米 (1～21000)
     */
    cappiHeight: number;
    /**
     * CAPPI填充 INT (0～1) 0–未填充 1–填充
     */
    cappiFill: number;
    /**
     * 雨量计修正 INT (0～1) 0-不修正 1-修正
     */
    rainGageAdjustment: number;
    /**
     * 小时数 INT (1～24) 用户请求的雨量 积累的小时数
     */
    hours: number;
}
/**
 * VAD
 */
export interface ProductParamsVADType {
    /**
     * 层数 INT (0~30) VAD层数
     */
    layers: number;
    /**
     * 每个曾的高度 SHORT 米 (0~21,000) 每个层的高度间隔, height-1/2/3/4
     */
    [key: string]: number;
}
/**
 * VWP
 */
export interface ProductParamsVWPType {
    /**
     * 层数 INT (0~30) VWP层数
     */
    layers: number;
    /**
     * 每个曾的高度 SHORT 米 (0~21,000) 每个层的高度间隔, height-1/2/3/4
     */
    [key: string]: number;
}
/**
 * SHEAR
 */
export interface ProductParamsSHEARType {
    /**
     * 仰角 FLOAT 度 (-2.00～90.00) 基于切变数据的仰角
     */
    elevation: number;
    /**
     * 径向切变 INT (0～1)
     * 0-不包括径向切变
     * 1-包括径向切变
     */
    radialShear: number;
    /**
     * 方位切变 INT (0～1)
     * 0-不包括方位切变
     * 1-包括方位切变
     */
    azimuthShear: number;
    /**
     * 仰角切变 INT (0～1)
     * 0-不包括仰角切变
     * 1-包括仰角切变
     */
    elevationShear: number;
}
/**
 * SWP
 */
export interface ProductParamsSWPType {
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * STI
 */
export interface ProductParamsSTIType {
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * HI
 */
export interface ProductParamsHIType {
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * M
 */
export interface ProductParamsMType {
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * TVS
 */
export interface ProductParamsTVSType {
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * SS
 */
export interface ProductParamsSSType {
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * GAGE
 */
export interface ProductParamsGAGEType {
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * ML
 */
export interface ProductParamsMLType {
    /**
     * 仰角 FLOAT 度 (-2.00～90.00)
     */
    elevation: number;
    /**
     * 最大范围 INT 米 (0～500,000)
     */
    maxRange: number;
}
/**
 * HCL
 */
export interface ProductParamsHCLType {
    /**
     * 仰角 FLOAT 度 (-2.00～90.00)
     */
    elevation: number;
}
/**
 * QPE
 */
export interface ProductParamsQPEType {
}
export interface ProductParamsByTypeMap {
    [ProductTypeEnum.PPI]: ProductParamsPPIType;
    [ProductTypeEnum.RHI]: ProductParamsRHIType;
    [ProductTypeEnum.CAPPI]: ProductParamsCAPPType;
    [ProductTypeEnum.MAX]: ProductParamsMAXType;
    [ProductTypeEnum.ET]: ProductParamsETType;
    [ProductTypeEnum.VCS]: ProductParamsVCSType;
    [ProductTypeEnum.LRA]: ProductParamsLRAType;
    [ProductTypeEnum.LRM]: ProductParamsLRMType;
    [ProductTypeEnum.SRR]: ProductParamsSRRType;
    [ProductTypeEnum.SRM]: ProductParamsSRMType;
    [ProductTypeEnum.CR]: ProductParamsCRType;
    [ProductTypeEnum.CRX]: ProductParamsCRType;
    [ProductTypeEnum.WER]: ProductParamsWERType;
    [ProductTypeEnum.OHP]: ProductParamsOHPType;
    [ProductTypeEnum.THP]: ProductParamsTHPType;
    [ProductTypeEnum.STP]: ProductParamsSTPType;
    [ProductTypeEnum.USP]: ProductParamsUSPType;
    [ProductTypeEnum.VAD]: ProductParamsVADType;
    [ProductTypeEnum.VWP]: ProductParamsVWPType;
    [ProductTypeEnum.SHEAR]: ProductParamsSHEARType;
    [ProductTypeEnum.SWP]: ProductParamsSWPType;
    [ProductTypeEnum.STI]: ProductParamsSTIType;
    [ProductTypeEnum.HI]: ProductParamsHIType;
    [ProductTypeEnum.M]: ProductParamsMType;
    [ProductTypeEnum.TVS]: ProductParamsTVSType;
    [ProductTypeEnum.SS]: ProductParamsSSType;
    [ProductTypeEnum.GAGE]: ProductParamsGAGEType;
    [ProductTypeEnum.ML]: ProductParamsMLType;
    [ProductTypeEnum.HCL]: ProductParamsHCLType;
    [ProductTypeEnum.QPE]: ProductParamsQPEType;
}
export type ProductParamsType<T extends ProductTypeEnum | keyof ProductParamsByTypeMap> = T extends keyof ProductParamsByTypeMap ? ProductParamsByTypeMap[T] : never;
export type BoundBox = [
    [
        nLat: number,
        eLng: number
    ],
    [
        sLat: number,
        wLng: number
    ]
];
export interface DrawParams {
    size?: number;
    min?: number;
    max?: number;
}
export interface GeoJsonOptions {
    radialStep?: number;
    binStep?: number;
    mode?: 'feature' | 'multi';
    includeValue?: boolean;
}
