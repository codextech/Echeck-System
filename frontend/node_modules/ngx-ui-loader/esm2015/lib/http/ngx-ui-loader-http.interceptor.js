/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
import { HTTP_LOADER_ID } from './ngx-ui-loader-http.constants';
export class NgxUiLoaderHttpInterceptor {
    /**
     * Constructor
     * @param {?} config
     * @param {?} ngxUiLoaderService
     */
    constructor(config, ngxUiLoaderService) {
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
                url => url.toLowerCase()));
            }
            if (config.excludeRegexp) {
                this.excludeRegexp = config.excludeRegexp.map((/**
                 * @param {?} regexp
                 * @return {?}
                 */
                regexp => new RegExp(regexp, 'i')));
            }
            this.defaultConfig = Object.assign({}, this.defaultConfig, config);
        }
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
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
        () => {
            this.count--;
            if (this.count === 0) {
                if (this.defaultConfig.showForeground) {
                    this.ngxUiLoaderService.stopLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
                }
                else {
                    this.ngxUiLoaderService.stopBackgroundLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
                }
            }
        })));
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    isIgnored(url) {
        if (this.exclude) {
            // do not show the loader for api urls in the `exclude` list
            if (this.exclude.findIndex((/**
             * @param {?} str
             * @return {?}
             */
            str => url.toLowerCase().startsWith(str))) !== -1) {
                return true;
            }
        }
        if (this.excludeRegexp) {
            // do not show the loader for api urls which matches regexps in the `excludeRegexp` list
            if (this.excludeRegexp.findIndex((/**
             * @param {?} regexp
             * @return {?}
             */
            regexp => regexp.test(url))) !== -1) {
                return true;
            }
        }
        return false;
    }
}
NgxUiLoaderHttpInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxUiLoaderHttpInterceptor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_HTTP_CONFIG_TOKEN,] }] },
    { type: NgxUiLoaderService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1odHRwLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9odHRwL25neC11aS1sb2FkZXItaHR0cC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFHaEUsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7O0lBWXJDLFlBQWlFLE1BQTZCLEVBQ3BGLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRTlDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUMsY0FBYztZQUNuRSxjQUFjLEVBQUUsS0FBSztTQUN0QixDQUFDO1FBRUYsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O2dCQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7YUFDN0Q7WUFDRCxJQUFJLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxH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bnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOZ3hVaUxvYWRlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL25neC11aS1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX0hUVFBfQ09ORklHX1RPS0VOIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLWh0dHAtY29uZmlnLnRva2VuJztcbmltcG9ydCB7IE5neFVpTG9hZGVySHR0cENvbmZpZyB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1odHRwLWNvbmZpZyc7XG5pbXBvcnQgeyBIVFRQX0xPQURFUl9JRCB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1odHRwLmNvbnN0YW50cyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlckh0dHBJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgcHJpdmF0ZSBjb3VudDogbnVtYmVyO1xuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IE5neFVpTG9hZGVySHR0cENvbmZpZztcbiAgcHJpdmF0ZSBleGNsdWRlOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBleGNsdWRlUmVnZXhwOiBSZWdFeHBbXTtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcGFyYW0gbmd4VWlMb2FkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE5HWF9VSV9MT0FERVJfSFRUUF9DT05GSUdfVE9LRU4pIGNvbmZpZzogTmd4VWlMb2FkZXJIdHRwQ29uZmlnLFxuICAgIHByaXZhdGUgbmd4VWlMb2FkZXJTZXJ2aWNlOiBOZ3hVaUxvYWRlclNlcnZpY2UpIHtcblxuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgIGxvYWRlcklkOiB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCkubWFzdGVyTG9hZGVySWQsXG4gICAgICBzaG93Rm9yZWdyb3VuZDogZmFsc2VcbiAgICB9O1xuXG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgaWYgKGNvbmZpZy5leGNsdWRlKSB7XG4gICAgICAgIHRoaXMuZXhjbHVkZSA9IGNvbmZpZy5leGNsdWRlLm1hcCh1cmwgPT4gdXJsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5leGNsdWRlUmVnZXhwKSB7XG4gICAgICAgIHRoaXMuZXhjbHVkZVJlZ2V4cCA9IGNvbmZpZy5leGNsdWRlUmVnZXhwLm1hcChyZWdleHAgPT4gbmV3IFJlZ0V4cChyZWdleHAsICdpJykpO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnID0geyAuLi50aGlzLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZyB9O1xuICAgIH1cbiAgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmICh0aGlzLmlzSWdub3JlZChyZXEudXJsKSkge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGlmICh0aGlzLmRlZmF1bHRDb25maWcuc2hvd0ZvcmVncm91bmQpIHtcbiAgICAgIGlmICghdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2UuaGFzRm9yZWdyb3VuZCh0aGlzLmRlZmF1bHRDb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX0lEKSkge1xuICAgICAgICB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5zdGFydExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX0lEKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLm5neFVpTG9hZGVyU2VydmljZS5oYXNCYWNrZ3JvdW5kKHRoaXMuZGVmYXVsdENvbmZpZy5sb2FkZXJJZCwgSFRUUF9MT0FERVJfSUQpKSB7XG4gICAgICAgIHRoaXMubmd4VWlMb2FkZXJTZXJ2aWNlLnN0YXJ0QmFja2dyb3VuZExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX0lEKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5waXBlKGZpbmFsaXplKCgpID0+IHtcbiAgICAgIHRoaXMuY291bnQtLTtcbiAgICAgIGlmICh0aGlzLmNvdW50ID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRDb25maWcuc2hvd0ZvcmVncm91bmQpIHtcbiAgICAgICAgICB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5zdG9wTG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5sb2FkZXJJZCwgSFRUUF9MT0FERVJfSUQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubmd4VWlMb2FkZXJTZXJ2aWNlLnN0b3BCYWNrZ3JvdW5kTG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5sb2FkZXJJZCwgSFRUUF9MT0FERVJfSUQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0lnbm9yZWQodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5leGNsdWRlKSB7XG4gICAgICAvLyBkbyBub3Qgc2hvdyB0aGUgbG9hZGVyIGZvciBhcGkgdXJscyBpbiB0aGUgYGV4Y2x1ZGVgIGxpc3RcbiAgICAgIGlmICh0aGlzLmV4Y2x1ZGUuZmluZEluZGV4KHN0ciA9PiB1cmwudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHN0cikpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5leGNsdWRlUmVnZXhwKSB7XG4gICAgICAvLyBkbyBub3Qgc2hvdyB0aGUgbG9hZGVyIGZvciBhcGkgdXJscyB3aGljaCBtYXRjaGVzIHJlZ2V4cHMgaW4gdGhlIGBleGNsdWRlUmVnZXhwYCBsaXN0XG4gICAgICBpZiAodGhpcy5leGNsdWRlUmVnZXhwLmZpbmRJbmRleChyZWdleHAgPT4gcmVnZXhwLnRlc3QodXJsKSkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19