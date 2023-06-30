export declare function contains(parent: HTMLElement, target: HTMLElement): boolean;
export declare function pureObject(o: any): boolean;
export declare function debounce<T extends (...args: any[]) => void>(fn: T, t?: number): (...args: Parameters<typeof fn>) => void;
export declare function cls(...ss: (string | undefined | null)[]): string;
/**
 * @param t 单位秒，默认0
 * @returns
 */
export declare function delay(t?: number): Promise<unknown>;
export declare function shouldKey(e: KeyboardEvent, key: string): boolean;
