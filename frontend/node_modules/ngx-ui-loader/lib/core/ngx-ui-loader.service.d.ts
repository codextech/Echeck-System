import { Observable } from 'rxjs';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';
import { Loaders, Loader, ShowEvent, Task } from './ngx-ui-loader.interfaces';
export declare class NgxUiLoaderService {
    private config;
    /**
     * For internal use only. It may be changed in the future.
     * @docs-private
     */
    backgroundClosing$: Observable<ShowEvent>;
    /**
     * For internal use only. It may be changed in the future.
     * @docs-private
     */
    foregroundClosing$: Observable<ShowEvent>;
    /**
     * For internal use only. It may be changed in the future.
     * @docs-private
     */
    showBackground$: Observable<ShowEvent>;
    /**
     * For internal use only. It may be changed in the future.
     * @docs-private
     */
    showForeground$: Observable<ShowEvent>;
    private bgClosing;
    private defaultConfig;
    private fgClosing;
    private loaders;
    private showBackground;
    private showForeground;
    /**
     * Constructor
     * @param config
     */
    constructor(config: NgxUiLoaderConfig);
    /**
     * For internal use only. It may be changed in the future.
     * @docs-private
     */
    initLoaderData(loaderId: string): void;
    /**
     * For internal use only. It may be changed in the future.
     * @docs-private
     */
    updateLoaderId(loaderId: string, newLoaderId: string): void;
    /**
     * For internal use only. It may be changed in the future.
     * @docs-private
     */
    destroyLoaderData(loaderId: string): void;
    /**
     * Get default loader configuration
     * @returns default configuration object
     */
    getDefaultConfig(): NgxUiLoaderConfig;
    /**
     * Get all the loaders
     */
    getLoaders(): Loaders;
    /**
     * Get data of a specified loader. If loaderId is not provided, it will return data of master loader(if existed)
     */
    getLoader(loaderId?: string): Loader;
    /**
     * @deprecated use getLoader() or getLoaders() instead. This will be removed in the version 8.x.x
     * Return status of master loader
     */
    getStatus(): {
        waitingBackground: Task;
        waitingForeground: Task;
    };
    /**
     * Check whether the queue has a waiting foreground loader with the given `taskId`.
     * If no `taskId` specified, it will check whether the queue has any waiting foreground loader.
     * @param loaderId the loader Id
     * @param taskId the optional task Id
     * @returns boolean
     */
    hasForeground(loaderId: string, taskId?: string): boolean;
    /**
     * Check whether the queue has a waiting background loader with the given `taskId`.
     * If no `taskId` specified, it will check whether the queue has any waiting background loader.
     * @param loaderId the loader Id
     * @param taskId the optional task Id
     * @returns boolean
     */
    hasBackground(loaderId: string, taskId?: string): boolean;
    /**
     * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
     * @param loaderId the loader Id
     * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
     */
    startLoader(loaderId: string, taskId?: string): void;
    /**
     * Start the foreground loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stop() method.
     * NOTE: Really this function just wraps startLoader() function
     * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
     */
    start(taskId?: string): void;
    /**
     * Start the background loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
     * @param loaderId the loader Id
     * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
     */
    startBackgroundLoader(loaderId: string, taskId?: string): void;
    /**
     * Start the background loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
     * NOTE: Really this function just wraps startBackgroundLoader() function
     * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
     */
    startBackground(taskId?: string): void;
    /**
     * Stop a foreground loading of loader having `loaderId` with specific `taskId`
     * @param loaderId the loader Id
     * @param taskId the optional task Id to stop. If not provided, 'default' is used.
     * @returns Object
     */
    stopLoader(loaderId: string, taskId?: string): void;
    /**
     * Stop a foreground loading of master loader with specific `taskId`
     * @param taskId the optional task Id to stop. If not provided, 'default' is used.
     * @returns Object
     */
    stop(taskId?: string): void;
    /**
     * Stop a background loading of loader having `loaderId` with specific `taskId`
     * @param loaderId the loader Id
     * @param taskId the optional task Id to stop. If not provided, 'default' is used.
     * @returns Object
     */
    stopBackgroundLoader(loaderId: string, taskId?: string): void;
    /**
     * Stop a background loading of master loader with specific taskId
     * @param taskId the optional task Id to stop. If not provided, 'default' is used.
     * @returns Object
     */
    stopBackground(taskId?: string): void;
    /**
     * Stop all the background and foreground loadings of loader having `loaderId`
     * @param loaderId the loader Id
     */
    stopLoaderAll(loaderId: string): void;
    /**
     * Stop all the background and foreground loadings of master loader
     */
    stopAll(): void;
    /**
     * Create loader data if it does not exist
     * @param loaderId
     * @param isMaster
     * @param isBound
     * @docs-private
     */
    private createLoaderData;
    /**
     * Throw error if the loaderId does not exist.
     * @docs-private
     */
    private throwErrorIfLoaderNotExist;
    /**
     * Throw error if the loaderId has already existed.
     * @docs-private
     */
    private throwErrorIfLoaderExists;
    /**
     * Throw error if the master loader has already existed.
     * @docs-private
     */
    private throwErrorIfMasterLoaderExists;
    /**
     * Throw error if the master loader does not exist.
     * @docs-private
     */
    private throwErrorIfMasterLoaderNotExist;
    /**
     * Manage to close foreground loading
     * @param loaderId the loader id
     */
    private foregroundCloseout;
    /**
     * Manage to close background loading
     * @param loaderId the loader id
     */
    private backgroundCloseout;
}
