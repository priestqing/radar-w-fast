export default interface IReader {
    dataType: number | null;
    getDefaultLegend?: () => {
        colors: string[];
        levels: string[];
    };
}
