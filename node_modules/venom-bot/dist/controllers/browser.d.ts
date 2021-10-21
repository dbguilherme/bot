import { Browser, BrowserContext, Page } from 'puppeteer';
import { CreateConfig } from '../config/create-config';
import { tokenSession } from '../config/tokenSession.config';
export declare function initWhatsapp(session: string, options: CreateConfig, browser: Browser, token?: tokenSession): Promise<false | Page>;
export declare function injectApi(page: Page): Promise<Page>;
/**
 * Initializes browser, will try to use chrome as default
 * @param session
 */
export declare function initBrowser(session: string, options: CreateConfig, extras?: {}): Promise<Browser | string>;
export declare function getWhatsappPage(browser: Browser | BrowserContext): Promise<Page>;
