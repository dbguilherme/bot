import * as puppeteer from 'puppeteer';
import { CreateConfig } from '../config/create-config';
import { ScrapQrcode } from '../api/model/qrcode';
import { tokenSession } from '../config/tokenSession.config';
export declare const getInterfaceStatus: (waPage: puppeteer.Page) => Promise<string | null | boolean>;
/**
 * Validates if client is authenticated
 * @returns true if is authenticated, false otherwise
 * @param waPage
 */
export declare const isAuthenticated: (waPage: puppeteer.Page) => Promise<boolean>;
export declare const needsToScan: (waPage: puppeteer.Page) => Promise<boolean>;
export declare const isInsideChats: (waPage: puppeteer.Page) => Promise<boolean>;
export declare const isConnectingToPhone: (waPage: puppeteer.Page) => Promise<boolean>;
export declare function asciiQr(code: string): Promise<string>;
export declare function retrieveQR(page: puppeteer.Page): Promise<ScrapQrcode | undefined>;
export declare function SessionTokenCkeck(token: object): boolean;
export declare function auth_InjectToken(page: puppeteer.Page, session: string, options: CreateConfig, token?: tokenSession): Promise<boolean>;
export declare function saveToken(page: puppeteer.Page, session: string, options: CreateConfig): Promise<false | tokenSession>;
