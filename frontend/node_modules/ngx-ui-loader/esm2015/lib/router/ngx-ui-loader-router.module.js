/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_ID } from './ngx-ui-loader-router.constants';
export class NgxUiLoaderRouterModule {
    /**
     * Constructor
     *
     * @param {?} parentModule
     * @param {?} config
     * @param {?} router
     * @param {?} ngxUiLoaderService
     */
    constructor(parentModule, config, router, ngxUiLoaderService) {
        if (parentModule) {
            throw new Error('[ngx-ui-loader] - NgxUiLoaderRouterModule is already loaded. It should be imported in the root `AppModule` only!');
        }
        /** @type {?} */
        let defaultConfig = {
            loaderId: ngxUiLoaderService.getDefaultConfig().masterLoaderId,
            showForeground: true
        };
        if (config) {
            defaultConfig = Object.assign({}, defaultConfig, config);
        }
        router.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
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
     * @param {?} routerConfig Configuration
     * @return {?} A module with its provider dependencies
     */
    static forRoot(routerConfig) {
        return {
            ngModule: NgxUiLoaderRouterModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,
                    useValue: routerConfig
                }
            ]
        };
    }
}
NgxUiLoaderRouterModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
NgxUiLoaderRouterModule.ctorParameters = () => [
    { type: NgxUiLoaderRouterModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,] }] },
    { type: Router },
    { type: NgxUiLoaderService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXIvbmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFNUcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHcEUsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7Ozs7O0lBMkJsQyxZQUMwQixZQUFxQyxFQUNOLE1BQStCLEVBQ3RGLE1BQWMsRUFDZCxrQkFBc0M7UUFFdEMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrSEFBa0gsQ0FBQyxDQUFDO1NBQ3JJOztZQUVHLGFBQWEsR0FBNEI7WUFDM0MsUUFBUSxFQUFFLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUMsY0FBYztZQUM5RCxjQUFjLEVBQUUsSUFBSTtTQUNyQjtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1YsYUFBYSxxQkFBUSxhQUFhLEVBQUssTUFBTSxDQUFFLENBQUM7U0FDakQ7UUFFRCxNQUFNLENBQUMsTUFBTTthQUNWLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLEtBQUssWUFBWSxlQUFlLEVBQUU7Z0JBQ3BDLElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRTtvQkFDaEMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztpQkFDMUU7cUJBQU07b0JBQ0wsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUNwRjthQUNGO1lBRUQsSUFBSSxLQUFLLFlBQVksYUFBYSxJQUFJLEtBQUssWUFBWSxnQkFBZ0IsSUFBSSxLQUFLLFlBQVksZUFBZSxFQUFFO2dCQUMzRyxJQUFJLGFBQWEsQ0FBQyxjQUFjLEVBQUU7b0JBQ2hDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3pFO3FCQUFNO29CQUNMLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztpQkFDbkY7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBekRELE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBcUM7UUFDbEQsT0FBTztZQUNMLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxpQ0FBaUM7b0JBQzFDLFFBQVEsRUFBRSxZQUFZO2lCQUN2QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWxCRixRQUFRLFNBQUMsRUFBRTs7OztZQTZCOEIsdUJBQXVCLHVCQUE1RCxRQUFRLFlBQUksUUFBUTs0Q0FDcEIsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQ0FBaUM7WUFyQ21CLE1BQU07WUFFekUsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdCwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ2FuY2VsLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IsIE5hdmlnYXRpb25TdGFydCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgTmd4VWlMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9uZ3gtdWktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmd4VWlMb2FkZXJSb3V0ZXJDb25maWcgfSBmcm9tICcuL25neC11aS1sb2FkZXItcm91dGVyLWNvbmZpZyc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX1JPVVRFUl9DT05GSUdfVE9LRU4gfSBmcm9tICcuL25neC11aS1sb2FkZXItcm91dGVyLWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBST1VURVJfTE9BREVSX0lEIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLXJvdXRlci5jb25zdGFudHMnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgTmd4VWlMb2FkZXJSb3V0ZXJNb2R1bGUge1xuXG4gIC8qKlxuICAgKiBmb3JSb290XG4gICAqIEBwYXJhbSByb3V0ZXJDb25maWcgQ29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyBBIG1vZHVsZSB3aXRoIGl0cyBwcm92aWRlciBkZXBlbmRlbmNpZXNcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KHJvdXRlckNvbmZpZzogTmd4VWlMb2FkZXJSb3V0ZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neFVpTG9hZGVyUm91dGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfVUlfTE9BREVSX1JPVVRFUl9DT05GSUdfVE9LRU4sXG4gICAgICAgICAgdXNlVmFsdWU6IHJvdXRlckNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50TW9kdWxlXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHBhcmFtIHJvdXRlclxuICAgKiBAcGFyYW0gbmd4VWlMb2FkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IE5neFVpTG9hZGVyUm91dGVyTW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdYX1VJX0xPQURFUl9ST1VURVJfQ09ORklHX1RPS0VOKSBjb25maWc6IE5neFVpTG9hZGVyUm91dGVyQ29uZmlnLFxuICAgIHJvdXRlcjogUm91dGVyLFxuICAgIG5neFVpTG9hZGVyU2VydmljZTogTmd4VWlMb2FkZXJTZXJ2aWNlKSB7XG5cbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tuZ3gtdWktbG9hZGVyXSAtIE5neFVpTG9hZGVyUm91dGVyTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJdCBzaG91bGQgYmUgaW1wb3J0ZWQgaW4gdGhlIHJvb3QgYEFwcE1vZHVsZWAgb25seSEnKTtcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENvbmZpZzogTmd4VWlMb2FkZXJSb3V0ZXJDb25maWcgPSB7XG4gICAgICBsb2FkZXJJZDogbmd4VWlMb2FkZXJTZXJ2aWNlLmdldERlZmF1bHRDb25maWcoKS5tYXN0ZXJMb2FkZXJJZCxcbiAgICAgIHNob3dGb3JlZ3JvdW5kOiB0cnVlXG4gICAgfTtcblxuICAgIGlmIChjb25maWcpIHtcbiAgICAgIGRlZmF1bHRDb25maWcgPSB7IC4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZyB9O1xuICAgIH1cblxuICAgIHJvdXRlci5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgICBpZiAoZGVmYXVsdENvbmZpZy5zaG93Rm9yZWdyb3VuZCkge1xuICAgICAgICAgICAgbmd4VWlMb2FkZXJTZXJ2aWNlLnN0YXJ0TG9hZGVyKGRlZmF1bHRDb25maWcubG9hZGVySWQsIFJPVVRFUl9MT0FERVJfSUQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZ3hVaUxvYWRlclNlcnZpY2Uuc3RhcnRCYWNrZ3JvdW5kTG9hZGVyKGRlZmF1bHRDb25maWcubG9hZGVySWQsIFJPVVRFUl9MT0FERVJfSUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgICAgaWYgKGRlZmF1bHRDb25maWcuc2hvd0ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgIG5neFVpTG9hZGVyU2VydmljZS5zdG9wTG9hZGVyKGRlZmF1bHRDb25maWcubG9hZGVySWQsIFJPVVRFUl9MT0FERVJfSUQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZ3hVaUxvYWRlclNlcnZpY2Uuc3RvcEJhY2tncm91bmRMb2FkZXIoZGVmYXVsdENvbmZpZy5sb2FkZXJJZCwgUk9VVEVSX0xPQURFUl9JRCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19