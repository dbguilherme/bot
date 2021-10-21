import { Page } from 'puppeteer';
import { CreateConfig } from '../../config/create-config';
import { Ack, Chat, LiveLocation, Message, ParticipantEvent } from '../model';
import { SocketState, SocketStream } from '../model/enum';
import { InterfaceMode } from '../model/enum/interface-mode';
import { InterfaceState } from '../model/enum/interface-state';
import { ProfileLayer } from './profile.layer';
declare global {
    interface Window {
        onMessage: any;
        onAnyMessage: any;
        onStateChange: any;
        onIncomingCall: any;
        onAck: any;
        onStreamChange: any;
    }
}
export declare class ListenerLayer extends ProfileLayer {
    page: Page;
    private listenerEmitter;
    constructor(page: Page, session?: string, options?: CreateConfig);
    initialize(): Promise<void>;
    /**
     * @returns Returns the current state of the connection
     */
    onStreamChange(fn: (state: SocketStream) => void): Promise<{
        dispose: () => void;
    }>;
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    onMessage(fn: (message: Message) => void): Promise<{
        dispose: () => void;
    }>;
    /**
     * @event Listens to all new messages
     * @param to callback
     * @fires Message
     */
    onAnyMessage(fn: (message: Message) => void): Promise<{
        dispose: () => void;
    }>;
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    onStateChange(fn: (state: SocketState) => void): Promise<{
        dispose: () => void;
    }>;
    /**
     * @event Listens to interface mode change See {@link InterfaceState} and {@link InterfaceMode} for details
     * @returns A disposable object to cancel the event
     */
    onInterfaceChange(fn: (state: {
        displayInfo: InterfaceState;
        mode: InterfaceMode;
    }) => void): {
        dispose: () => void;
    };
    /**
     * @event Listens to messages acknowledgement Changes
     * @returns Observable stream of messages
     */
    onAck(fn: (ack: Ack) => void): Promise<{
        dispose: () => void;
    }>;
    /**
     * @event Listens to live locations from a chat that already has valid live locations
     * @param chatId the chat from which you want to subscribes to live location updates
     * @param fn callback that takes in a LiveLocation
     * @returns boolean, if returns false then there were no valid live locations in the chat of chatId
     * @emits <LiveLocation> LiveLocation
     */
    onLiveLocation(chatId: string, fn: (liveLocationChangedEvent: LiveLocation) => void): Promise<any>;
    /**
     * @event Listens to participants changed
     * @param to group id: xxxxx-yyyy@us.c
     * @param to callback
     * @returns Stream of ParticipantEvent
     */
    onParticipantsChanged(groupId: string, fn: (participantChangedEvent: ParticipantEvent) => void): Promise<void>;
    /**
     * @event Fires callback with Chat object every time the host phone is added to a group.
     * @param to callback
     * @returns Observable stream of Chats
     */
    onAddedToGroup(fn: (chat: Chat) => any): Promise<{
        dispose: () => void;
    }>;
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    onIncomingCall(fn: (call: any) => any): Promise<{
        dispose: () => void;
    }>;
}
