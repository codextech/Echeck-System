/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CLOSING_TIME, DEFAULT_TASK_ID, DEFAULT_CONFIG, WAITING_FOR_OVERLAY_DISAPPEAR } from './ngx-ui-loader.contants';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-ui-loader-config.token";
export class NgxUiLoaderService {
    /**
     * Constructor
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.defaultConfig = Object.assign({}, DEFAULT_CONFIG);
        if (this.config) {
            if (this.config.threshold && this.config.threshold <= 0) {
                this.config.threshold = DEFAULT_CONFIG.threshold;
            }
            this.defaultConfig = Object.assign({}, this.defaultConfig, this.config);
        }
        this.loaders = {};
        this.showForeground = new BehaviorSubject({ loaderId: '', isShow: false });
        this.showForeground$ = this.showForeground.asObservable();
        this.showBackground = new BehaviorSubject({ loaderId: '', isShow: false });
        this.showBackground$ = this.showBackground.asObservable();
        this.fgClosing = new BehaviorSubject({ loaderId: '', isShow: false });
        this.foregroundClosing$ = this.fgClosing.asObservable();
        this.bgClosing = new BehaviorSubject({ loaderId: '', isShow: false });
        this.backgroundClosing$ = this.bgClosing.asObservable();
    }
    /**
     * For internal use only. It may be changed in the future.
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    initLoaderData(loaderId) {
        /** @type {?} */
        let isMaster = false;
        if (loaderId === this.defaultConfig.masterLoaderId) {
            this.throwErrorIfMasterLoaderExists(true);
            isMaster = true;
        }
        else { // not master loader
            this.throwErrorIfLoaderExists(loaderId, true);
        }
        if (this.loaders[loaderId]) {
            this.loaders[loaderId].isBound = true;
            this.loaders[loaderId].isMaster = isMaster;
            // emit showEvent after data loader is bound
            if (this.hasForeground(loaderId)) {
                this.showForeground.next({ loaderId, isShow: true });
            }
            else {
                if (this.hasBackground(loaderId)) {
                    this.showBackground.next({ loaderId, isShow: true });
                }
            }
        }
        else {
            this.createLoaderData(loaderId, isMaster, true);
        }
    }
    /**
     * For internal use only. It may be changed in the future.
     * \@docs-private
     * @param {?} loaderId
     * @param {?} newLoaderId
     * @return {?}
     */
    updateLoaderId(loaderId, newLoaderId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        if (this.loaders[loaderId].loaderId === this.defaultConfig.masterLoaderId) {
            console.warn(`[ngx-ui-loader] - Cannot change loaderId of master loader. The current ` +
                `master's loaderId is "${this.defaultConfig.masterLoaderId}". If you really want to ` +
                `change it, please use NgxUiLoaderModule.forRoot() method.`);
            return;
        }
        if (newLoaderId !== loaderId) {
            this.throwErrorIfLoaderExists(newLoaderId, true);
            this.loaders[newLoaderId] = {
                loaderId: newLoaderId,
                background: Object.assign({}, this.loaders[loaderId].background),
                foreground: Object.assign({}, this.loaders[loaderId].foreground),
                isMaster: false,
                isBound: this.loaders[loaderId].isBound
            };
            delete this.loaders[loaderId];
        }
    }
    /**
     * For internal use only. It may be changed in the future.
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    destroyLoaderData(loaderId) {
        this.stopLoaderAll(loaderId);
        delete this.loaders[loaderId];
    }
    /**
     * Get default loader configuration
     * @return {?} default configuration object
     */
    getDefaultConfig() {
        return Object.assign({}, this.defaultConfig);
    }
    /**
     * Get all the loaders
     * @return {?}
     */
    getLoaders() {
        return JSON.parse(JSON.stringify(this.loaders));
    }
    /**
     * Get data of a specified loader. If loaderId is not provided, it will return data of master loader(if existed)
     * @param {?=} loaderId
     * @return {?}
     */
    getLoader(loaderId) {
        if (loaderId) {
            this.throwErrorIfLoaderNotExist(loaderId);
        }
        else {
            this.throwErrorIfMasterLoaderNotExist();
            loaderId = this.defaultConfig.masterLoaderId;
        }
        return JSON.parse(JSON.stringify(this.loaders[loaderId]));
    }
    /**
     * @deprecated use getLoader() or getLoaders() instead. This will be removed in the version 8.x.x
     * Return status of master loader
     * @return {?}
     */
    getStatus() {
        this.throwErrorIfMasterLoaderNotExist();
        return {
            waitingBackground: this.loaders[this.defaultConfig.masterLoaderId].background,
            waitingForeground: this.loaders[this.defaultConfig.masterLoaderId].foreground
        };
    }
    /**
     * Check whether the queue has a waiting foreground loader with the given `taskId`.
     * If no `taskId` specified, it will check whether the queue has any waiting foreground loader.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id
     * @return {?} boolean
     */
    hasForeground(loaderId, taskId) {
        if (this.loaders[loaderId]) {
            if (taskId) {
                return this.loaders[loaderId].foreground[taskId] ? true : false;
            }
            return Object.keys(this.loaders[loaderId].foreground).length > 0;
        }
        return false;
    }
    /**
     * Check whether the queue has a waiting background loader with the given `taskId`.
     * If no `taskId` specified, it will check whether the queue has any waiting background loader.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id
     * @return {?} boolean
     */
    hasBackground(loaderId, taskId) {
        if (this.loaders[loaderId]) {
            if (taskId) {
                return this.loaders[loaderId].background[taskId] ? true : false;
            }
            return Object.keys(this.loaders[loaderId].background).length > 0;
        }
        return false;
    }
    /**
     * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'default' by default.
     * @return {?}
     */
    startLoader(loaderId, taskId = DEFAULT_TASK_ID) {
        this.createLoaderData(loaderId, undefined, false);
        /** @type {?} */
        const foregroundRunning = this.hasForeground(loaderId);
        this.loaders[loaderId].foreground[taskId] = Date.now();
        if (!this.loaders[loaderId].isBound) {
            return;
        }
        if (!foregroundRunning) {
            if (this.hasBackground(loaderId)) {
                this.backgroundCloseout(loaderId);
                this.showBackground.next({ loaderId, isShow: false });
            }
            this.showForeground.next({ loaderId, isShow: true });
        }
    }
    /**
     * Start the foreground loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stop() method.
     * NOTE: Really this function just wraps startLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'default' by default.
     * @return {?}
     */
    start(taskId = DEFAULT_TASK_ID) {
        this.startLoader(this.defaultConfig.masterLoaderId, taskId);
    }
    /**
     * Start the background loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'default' by default.
     * @return {?}
     */
    startBackgroundLoader(loaderId, taskId = DEFAULT_TASK_ID) {
        this.createLoaderData(loaderId, undefined, false);
        this.loaders[loaderId].background[taskId] = Date.now();
        if (!this.loaders[loaderId].isBound) {
            return;
        }
        if (!this.hasForeground(loaderId)) {
            this.showBackground.next({ loaderId, isShow: true });
        }
    }
    /**
     * Start the background loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
     * NOTE: Really this function just wraps startBackgroundLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'default' by default.
     * @return {?}
     */
    startBackground(taskId = DEFAULT_TASK_ID) {
        this.startBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
    }
    /**
     * Stop a foreground loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'default' is used.
     * @return {?} Object
     */
    stopLoader(loaderId, taskId = DEFAULT_TASK_ID) {
        this.throwErrorIfLoaderNotExist(loaderId);
        // Update loader data {{{
        /** @type {?} */
        const now = Date.now();
        if (this.hasForeground(loaderId, taskId)) {
            if (this.loaders[loaderId].foreground[taskId] + this.defaultConfig.threshold > now) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.stopLoader(loaderId, taskId);
                }), this.loaders[loaderId].foreground[taskId] + this.defaultConfig.threshold - now);
                return;
            }
            delete this.loaders[loaderId].foreground[taskId];
        }
        else {
            return;
        }
        // }}}
        // Emit ShowEvents to update view {{{
        if (!this.hasForeground(loaderId)) {
            this.foregroundCloseout(loaderId);
            this.showForeground.next({ loaderId, isShow: false });
            if (this.hasBackground(loaderId)) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (this.hasBackground(loaderId)) { // still have background tasks
                        this.showBackground.next({ loaderId, isShow: true });
                    }
                }), WAITING_FOR_OVERLAY_DISAPPEAR);
            }
        }
        // }}}
    }
    /**
     * Stop a foreground loading of master loader with specific `taskId`
     * @param {?=} taskId the optional task Id to stop. If not provided, 'default' is used.
     * @return {?} Object
     */
    stop(taskId = DEFAULT_TASK_ID) {
        this.stopLoader(this.defaultConfig.masterLoaderId, taskId);
    }
    /**
     * Stop a background loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'default' is used.
     * @return {?} Object
     */
    stopBackgroundLoader(loaderId, taskId = DEFAULT_TASK_ID) {
        this.throwErrorIfLoaderNotExist(loaderId);
        // Update loader data {{{
        /** @type {?} */
        const now = Date.now();
        if (this.hasBackground(loaderId, taskId)) {
            if (this.loaders[loaderId].background[taskId] + this.defaultConfig.threshold > now) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.stopBackgroundLoader(loaderId, taskId);
                }), this.loaders[loaderId].background[taskId] + this.defaultConfig.threshold - now);
                return;
            }
            delete this.loaders[loaderId].background[taskId];
        }
        else {
            return;
        }
        // }}}
        // Emit ShowEvents to update view {{{
        if (!this.hasForeground(loaderId) && !this.hasBackground(loaderId)) {
            this.backgroundCloseout(loaderId);
            this.showBackground.next({ loaderId, isShow: false });
        }
        // }}}
    }
    /**
     * Stop a background loading of master loader with specific taskId
     * @param {?=} taskId the optional task Id to stop. If not provided, 'default' is used.
     * @return {?} Object
     */
    stopBackground(taskId = DEFAULT_TASK_ID) {
        this.stopBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
    }
    /**
     * Stop all the background and foreground loadings of loader having `loaderId`
     * @param {?} loaderId the loader Id
     * @return {?}
     */
    stopLoaderAll(loaderId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        if (this.hasForeground(loaderId)) {
            this.foregroundCloseout(loaderId);
            this.showForeground.next({ loaderId, isShow: false });
        }
        else if (this.hasBackground(loaderId)) {
            this.backgroundCloseout(loaderId);
            this.showBackground.next({ loaderId, isShow: false });
        }
        this.loaders[loaderId].foreground = {};
        this.loaders[loaderId].background = {};
    }
    /**
     * Stop all the background and foreground loadings of master loader
     * @return {?}
     */
    stopAll() {
        this.stopLoaderAll(this.defaultConfig.masterLoaderId);
    }
    /**
     * Create loader data if it does not exist
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} isMaster
     * @param {?} isBound
     * @return {?}
     */
    createLoaderData(loaderId, isMaster, isBound) {
        if (!this.loaders[loaderId]) {
            this.loaders[loaderId] = {
                loaderId,
                foreground: {},
                background: {},
                isMaster,
                isBound
            };
        }
    }
    /**
     * Throw error if the loaderId does not exist.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @return {?}
     */
    throwErrorIfLoaderNotExist(loaderId) {
        if (!this.loaders[loaderId]) {
            throw new Error(`[ngx-ui-loader] - loaderId "${loaderId}" does not exist.`);
        }
    }
    /**
     * Throw error if the loaderId has already existed.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    throwErrorIfLoaderExists(loaderId, useIsBoundProp) {
        if (this.loaders[loaderId] && (this.loaders[loaderId].isBound && useIsBoundProp)) {
            throw new Error(`[ngx-ui-loader] - loaderId "${loaderId}" is duplicated. Please choose another one!`);
        }
    }
    /**
     * Throw error if the master loader has already existed.
     * \@docs-private
     * @private
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    throwErrorIfMasterLoaderExists(useIsBoundProp) {
        if (this.loaders[this.defaultConfig.masterLoaderId] && (this.loaders[this.defaultConfig.masterLoaderId].isBound && useIsBoundProp)) {
            throw new Error(`[ngx-ui-loader] - The master loader has already existed. `
                + `The app should have only one master loader and it should be placed in the root app template`);
        }
    }
    /**
     * Throw error if the master loader does not exist.
     * \@docs-private
     * @private
     * @return {?}
     */
    throwErrorIfMasterLoaderNotExist() {
        if (!this.loaders[this.defaultConfig.masterLoaderId]) {
            throw new Error(`[ngx-ui-loader] - The master loader does not exist.`);
        }
    }
    /**
     * Manage to close foreground loading
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    foregroundCloseout(loaderId) {
        this.fgClosing.next({ loaderId, isShow: true });
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.fgClosing.next({ loaderId, isShow: false });
        }), CLOSING_TIME);
    }
    /**
     * Manage to close background loading
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    backgroundCloseout(loaderId) {
        this.bgClosing.next({ loaderId, isShow: true });
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.bgClosing.next({ loaderId, isShow: false });
        }), CLOSING_TIME);
    }
}
NgxUiLoaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxUiLoaderService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_CONFIG_TOKEN,] }] }
];
/** @nocollapse */ NgxUiLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function NgxUiLoaderService_Factory() { return new NgxUiLoaderService(i0.inject(i1.NGX_UI_LOADER_CONFIG_TOKEN, 8)); }, token: NgxUiLoaderService, providedIn: "root" });
if (false) {
    /**
     * For internal use only. It may be changed in the future.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.backgroundClosing$;
    /**
     * For internal use only. It may be changed in the future.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.foregroundClosing$;
    /**
     * For internal use only. It may be changed in the future.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.showBackground$;
    /**
     * For internal use only. It may be changed in the future.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.showForeground$;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.bgClosing;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.defaultConfig;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.fgClosing;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.loaders;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.showBackground;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.showForeground;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL25neC11aS1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEgsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7OztBQU8xRSxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQXdDN0IsWUFBb0UsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFFM0YsSUFBSSxDQUFDLGFBQWEscUJBQVEsY0FBYyxDQUFFLENBQUM7UUFFM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7YUFDbEQ7WUFDRCxJQUFJLENBQUMsYUFBYSxxQkFBUSxJQUFJLENBQUMsYUFBYSxFQUFLLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUNoRTtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFZLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUQsQ0FBQzs7Ozs7OztJQU1ELGNBQWMsQ0FBQyxRQUFnQjs7WUFDekIsUUFBUSxHQUFHLEtBQUs7UUFDcEIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUU7WUFDbEQsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDakI7YUFBTSxFQUFFLG9CQUFvQjtZQUMzQixJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDM0MsNENBQTRDO1lBQzVDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEQ7aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDdEQ7YUFDRjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7Ozs7Ozs7O0lBTUQsY0FBYyxDQUFDLFFBQWdCLEVBQUUsV0FBbUI7UUFDbEQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUU7WUFDekUsT0FBTyxDQUFDLElBQUksQ0FBQyx5RUFBeUU7Z0JBQ3BGLHlCQUF5QixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsMkJBQTJCO2dCQUNyRiwyREFBMkQsQ0FBQyxDQUFDO1lBQy9ELE9BQU87U0FDUjtRQUNELElBQUksV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQzFCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixVQUFVLG9CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFFO2dCQUNwRCxVQUFVLG9CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFFO2dCQUNwRCxRQUFRLEVBQUUsS0FBSztnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPO2FBQ3hDLENBQUM7WUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7Ozs7O0lBTUQsaUJBQWlCLENBQUMsUUFBZ0I7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFNRCxnQkFBZ0I7UUFDZCx5QkFBWSxJQUFJLENBQUMsYUFBYSxFQUFHO0lBQ25DLENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7OztJQUtELFNBQVMsQ0FBQyxRQUFpQjtRQUN6QixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7WUFDeEMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7O0lBTUQsU0FBUztRQUNQLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ3hDLE9BQU87WUFDTCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsVUFBVTtZQUM3RSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsVUFBVTtTQUM5RSxDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7SUFTRCxhQUFhLENBQUMsUUFBZ0IsRUFBRSxNQUFlO1FBQzdDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQixJQUFJLE1BQU0sRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNqRTtZQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDbEU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7Ozs7O0lBU0QsYUFBYSxDQUFDLFFBQWdCLEVBQUUsTUFBZTtRQUM3QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDakU7WUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7OztJQVFELFdBQVcsQ0FBQyxRQUFnQixFQUFFLFNBQWlCLGVBQWU7UUFDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7O2NBRTVDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV2RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFRRCxLQUFLLENBQUMsU0FBaUIsZUFBZTtRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7Ozs7O0lBUUQscUJBQXFCLENBQUMsUUFBZ0IsRUFBRSxTQUFpQixlQUFlO1FBQ3RFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV2RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDOzs7Ozs7OztJQVFELGVBQWUsQ0FBQyxTQUFpQixlQUFlO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7Ozs7O0lBUUQsVUFBVSxDQUFDLFFBQWdCLEVBQUUsU0FBaUIsZUFBZTtRQUMzRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLENBQUM7OztjQUdwQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUN0QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO2dCQUNsRixVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLEdBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ25GLE9BQU87YUFDUjtZQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLE9BQU87U0FDUjtRQUNELE1BQU07UUFFTixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDaEMsVUFBVTs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSw4QkFBOEI7d0JBQ2hFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3FCQUN0RDtnQkFDSCxDQUFDLEdBQUUsNkJBQTZCLENBQUMsQ0FBQzthQUNuQztTQUNGO1FBQ0QsTUFBTTtJQUNSLENBQUM7Ozs7OztJQU9ELElBQUksQ0FBQyxTQUFpQixlQUFlO1FBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7OztJQVFELG9CQUFvQixDQUFDLFFBQWdCLEVBQUUsU0FBaUIsZUFBZTtRQUNyRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLENBQUM7OztjQUdwQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUN0QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO2dCQUNsRixVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLENBQUMsR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbkYsT0FBTzthQUNSO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsT0FBTztTQUNSO1FBQ0QsTUFBTTtRQUVOLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsTUFBTTtJQUNSLENBQUM7Ozs7OztJQU9ELGNBQWMsQ0FBQyxTQUFpQixlQUFlO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsUUFBZ0I7UUFDNUIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdkQ7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUtELE9BQU87UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7Ozs7OztJQVNPLGdCQUFnQixDQUFDLFFBQWdCLEVBQUUsUUFBaUIsRUFBRSxPQUFnQjtRQUM1RSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHO2dCQUN2QixRQUFRO2dCQUNSLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVE7Z0JBQ1IsT0FBTzthQUNSLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7Ozs7O0lBTU8sMEJBQTBCLENBQUMsUUFBZ0I7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsUUFBUSxtQkFBbUIsQ0FBQyxDQUFDO1NBQzdFO0lBQ0gsQ0FBQzs7Ozs7Ozs7O0lBTU8sd0JBQXdCLENBQUMsUUFBZ0IsRUFBRSxjQUF3QjtRQUN6RSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxjQUFjLENBQUMsRUFBRTtZQUNoRixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixRQUFRLDZDQUE2QyxDQUFDLENBQUM7U0FDdkc7SUFDSCxDQUFDOzs7Ozs7OztJQU1PLDhCQUE4QixDQUFDLGNBQXdCO1FBQzdELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxjQUFjLENBQUMsRUFBRTtZQUNsSSxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRDtrQkFDdkUsNkZBQTZGLENBQUMsQ0FBQztTQUNwRztJQUNILENBQUM7Ozs7Ozs7SUFNTyxnQ0FBZ0M7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDOzs7Ozs7O0lBTU8sa0JBQWtCLENBQUMsUUFBZ0I7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEQsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxHQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ25CLENBQUM7Ozs7Ozs7SUFNTyxrQkFBa0IsQ0FBQyxRQUFnQjtRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRCxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDLEdBQUUsWUFBWSxDQUFDLENBQUM7SUFDbkIsQ0FBQzs7O1lBNWNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs0Q0F5Q2MsUUFBUSxZQUFJLE1BQU0sU0FBQywwQkFBMEI7Ozs7Ozs7OztJQWhDMUQsZ0RBQTBDOzs7Ozs7SUFNMUMsZ0RBQTBDOzs7Ozs7SUFNMUMsNkNBQXVDOzs7Ozs7SUFNdkMsNkNBQXVDOzs7OztJQUd2Qyx1Q0FBOEM7Ozs7O0lBQzlDLDJDQUF5Qzs7Ozs7SUFDekMsdUNBQThDOzs7OztJQUM5QyxxQ0FBeUI7Ozs7O0lBQ3pCLDRDQUFtRDs7Ozs7SUFDbkQsNENBQW1EOzs7OztJQU12QyxvQ0FBaUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ0xPU0lOR19USU1FLCBERUZBVUxUX1RBU0tfSUQsIERFRkFVTFRfQ09ORklHLCBXQUlUSU5HX0ZPUl9PVkVSTEFZX0RJU0FQUEVBUiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci5jb250YW50cyc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX0NPTkZJR19UT0tFTiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgTmd4VWlMb2FkZXJDb25maWcgfSBmcm9tICcuL25neC11aS1sb2FkZXItY29uZmlnJztcbmltcG9ydCB7IExvYWRlcnMsIExvYWRlciwgU2hvd0V2ZW50LCBUYXNrIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLmludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlclNlcnZpY2Uge1xuXG4gIC8vIFB1YmxpYyBwcm9wZXJ0aWVzXG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS4gSXQgbWF5IGJlIGNoYW5nZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgYmFja2dyb3VuZENsb3NpbmckOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS4gSXQgbWF5IGJlIGNoYW5nZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgZm9yZWdyb3VuZENsb3NpbmckOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS4gSXQgbWF5IGJlIGNoYW5nZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2hvd0JhY2tncm91bmQkOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS4gSXQgbWF5IGJlIGNoYW5nZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2hvd0ZvcmVncm91bmQkOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG4gIHByaXZhdGUgYmdDbG9zaW5nOiBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50PjtcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBOZ3hVaUxvYWRlckNvbmZpZztcbiAgcHJpdmF0ZSBmZ0Nsb3Npbmc6IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+O1xuICBwcml2YXRlIGxvYWRlcnM6IExvYWRlcnM7XG4gIHByaXZhdGUgc2hvd0JhY2tncm91bmQ6IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+O1xuICBwcml2YXRlIHNob3dGb3JlZ3JvdW5kOiBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50PjtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChOR1hfVUlfTE9BREVSX0NPTkZJR19UT0tFTikgcHJpdmF0ZSBjb25maWc6IE5neFVpTG9hZGVyQ29uZmlnKSB7XG5cbiAgICB0aGlzLmRlZmF1bHRDb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHIH07XG5cbiAgICBpZiAodGhpcy5jb25maWcpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy50aHJlc2hvbGQgJiYgdGhpcy5jb25maWcudGhyZXNob2xkIDw9IDApIHtcbiAgICAgICAgdGhpcy5jb25maWcudGhyZXNob2xkID0gREVGQVVMVF9DT05GSUcudGhyZXNob2xkO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnID0geyAuLi50aGlzLmRlZmF1bHRDb25maWcsIC4uLnRoaXMuY29uZmlnIH07XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkZXJzID0ge307XG4gICAgdGhpcy5zaG93Rm9yZWdyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50Pih7IGxvYWRlcklkOiAnJywgaXNTaG93OiBmYWxzZSB9KTtcbiAgICB0aGlzLnNob3dGb3JlZ3JvdW5kJCA9IHRoaXMuc2hvd0ZvcmVncm91bmQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zaG93QmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50Pih7IGxvYWRlcklkOiAnJywgaXNTaG93OiBmYWxzZSB9KTtcbiAgICB0aGlzLnNob3dCYWNrZ3JvdW5kJCA9IHRoaXMuc2hvd0JhY2tncm91bmQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5mZ0Nsb3NpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD4oeyBsb2FkZXJJZDogJycsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgdGhpcy5mb3JlZ3JvdW5kQ2xvc2luZyQgPSB0aGlzLmZnQ2xvc2luZy5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLmJnQ2xvc2luZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50Pih7IGxvYWRlcklkOiAnJywgaXNTaG93OiBmYWxzZSB9KTtcbiAgICB0aGlzLmJhY2tncm91bmRDbG9zaW5nJCA9IHRoaXMuYmdDbG9zaW5nLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS4gSXQgbWF5IGJlIGNoYW5nZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgaW5pdExvYWRlckRhdGEobG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBpc01hc3RlciA9IGZhbHNlO1xuICAgIGlmIChsb2FkZXJJZCA9PT0gdGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3JJZk1hc3RlckxvYWRlckV4aXN0cyh0cnVlKTtcbiAgICAgIGlzTWFzdGVyID0gdHJ1ZTtcbiAgICB9IGVsc2UgeyAvLyBub3QgbWFzdGVyIGxvYWRlclxuICAgICAgdGhpcy50aHJvd0Vycm9ySWZMb2FkZXJFeGlzdHMobG9hZGVySWQsIHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2FkZXJzW2xvYWRlcklkXSkge1xuICAgICAgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5pc0JvdW5kID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uaXNNYXN0ZXIgPSBpc01hc3RlcjtcbiAgICAgIC8vIGVtaXQgc2hvd0V2ZW50IGFmdGVyIGRhdGEgbG9hZGVyIGlzIGJvdW5kXG4gICAgICBpZiAodGhpcy5oYXNGb3JlZ3JvdW5kKGxvYWRlcklkKSkge1xuICAgICAgICB0aGlzLnNob3dGb3JlZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQmFja2dyb3VuZChsb2FkZXJJZCkpIHtcbiAgICAgICAgICB0aGlzLnNob3dCYWNrZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3JlYXRlTG9hZGVyRGF0YShsb2FkZXJJZCwgaXNNYXN0ZXIsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuIEl0IG1heSBiZSBjaGFuZ2VkIGluIHRoZSBmdXR1cmUuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHVwZGF0ZUxvYWRlcklkKGxvYWRlcklkOiBzdHJpbmcsIG5ld0xvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRocm93RXJyb3JJZkxvYWRlck5vdEV4aXN0KGxvYWRlcklkKTtcbiAgICBpZiAodGhpcy5sb2FkZXJzW2xvYWRlcklkXS5sb2FkZXJJZCA9PT0gdGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFtuZ3gtdWktbG9hZGVyXSAtIENhbm5vdCBjaGFuZ2UgbG9hZGVySWQgb2YgbWFzdGVyIGxvYWRlci4gVGhlIGN1cnJlbnQgYCArXG4gICAgICAgIGBtYXN0ZXIncyBsb2FkZXJJZCBpcyBcIiR7dGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkfVwiLiBJZiB5b3UgcmVhbGx5IHdhbnQgdG8gYCArXG4gICAgICAgIGBjaGFuZ2UgaXQsIHBsZWFzZSB1c2UgTmd4VWlMb2FkZXJNb2R1bGUuZm9yUm9vdCgpIG1ldGhvZC5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5ld0xvYWRlcklkICE9PSBsb2FkZXJJZCkge1xuICAgICAgdGhpcy50aHJvd0Vycm9ySWZMb2FkZXJFeGlzdHMobmV3TG9hZGVySWQsIHRydWUpO1xuICAgICAgdGhpcy5sb2FkZXJzW25ld0xvYWRlcklkXSA9IHtcbiAgICAgICAgbG9hZGVySWQ6IG5ld0xvYWRlcklkLFxuICAgICAgICBiYWNrZ3JvdW5kOiB7IC4uLnRoaXMubG9hZGVyc1tsb2FkZXJJZF0uYmFja2dyb3VuZCB9LFxuICAgICAgICBmb3JlZ3JvdW5kOiB7IC4uLnRoaXMubG9hZGVyc1tsb2FkZXJJZF0uZm9yZWdyb3VuZCB9LFxuICAgICAgICBpc01hc3RlcjogZmFsc2UsXG4gICAgICAgIGlzQm91bmQ6IHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uaXNCb3VuZFxuICAgICAgfTtcbiAgICAgIGRlbGV0ZSB0aGlzLmxvYWRlcnNbbG9hZGVySWRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuIEl0IG1heSBiZSBjaGFuZ2VkIGluIHRoZSBmdXR1cmUuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGRlc3Ryb3lMb2FkZXJEYXRhKGxvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BMb2FkZXJBbGwobG9hZGVySWQpO1xuICAgIGRlbGV0ZSB0aGlzLmxvYWRlcnNbbG9hZGVySWRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkZWZhdWx0IGxvYWRlciBjb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIGRlZmF1bHQgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIGdldERlZmF1bHRDb25maWcoKTogTmd4VWlMb2FkZXJDb25maWcge1xuICAgIHJldHVybiB7IC4uLnRoaXMuZGVmYXVsdENvbmZpZyB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdGhlIGxvYWRlcnNcbiAgICovXG4gIGdldExvYWRlcnMoKTogTG9hZGVycyB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5sb2FkZXJzKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGEgb2YgYSBzcGVjaWZpZWQgbG9hZGVyLiBJZiBsb2FkZXJJZCBpcyBub3QgcHJvdmlkZWQsIGl0IHdpbGwgcmV0dXJuIGRhdGEgb2YgbWFzdGVyIGxvYWRlcihpZiBleGlzdGVkKVxuICAgKi9cbiAgZ2V0TG9hZGVyKGxvYWRlcklkPzogc3RyaW5nKTogTG9hZGVyIHtcbiAgICBpZiAobG9hZGVySWQpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcklmTG9hZGVyTm90RXhpc3QobG9hZGVySWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRocm93RXJyb3JJZk1hc3RlckxvYWRlck5vdEV4aXN0KCk7XG4gICAgICBsb2FkZXJJZCA9IHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZDtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5sb2FkZXJzW2xvYWRlcklkXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSBnZXRMb2FkZXIoKSBvciBnZXRMb2FkZXJzKCkgaW5zdGVhZC4gVGhpcyB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIHZlcnNpb24gOC54LnhcbiAgICogUmV0dXJuIHN0YXR1cyBvZiBtYXN0ZXIgbG9hZGVyXG4gICAqL1xuICBnZXRTdGF0dXMoKTogeyB3YWl0aW5nQmFja2dyb3VuZDogVGFzaywgd2FpdGluZ0ZvcmVncm91bmQ6IFRhc2sgfSB7XG4gICAgdGhpcy50aHJvd0Vycm9ySWZNYXN0ZXJMb2FkZXJOb3RFeGlzdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB3YWl0aW5nQmFja2dyb3VuZDogdGhpcy5sb2FkZXJzW3RoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZF0uYmFja2dyb3VuZCxcbiAgICAgIHdhaXRpbmdGb3JlZ3JvdW5kOiB0aGlzLmxvYWRlcnNbdGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkXS5mb3JlZ3JvdW5kXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBxdWV1ZSBoYXMgYSB3YWl0aW5nIGZvcmVncm91bmQgbG9hZGVyIHdpdGggdGhlIGdpdmVuIGB0YXNrSWRgLlxuICAgKiBJZiBubyBgdGFza0lkYCBzcGVjaWZpZWQsIGl0IHdpbGwgY2hlY2sgd2hldGhlciB0aGUgcXVldWUgaGFzIGFueSB3YWl0aW5nIGZvcmVncm91bmQgbG9hZGVyLlxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIGhhc0ZvcmVncm91bmQobG9hZGVySWQ6IHN0cmluZywgdGFza0lkPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0pIHtcbiAgICAgIGlmICh0YXNrSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uZm9yZWdyb3VuZFt0YXNrSWRdID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uZm9yZWdyb3VuZCkubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlIHF1ZXVlIGhhcyBhIHdhaXRpbmcgYmFja2dyb3VuZCBsb2FkZXIgd2l0aCB0aGUgZ2l2ZW4gYHRhc2tJZGAuXG4gICAqIElmIG5vIGB0YXNrSWRgIHNwZWNpZmllZCwgaXQgd2lsbCBjaGVjayB3aGV0aGVyIHRoZSBxdWV1ZSBoYXMgYW55IHdhaXRpbmcgYmFja2dyb3VuZCBsb2FkZXIuXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIElkXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWRcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgaGFzQmFja2dyb3VuZChsb2FkZXJJZDogc3RyaW5nLCB0YXNrSWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5sb2FkZXJzW2xvYWRlcklkXSkge1xuICAgICAgaWYgKHRhc2tJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5iYWNrZ3JvdW5kW3Rhc2tJZF0gPyB0cnVlIDogZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5sb2FkZXJzW2xvYWRlcklkXS5iYWNrZ3JvdW5kKS5sZW5ndGggPiAwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIGZvcmVncm91bmQgbG9hZGluZyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGAgd2l0aCBhIHNwZWNpZmllZCBgdGFza0lkYC5cbiAgICogVGhlIGxvYWRpbmcgaXMgb25seSBjbG9zZWQgb2ZmIHdoZW4gYWxsIHRhc2tJZHMgb2YgdGhhdCBsb2FkZXIgYXJlIGNhbGxlZCB3aXRoIHN0b3BMb2FkZXIoKSBtZXRob2QuXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIElkXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgb2YgdGhlIGxvYWRpbmcuIHRhc2tJZCBpcyBzZXQgdG8gJ2RlZmF1bHQnIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdGFydExvYWRlcihsb2FkZXJJZDogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZyA9IERFRkFVTFRfVEFTS19JRCk6IHZvaWQge1xuICAgIHRoaXMuY3JlYXRlTG9hZGVyRGF0YShsb2FkZXJJZCwgdW5kZWZpbmVkLCBmYWxzZSk7XG5cbiAgICBjb25zdCBmb3JlZ3JvdW5kUnVubmluZyA9IHRoaXMuaGFzRm9yZWdyb3VuZChsb2FkZXJJZCk7XG4gICAgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5mb3JlZ3JvdW5kW3Rhc2tJZF0gPSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKCF0aGlzLmxvYWRlcnNbbG9hZGVySWRdLmlzQm91bmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWZvcmVncm91bmRSdW5uaW5nKSB7XG4gICAgICBpZiAodGhpcy5oYXNCYWNrZ3JvdW5kKGxvYWRlcklkKSkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbG9zZW91dChsb2FkZXJJZCk7XG4gICAgICAgIHRoaXMuc2hvd0JhY2tncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zaG93Rm9yZWdyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIGZvcmVncm91bmQgbG9hZGluZyBvZiBtYXN0ZXIgbG9hZGVyIHdpdGggYSBzcGVjaWZpZWQgYHRhc2tJZGAuXG4gICAqIFRoZSBsb2FkaW5nIGlzIG9ubHkgY2xvc2VkIG9mZiB3aGVuIGFsbCB0YXNrSWRzIG9mIHRoYXQgbG9hZGVyIGFyZSBjYWxsZWQgd2l0aCBzdG9wKCkgbWV0aG9kLlxuICAgKiBOT1RFOiBSZWFsbHkgdGhpcyBmdW5jdGlvbiBqdXN0IHdyYXBzIHN0YXJ0TG9hZGVyKCkgZnVuY3Rpb25cbiAgICogQHBhcmFtIHRhc2tJZCB0aGUgb3B0aW9uYWwgdGFzayBJZCBvZiB0aGUgbG9hZGluZy4gdGFza0lkIGlzIHNldCB0byAnZGVmYXVsdCcgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN0YXJ0KHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9UQVNLX0lEKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQsIHRhc2tJZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIGJhY2tncm91bmQgbG9hZGluZyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGAgd2l0aCBhIHNwZWNpZmllZCBgdGFza0lkYC5cbiAgICogVGhlIGxvYWRpbmcgaXMgb25seSBjbG9zZWQgb2ZmIHdoZW4gYWxsIHRhc2tJZHMgb2YgdGhhdCBsb2FkZXIgYXJlIGNhbGxlZCB3aXRoIHN0b3BMb2FkZXJCYWNrZ3JvdW5kKCkgbWV0aG9kLlxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIG9mIHRoZSBsb2FkaW5nLiB0YXNrSWQgaXMgc2V0IHRvICdkZWZhdWx0JyBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RhcnRCYWNrZ3JvdW5kTG9hZGVyKGxvYWRlcklkOiBzdHJpbmcsIHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9UQVNLX0lEKTogdm9pZCB7XG4gICAgdGhpcy5jcmVhdGVMb2FkZXJEYXRhKGxvYWRlcklkLCB1bmRlZmluZWQsIGZhbHNlKTtcblxuICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uYmFja2dyb3VuZFt0YXNrSWRdID0gRGF0ZS5ub3coKTtcblxuICAgIGlmICghdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5pc0JvdW5kKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc0ZvcmVncm91bmQobG9hZGVySWQpKSB7XG4gICAgICB0aGlzLnNob3dCYWNrZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgYmFja2dyb3VuZCBsb2FkaW5nIG9mIG1hc3RlciBsb2FkZXIgd2l0aCBhIHNwZWNpZmllZCBgdGFza0lkYC5cbiAgICogVGhlIGxvYWRpbmcgaXMgb25seSBjbG9zZWQgb2ZmIHdoZW4gYWxsIHRhc2tJZHMgb2YgdGhhdCBsb2FkZXIgYXJlIGNhbGxlZCB3aXRoIHN0b3BCYWNrZ3JvdW5kKCkgbWV0aG9kLlxuICAgKiBOT1RFOiBSZWFsbHkgdGhpcyBmdW5jdGlvbiBqdXN0IHdyYXBzIHN0YXJ0QmFja2dyb3VuZExvYWRlcigpIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgb2YgdGhlIGxvYWRpbmcuIHRhc2tJZCBpcyBzZXQgdG8gJ2RlZmF1bHQnIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdGFydEJhY2tncm91bmQodGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX1RBU0tfSUQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0QmFja2dyb3VuZExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQsIHRhc2tJZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBhIGZvcmVncm91bmQgbG9hZGluZyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGAgd2l0aCBzcGVjaWZpYyBgdGFza0lkYFxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIHRvIHN0b3AuIElmIG5vdCBwcm92aWRlZCwgJ2RlZmF1bHQnIGlzIHVzZWQuXG4gICAqIEByZXR1cm5zIE9iamVjdFxuICAgKi9cbiAgc3RvcExvYWRlcihsb2FkZXJJZDogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZyA9IERFRkFVTFRfVEFTS19JRCk6IHZvaWQge1xuICAgIHRoaXMudGhyb3dFcnJvcklmTG9hZGVyTm90RXhpc3QobG9hZGVySWQpO1xuXG4gICAgLy8gVXBkYXRlIGxvYWRlciBkYXRhIHt7e1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKHRoaXMuaGFzRm9yZWdyb3VuZChsb2FkZXJJZCwgdGFza0lkKSkge1xuICAgICAgaWYgKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uZm9yZWdyb3VuZFt0YXNrSWRdICsgdGhpcy5kZWZhdWx0Q29uZmlnLnRocmVzaG9sZCA+IG5vdykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnN0b3BMb2FkZXIobG9hZGVySWQsIHRhc2tJZCk7XG4gICAgICAgIH0sIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uZm9yZWdyb3VuZFt0YXNrSWRdICsgdGhpcy5kZWZhdWx0Q29uZmlnLnRocmVzaG9sZCAtIG5vdyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLmxvYWRlcnNbbG9hZGVySWRdLmZvcmVncm91bmRbdGFza0lkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB9fX1cblxuICAgIC8vIEVtaXQgU2hvd0V2ZW50cyB0byB1cGRhdGUgdmlldyB7e3tcbiAgICBpZiAoIXRoaXMuaGFzRm9yZWdyb3VuZChsb2FkZXJJZCkpIHtcbiAgICAgIHRoaXMuZm9yZWdyb3VuZENsb3Nlb3V0KGxvYWRlcklkKTtcbiAgICAgIHRoaXMuc2hvd0ZvcmVncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgICAgaWYgKHRoaXMuaGFzQmFja2dyb3VuZChsb2FkZXJJZCkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaGFzQmFja2dyb3VuZChsb2FkZXJJZCkpIHsgLy8gc3RpbGwgaGF2ZSBiYWNrZ3JvdW5kIHRhc2tzXG4gICAgICAgICAgICB0aGlzLnNob3dCYWNrZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgV0FJVElOR19GT1JfT1ZFUkxBWV9ESVNBUFBFQVIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB9fX1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGEgZm9yZWdyb3VuZCBsb2FkaW5nIG9mIG1hc3RlciBsb2FkZXIgd2l0aCBzcGVjaWZpYyBgdGFza0lkYFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIHRvIHN0b3AuIElmIG5vdCBwcm92aWRlZCwgJ2RlZmF1bHQnIGlzIHVzZWQuXG4gICAqIEByZXR1cm5zIE9iamVjdFxuICAgKi9cbiAgc3RvcCh0YXNrSWQ6IHN0cmluZyA9IERFRkFVTFRfVEFTS19JRCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQsIHRhc2tJZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBhIGJhY2tncm91bmQgbG9hZGluZyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGAgd2l0aCBzcGVjaWZpYyBgdGFza0lkYFxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIHRvIHN0b3AuIElmIG5vdCBwcm92aWRlZCwgJ2RlZmF1bHQnIGlzIHVzZWQuXG4gICAqIEByZXR1cm5zIE9iamVjdFxuICAgKi9cbiAgc3RvcEJhY2tncm91bmRMb2FkZXIobG9hZGVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX1RBU0tfSUQpOiB2b2lkIHtcbiAgICB0aGlzLnRocm93RXJyb3JJZkxvYWRlck5vdEV4aXN0KGxvYWRlcklkKTtcblxuICAgIC8vIFVwZGF0ZSBsb2FkZXIgZGF0YSB7e3tcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGlmICh0aGlzLmhhc0JhY2tncm91bmQobG9hZGVySWQsIHRhc2tJZCkpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlcnNbbG9hZGVySWRdLmJhY2tncm91bmRbdGFza0lkXSArIHRoaXMuZGVmYXVsdENvbmZpZy50aHJlc2hvbGQgPiBub3cpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdG9wQmFja2dyb3VuZExvYWRlcihsb2FkZXJJZCwgdGFza0lkKTtcbiAgICAgICAgfSwgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5iYWNrZ3JvdW5kW3Rhc2tJZF0gKyB0aGlzLmRlZmF1bHRDb25maWcudGhyZXNob2xkIC0gbm93KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGVsZXRlIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uYmFja2dyb3VuZFt0YXNrSWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIH19fVxuXG4gICAgLy8gRW1pdCBTaG93RXZlbnRzIHRvIHVwZGF0ZSB2aWV3IHt7e1xuICAgIGlmICghdGhpcy5oYXNGb3JlZ3JvdW5kKGxvYWRlcklkKSAmJiAhdGhpcy5oYXNCYWNrZ3JvdW5kKGxvYWRlcklkKSkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQpO1xuICAgICAgdGhpcy5zaG93QmFja2dyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgfVxuICAgIC8vIH19fVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYSBiYWNrZ3JvdW5kIGxvYWRpbmcgb2YgbWFzdGVyIGxvYWRlciB3aXRoIHNwZWNpZmljIHRhc2tJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIHRvIHN0b3AuIElmIG5vdCBwcm92aWRlZCwgJ2RlZmF1bHQnIGlzIHVzZWQuXG4gICAqIEByZXR1cm5zIE9iamVjdFxuICAgKi9cbiAgc3RvcEJhY2tncm91bmQodGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX1RBU0tfSUQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BCYWNrZ3JvdW5kTG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCwgdGFza0lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGFsbCB0aGUgYmFja2dyb3VuZCBhbmQgZm9yZWdyb3VuZCBsb2FkaW5ncyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGBcbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgSWRcbiAgICovXG4gIHN0b3BMb2FkZXJBbGwobG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGhyb3dFcnJvcklmTG9hZGVyTm90RXhpc3QobG9hZGVySWQpO1xuXG4gICAgaWYgKHRoaXMuaGFzRm9yZWdyb3VuZChsb2FkZXJJZCkpIHtcbiAgICAgIHRoaXMuZm9yZWdyb3VuZENsb3Nlb3V0KGxvYWRlcklkKTtcbiAgICAgIHRoaXMuc2hvd0ZvcmVncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNCYWNrZ3JvdW5kKGxvYWRlcklkKSkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQpO1xuICAgICAgdGhpcy5zaG93QmFja2dyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgfVxuICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uZm9yZWdyb3VuZCA9IHt9O1xuICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uYmFja2dyb3VuZCA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYWxsIHRoZSBiYWNrZ3JvdW5kIGFuZCBmb3JlZ3JvdW5kIGxvYWRpbmdzIG9mIG1hc3RlciBsb2FkZXJcbiAgICovXG4gIHN0b3BBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wTG9hZGVyQWxsKHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGxvYWRlciBkYXRhIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAqIEBwYXJhbSBsb2FkZXJJZFxuICAgKiBAcGFyYW0gaXNNYXN0ZXJcbiAgICogQHBhcmFtIGlzQm91bmRcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkZXJEYXRhKGxvYWRlcklkOiBzdHJpbmcsIGlzTWFzdGVyOiBib29sZWFuLCBpc0JvdW5kOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmxvYWRlcnNbbG9hZGVySWRdKSB7XG4gICAgICB0aGlzLmxvYWRlcnNbbG9hZGVySWRdID0ge1xuICAgICAgICBsb2FkZXJJZCxcbiAgICAgICAgZm9yZWdyb3VuZDoge30sXG4gICAgICAgIGJhY2tncm91bmQ6IHt9LFxuICAgICAgICBpc01hc3RlcixcbiAgICAgICAgaXNCb3VuZFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgZXJyb3IgaWYgdGhlIGxvYWRlcklkIGRvZXMgbm90IGV4aXN0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHRocm93RXJyb3JJZkxvYWRlck5vdEV4aXN0KGxvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubG9hZGVyc1tsb2FkZXJJZF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW25neC11aS1sb2FkZXJdIC0gbG9hZGVySWQgXCIke2xvYWRlcklkfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvdyBlcnJvciBpZiB0aGUgbG9hZGVySWQgaGFzIGFscmVhZHkgZXhpc3RlZC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSB0aHJvd0Vycm9ySWZMb2FkZXJFeGlzdHMobG9hZGVySWQ6IHN0cmluZywgdXNlSXNCb3VuZFByb3A/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0gJiYgKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uaXNCb3VuZCAmJiB1c2VJc0JvdW5kUHJvcCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW25neC11aS1sb2FkZXJdIC0gbG9hZGVySWQgXCIke2xvYWRlcklkfVwiIGlzIGR1cGxpY2F0ZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlciBvbmUhYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIHRoZSBtYXN0ZXIgbG9hZGVyIGhhcyBhbHJlYWR5IGV4aXN0ZWQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgdGhyb3dFcnJvcklmTWFzdGVyTG9hZGVyRXhpc3RzKHVzZUlzQm91bmRQcm9wPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvYWRlcnNbdGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkXSAmJiAodGhpcy5sb2FkZXJzW3RoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZF0uaXNCb3VuZCAmJiB1c2VJc0JvdW5kUHJvcCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW25neC11aS1sb2FkZXJdIC0gVGhlIG1hc3RlciBsb2FkZXIgaGFzIGFscmVhZHkgZXhpc3RlZC4gYFxuICAgICAgICArIGBUaGUgYXBwIHNob3VsZCBoYXZlIG9ubHkgb25lIG1hc3RlciBsb2FkZXIgYW5kIGl0IHNob3VsZCBiZSBwbGFjZWQgaW4gdGhlIHJvb3QgYXBwIHRlbXBsYXRlYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIHRoZSBtYXN0ZXIgbG9hZGVyIGRvZXMgbm90IGV4aXN0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHRocm93RXJyb3JJZk1hc3RlckxvYWRlck5vdEV4aXN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5sb2FkZXJzW3RoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW25neC11aS1sb2FkZXJdIC0gVGhlIG1hc3RlciBsb2FkZXIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hbmFnZSB0byBjbG9zZSBmb3JlZ3JvdW5kIGxvYWRpbmdcbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgaWRcbiAgICovXG4gIHByaXZhdGUgZm9yZWdyb3VuZENsb3Nlb3V0KGxvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmZnQ2xvc2luZy5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogdHJ1ZSB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZmdDbG9zaW5nLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiBmYWxzZSB9KTtcbiAgICB9LCBDTE9TSU5HX1RJTUUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbmFnZSB0byBjbG9zZSBiYWNrZ3JvdW5kIGxvYWRpbmdcbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgaWRcbiAgICovXG4gIHByaXZhdGUgYmFja2dyb3VuZENsb3Nlb3V0KGxvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmJnQ2xvc2luZy5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogdHJ1ZSB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYmdDbG9zaW5nLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiBmYWxzZSB9KTtcbiAgICB9LCBDTE9TSU5HX1RJTUUpO1xuICB9XG59XG4iXX0=