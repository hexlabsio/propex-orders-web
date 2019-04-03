const chunk: <T>(array: T[], chunkSize: number) => T[][] = <T>(array: T[], chunkSize: number) => Array(Math.ceil(array.length / chunkSize))
  .fill(0)
  .map((_: number, index: number) => index * chunkSize)
  .map((begin: number) => array.slice(begin, begin + chunkSize));

export default chunk;
