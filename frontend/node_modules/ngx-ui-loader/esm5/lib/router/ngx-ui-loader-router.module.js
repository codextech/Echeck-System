/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_ID } from './ngx-ui-loader-router.constants';
var NgxUiLoaderRouterModule = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param parentModule
     * @param config
     * @param router
     * @param ngxUiLoaderService
     */
    function NgxUiLoaderRouterModule(parentModule, config, router, ngxUiLoaderService) {
        if (parentModule) {
            throw new Error('[ngx-ui-loader] - NgxUiLoaderRouterModule is already loaded. It should be imported in the root `AppModule` only!');
        }
        /** @type {?} */
        var defaultConfig = {
            loaderId: ngxUiLoaderService.getDefaultConfig().masterLoaderId,
            showForeground: true
        };
        if (config) {
            defaultConfig = tslib_1.__assign({}, defaultConfig, config);
        }
        router.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event instanceof NavigationStart) {
                if (defaultConfig.showForeground) {
                    ngxUiLoaderService.startLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
                }
                else {
                    ngxUiLoaderService.startBackgroundLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
                }
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                if (defaultConfig.showForeground) {
                    ngxUiLoaderService.stopLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
                }
                else {
                    ngxUiLoaderService.stopBackgroundLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
                }
            }
        }));
    }
    /**
     * forRoot
     * @param routerConfig Configuration
     * @returns A module with its provider dependencies
     */
    /**
     * forRoot
     * @param {?} routerConfig Configuration
     * @return {?} A module with its provider dependencies
     */
    NgxUiLoaderRouterModule.forRoot = /**
     * forRoot
     * @param {?} routerConfig Configuration
     * @return {?} A module with its provider dependencies
     */
    function (routerConfig) {
        return {
            ngModule: NgxUiLoaderRouterModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,
                    useValue: routerConfig
                }
            ]
        };
    };
    NgxUiLoaderRouterModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    /** @nocollapse */
    NgxUiLoaderRouterModule.ctorParameters = function () { return [
        { type: NgxUiLoaderRouterModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,] }] },
        { type: Router },
        { type: NgxUiLoaderService }
    ]; };
    return NgxUiLoaderRouterModule;
}());
export { NgxUiLoaderRouterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXIvbmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXBFO0lBb0JFOzs7Ozs7O09BT0c7SUFDSCxpQ0FDMEIsWUFBcUMsRUFDTixNQUErQixFQUN0RixNQUFjLEVBQ2Qsa0JBQXNDO1FBRXRDLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0hBQWtILENBQUMsQ0FBQztTQUNySTs7WUFFRyxhQUFhLEdBQTRCO1lBQzNDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGNBQWM7WUFDOUQsY0FBYyxFQUFFLElBQUk7U0FDckI7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLGFBQWEsd0JBQVEsYUFBYSxFQUFLLE1BQU0sQ0FBRSxDQUFDO1NBQ2pEO1FBRUQsTUFBTSxDQUFDLE1BQU07YUFDVixTQUFTOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ2QsSUFBSSxLQUFLLFlBQVksZUFBZSxFQUFFO2dCQUNwQyxJQUFJLGFBQWEsQ0FBQyxjQUFjLEVBQUU7b0JBQ2hDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQzFFO3FCQUFNO29CQUNMLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztpQkFDcEY7YUFDRjtZQUVELElBQUksS0FBSyxZQUFZLGFBQWEsSUFBSSxLQUFLLFlBQVksZ0JBQWdCLElBQUksS0FBSyxZQUFZLGVBQWUsRUFBRTtnQkFDM0csSUFBSSxhQUFhLENBQUMsY0FBYyxFQUFFO29CQUNoQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUN6RTtxQkFBTTtvQkFDTCxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ25GO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUE5REQ7Ozs7T0FJRzs7Ozs7O0lBQ0ksK0JBQU87Ozs7O0lBQWQsVUFBZSxZQUFxQztRQUNsRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlDQUFpQztvQkFDMUMsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBbEJGLFFBQVEsU0FBQyxFQUFFOzs7O2dCQTZCOEIsdUJBQXVCLHVCQUE1RCxRQUFRLFlBQUksUUFBUTtnREFDcEIsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQ0FBaUM7Z0JBckNtQixNQUFNO2dCQUV6RSxrQkFBa0I7O0lBdUUzQiw4QkFBQztDQUFBLEFBbEVELElBa0VDO1NBakVZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3QsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNhbmNlbCwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yLCBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IE5neFVpTG9hZGVyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbmd4LXVpLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5neFVpTG9hZGVyUm91dGVyQ29uZmlnIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLXJvdXRlci1jb25maWcnO1xuaW1wb3J0IHsgTkdYX1VJX0xPQURFUl9ST1VURVJfQ09ORklHX1RPS0VOIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLXJvdXRlci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgUk9VVEVSX0xPQURFUl9JRCB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1yb3V0ZXIuY29uc3RhbnRzJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIE5neFVpTG9hZGVyUm91dGVyTW9kdWxlIHtcblxuICAvKipcbiAgICogZm9yUm9vdFxuICAgKiBAcGFyYW0gcm91dGVyQ29uZmlnIENvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMgQSBtb2R1bGUgd2l0aCBpdHMgcHJvdmlkZXIgZGVwZW5kZW5jaWVzXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChyb3V0ZXJDb25maWc6IE5neFVpTG9hZGVyUm91dGVyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hVaUxvYWRlclJvdXRlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTkdYX1VJX0xPQURFUl9ST1VURVJfQ09ORklHX1RPS0VOLFxuICAgICAgICAgIHVzZVZhbHVlOiByb3V0ZXJDb25maWdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudE1vZHVsZVxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqIEBwYXJhbSByb3V0ZXJcbiAgICogQHBhcmFtIG5neFVpTG9hZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBOZ3hVaUxvYWRlclJvdXRlck1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5HWF9VSV9MT0FERVJfUk9VVEVSX0NPTkZJR19UT0tFTikgY29uZmlnOiBOZ3hVaUxvYWRlclJvdXRlckNvbmZpZyxcbiAgICByb3V0ZXI6IFJvdXRlcixcbiAgICBuZ3hVaUxvYWRlclNlcnZpY2U6IE5neFVpTG9hZGVyU2VydmljZSkge1xuXG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbbmd4LXVpLWxvYWRlcl0gLSBOZ3hVaUxvYWRlclJvdXRlck1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSXQgc2hvdWxkIGJlIGltcG9ydGVkIGluIHRoZSByb290IGBBcHBNb2R1bGVgIG9ubHkhJyk7XG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDb25maWc6IE5neFVpTG9hZGVyUm91dGVyQ29uZmlnID0ge1xuICAgICAgbG9hZGVySWQ6IG5neFVpTG9hZGVyU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCkubWFzdGVyTG9hZGVySWQsXG4gICAgICBzaG93Rm9yZWdyb3VuZDogdHJ1ZVxuICAgIH07XG5cbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBkZWZhdWx0Q29uZmlnID0geyAuLi5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWcgfTtcbiAgICB9XG5cbiAgICByb3V0ZXIuZXZlbnRzXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgICAgaWYgKGRlZmF1bHRDb25maWcuc2hvd0ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgIG5neFVpTG9hZGVyU2VydmljZS5zdGFydExvYWRlcihkZWZhdWx0Q29uZmlnLmxvYWRlcklkLCBST1VURVJfTE9BREVSX0lEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmd4VWlMb2FkZXJTZXJ2aWNlLnN0YXJ0QmFja2dyb3VuZExvYWRlcihkZWZhdWx0Q29uZmlnLmxvYWRlcklkLCBST1VURVJfTE9BREVSX0lEKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbCB8fCBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvcikge1xuICAgICAgICAgIGlmIChkZWZhdWx0Q29uZmlnLnNob3dGb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgICBuZ3hVaUxvYWRlclNlcnZpY2Uuc3RvcExvYWRlcihkZWZhdWx0Q29uZmlnLmxvYWRlcklkLCBST1VURVJfTE9BREVSX0lEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmd4VWlMb2FkZXJTZXJ2aWNlLnN0b3BCYWNrZ3JvdW5kTG9hZGVyKGRlZmF1bHRDb25maWcubG9hZGVySWQsIFJPVVRFUl9MT0FERVJfSUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==