/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject, Optional } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
import { HTTP_LOADER_ID } from './ngx-ui-loader-http.constants';
var NgxUiLoaderHttpInterceptor = /** @class */ (function () {
    /**
     * Constructor
     * @param config
     * @param ngxUiLoaderService
     */
    function NgxUiLoaderHttpInterceptor(config, ngxUiLoaderService) {
        this.ngxUiLoaderService = ngxUiLoaderService;
        this.count = 0;
        this.defaultConfig = {
            loaderId: this.ngxUiLoaderService.getDefaultConfig().masterLoaderId,
            showForeground: false
        };
        if (config) {
            if (config.exclude) {
                this.exclude = config.exclude.map((/**
                 * @param {?} url
                 * @return {?}
                 */
                function (url) { return url.toLowerCase(); }));
            }
            if (config.excludeRegexp) {
                this.excludeRegexp = config.excludeRegexp.map((/**
                 * @param {?} regexp
                 * @return {?}
                 */
                function (regexp) { return new RegExp(regexp, 'i'); }));
            }
            this.defaultConfig = tslib_1.__assign({}, this.defaultConfig, config);
        }
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    NgxUiLoaderHttpInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        if (this.isIgnored(req.url)) {
            return next.handle(req);
        }
        this.count++;
        if (this.defaultConfig.showForeground) {
            if (!this.ngxUiLoaderService.hasForeground(this.defaultConfig.loaderId, HTTP_LOADER_ID)) {
                this.ngxUiLoaderService.startLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
            }
        }
        else {
            if (!this.ngxUiLoaderService.hasBackground(this.defaultConfig.loaderId, HTTP_LOADER_ID)) {
                this.ngxUiLoaderService.startBackgroundLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
            }
        }
        return next.handle(req).pipe(finalize((/**
         * @return {?}
         */
        function () {
            _this.count--;
            if (_this.count === 0) {
                if (_this.defaultConfig.showForeground) {
                    _this.ngxUiLoaderService.stopLoader(_this.defaultConfig.loaderId, HTTP_LOADER_ID);
                }
                else {
                    _this.ngxUiLoaderService.stopBackgroundLoader(_this.defaultConfig.loaderId, HTTP_LOADER_ID);
                }
            }
        })));
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    NgxUiLoaderHttpInterceptor.prototype.isIgnored = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (this.exclude) {
            // do not show the loader for api urls in the `exclude` list
            if (this.exclude.findIndex((/**
             * @param {?} str
             * @return {?}
             */
            function (str) { return url.toLowerCase().startsWith(str); })) !== -1) {
                return true;
            }
        }
        if (this.excludeRegexp) {
            // do not show the loader for api urls which matches regexps in the `excludeRegexp` list
            if (this.excludeRegexp.findIndex((/**
             * @param {?} regexp
             * @return {?}
             */
            function (regexp) { return regexp.test(url); })) !== -1) {
                return true;
            }
        }
        return false;
    };
    NgxUiLoaderHttpInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgxUiLoaderHttpInterceptor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_HTTP_CONFIG_TOKEN,] }] },
        { type: NgxUiLoaderService }
    ]; };
    return NgxUiLoaderHttpInterceptor;
}());
export { NgxUiLoaderHttpInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.count;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.defaultConfig;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.exclude;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.excludeRegexp;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.ngxUiLoaderService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1odHRwLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9odHRwL25neC11aS1sb2FkZXItaHR0cC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRWhFO0lBUUU7Ozs7T0FJRztJQUNILG9DQUFpRSxNQUE2QixFQUNwRixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUU5QyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGNBQWM7WUFDbkUsY0FBYyxFQUFFLEtBQUs7U0FDdEIsQ0FBQztRQUVGLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztnQkFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO2FBQzdEO1lBQ0QsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO2dCQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENB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WSwwQkFBMEI7Ozs7OztJQUVyQywyQ0FBc0I7Ozs7O0lBQ3RCLG1EQUE2Qzs7Ozs7SUFDN0MsNkNBQTBCOzs7OztJQUMxQixtREFBZ0M7Ozs7O0lBUTlCLHdEQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciwgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmd4VWlMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9uZ3gtdWktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTkdYX1VJX0xPQURFUl9IVFRQX0NPTkZJR19UT0tFTiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1odHRwLWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBOZ3hVaUxvYWRlckh0dHBDb25maWcgfSBmcm9tICcuL25neC11aS1sb2FkZXItaHR0cC1jb25maWcnO1xuaW1wb3J0IHsgSFRUUF9MT0FERVJfSUQgfSBmcm9tICcuL25neC11aS1sb2FkZXItaHR0cC5jb25zdGFudHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4VWlMb2FkZXJIdHRwSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gIHByaXZhdGUgY291bnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBOZ3hVaUxvYWRlckh0dHBDb25maWc7XG4gIHByaXZhdGUgZXhjbHVkZTogc3RyaW5nW107XG4gIHByaXZhdGUgZXhjbHVkZVJlZ2V4cDogUmVnRXhwW107XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHBhcmFtIG5neFVpTG9hZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChOR1hfVUlfTE9BREVSX0hUVFBfQ09ORklHX1RPS0VOKSBjb25maWc6IE5neFVpTG9hZGVySHR0cENvbmZpZyxcbiAgICBwcml2YXRlIG5neFVpTG9hZGVyU2VydmljZTogTmd4VWlMb2FkZXJTZXJ2aWNlKSB7XG5cbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLmRlZmF1bHRDb25maWcgPSB7XG4gICAgICBsb2FkZXJJZDogdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpLm1hc3RlckxvYWRlcklkLFxuICAgICAgc2hvd0ZvcmVncm91bmQ6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmIChjb25maWcpIHtcbiAgICAgIGlmIChjb25maWcuZXhjbHVkZSkge1xuICAgICAgICB0aGlzLmV4Y2x1ZGUgPSBjb25maWcuZXhjbHVkZS5tYXAodXJsID0+IHVybC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuZXhjbHVkZVJlZ2V4cCkge1xuICAgICAgICB0aGlzLmV4Y2x1ZGVSZWdleHAgPSBjb25maWcuZXhjbHVkZVJlZ2V4cC5tYXAocmVnZXhwID0+IG5ldyBSZWdFeHAocmVnZXhwLCAnaScpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHsgLi4udGhpcy5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWcgfTtcbiAgICB9XG4gIH1cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAodGhpcy5pc0lnbm9yZWQocmVxLnVybCkpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH1cblxuICAgIHRoaXMuY291bnQrKztcbiAgICBpZiAodGhpcy5kZWZhdWx0Q29uZmlnLnNob3dGb3JlZ3JvdW5kKSB7XG4gICAgICBpZiAoIXRoaXMubmd4VWlMb2FkZXJTZXJ2aWNlLmhhc0ZvcmVncm91bmQodGhpcy5kZWZhdWx0Q29uZmlnLmxvYWRlcklkLCBIVFRQX0xPQURFUl9JRCkpIHtcbiAgICAgICAgdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2Uuc3RhcnRMb2FkZXIodGhpcy5kZWZhdWx0Q29uZmlnLmxvYWRlcklkLCBIVFRQX0xPQURFUl9JRCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2UuaGFzQmFja2dyb3VuZCh0aGlzLmRlZmF1bHRDb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX0lEKSkge1xuICAgICAgICB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5zdGFydEJhY2tncm91bmRMb2FkZXIodGhpcy5kZWZhdWx0Q29uZmlnLmxvYWRlcklkLCBIVFRQX0xPQURFUl9JRCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICB0aGlzLmNvdW50LS07XG4gICAgICBpZiAodGhpcy5jb3VudCA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy5kZWZhdWx0Q29uZmlnLnNob3dGb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2Uuc3RvcExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX0lEKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5zdG9wQmFja2dyb3VuZExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX0lEKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNJZ25vcmVkKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZXhjbHVkZSkge1xuICAgICAgLy8gZG8gbm90IHNob3cgdGhlIGxvYWRlciBmb3IgYXBpIHVybHMgaW4gdGhlIGBleGNsdWRlYCBsaXN0XG4gICAgICBpZiAodGhpcy5leGNsdWRlLmZpbmRJbmRleChzdHIgPT4gdXJsLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChzdHIpKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZXhjbHVkZVJlZ2V4cCkge1xuICAgICAgLy8gZG8gbm90IHNob3cgdGhlIGxvYWRlciBmb3IgYXBpIHVybHMgd2hpY2ggbWF0Y2hlcyByZWdleHBzIGluIHRoZSBgZXhjbHVkZVJlZ2V4cGAgbGlzdFxuICAgICAgaWYgKHRoaXMuZXhjbHVkZVJlZ2V4cC5maW5kSW5kZXgocmVnZXhwID0+IHJlZ2V4cC50ZXN0KHVybCkpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==