export default class BinaryReader {
    dv: DataView | null;
    littleEndian: boolean | null;
    offset: number;
    protected int8(): number;
    protected int(): number;
    protected float(): number;
    protected short(): number;
    protected long(): bigint;
    protected char(charSize: number): string;
    protected uint8(): number;
    protected uint16(): number;
    protected uint32(): number;
    protected uint64(): bigint;
    private getField;
}
