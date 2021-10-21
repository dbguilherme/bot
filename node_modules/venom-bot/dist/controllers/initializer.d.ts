import { Browser, Page } from 'puppeteer';
import { Whatsapp } from '../api/whatsapp';
import { CreateConfig } from '../config/create-config';
import { tokenSession } from '../config/tokenSession.config';
/**
 * A callback will be received, informing the status of the qrcode
 */
export declare type CatchQR = (qrCode: string, asciiQR: string, attempt: number, urlCode?: string) => void;
/**
 * A callback will be received, informing the customer's status
 */
export declare type StatusFind = (statusGet: string, session: string) => void;
/**
 * A callback will be received, informing user about browser and page instance
 */
export declare type BrowserInstance = (browser: string | Browser, waPage: false | Page) => void;
export interface CreateOptions extends CreateConfig {
    /**
     * You must pass a string type parameter, this parameter will be the name of the client's session. If the parameter is not passed, the section name will be "session".
     */
    session: string;
    /**
     * A callback will be received, informing the status of the qrcode
     */
    catchQR?: CatchQR;
    /**
     * A callback will be received, informing the customer's status
     */
    statusFind?: StatusFind;
    /**
     * Pass the session token information you can receive this token with the await client.getSessionTokenBrowser () function
     */
    browserSessionToken?: tokenSession;
    /**
     * A callback will be received, informing user about browser and page instance
     */
    browserInstance?: BrowserInstance;
}
/**
 * Start the bot
 * @returns Whatsapp page, with this parameter you will be able to access the bot functions
 */
export declare function create(createOption: CreateOptions): Promise<Whatsapp>;
/**
 * Start the bot
 * You must pass a string type parameter, this parameter will be the name of the client's session. If the parameter is not passed, the section name will be "session".
 * @returns Whatsapp page, with this parameter you will be able to access the bot functions
 */
export declare function create(sessionName: string, catchQR?: CatchQR, statusFind?: StatusFind, options?: CreateConfig, browserSessionToken?: tokenSession, browserInstance?: BrowserInstance): Promise<Whatsapp>;
