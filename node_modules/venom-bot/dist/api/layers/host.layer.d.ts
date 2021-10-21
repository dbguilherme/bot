import { Page } from 'puppeteer';
import { CreateConfig } from '../../config/create-config';
import { SocketState } from '../model/enum';
import { ScrapQrcode } from '../model/qrcode';
import * as Spinnies from 'spinnies';
export declare class HostLayer {
    page: Page;
    readonly session: string;
    readonly options: CreateConfig;
    protected spinnies: Spinnies;
    protected spinStatus: {
        apiInject: string;
        autoCloseRemain: number;
        previousText: string;
        previousStatus: any;
        state: string;
    };
    protected autoCloseInterval: any;
    protected statusFind?: (statusGet: string, session: string) => void;
    constructor(page: Page, session?: string, options?: CreateConfig);
    protected spin(text?: string, status?: Spinnies.SpinnerStatus): void;
    _initialize(page: Page): Promise<void>;
    protected tryAutoClose(): void;
    protected startAutoClose(): void;
    protected cancelAutoClose(): void;
    getQrCode(): Promise<ScrapQrcode>;
    waitForQrCodeScan(catchQR?: (qrCode: string, asciiQR: string, attempt: number, urlCode?: string) => void): Promise<void>;
    waitForInChat(): Promise<true>;
    waitForLogin(catchQR?: (qrCode: string, asciiQR: string, attempt: number, urlCode?: string) => void, statusFind?: (statusGet: string, session: string) => void): Promise<boolean>;
    /**
     * Delete the Service Workers
     */
    killServiceWorker(): Promise<boolean>;
    /**
     * Load the service again
     */
    restartService(): Promise<boolean>;
    /**
     * @returns Current host device details
     */
    getHostDevice(): Promise<import("../model").HostDevice>;
    /**
     * Retrieves WA version
     */
    getWAVersion(): Promise<string>;
    /**
     * Retrieves the connecction state
     */
    getConnectionState(): Promise<SocketState>;
    /**
     * Retrieves if the phone is online. Please note that this may not be real time.
     */
    isConnected(): Promise<boolean>;
    /**
     * Retrieves if the phone is online. Please note that this may not be real time.
     */
    isLoggedIn(): Promise<boolean>;
    /**
     * Retrieves Battery Level
     */
    getBatteryLevel(): Promise<number>;
}
