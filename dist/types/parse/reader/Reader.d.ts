import type IReader from './IReader';
import BaseReader from './BaseReader';
export default class Reader extends BaseReader implements IReader {
    dataType: IReader['dataType'];
    constructor(filePath?: string);
    getDefaultLegend(): {
        colors: string[];
        levels: string[];
    };
    syncContextFrom(reader: Reader): void;
}
