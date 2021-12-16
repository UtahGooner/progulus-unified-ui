export interface Preload {
    id?: number,
}

declare global {
    interface Window {
        PRELOAD?: Preload;
    }
}
