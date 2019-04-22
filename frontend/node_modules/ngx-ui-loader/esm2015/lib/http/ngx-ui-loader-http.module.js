/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderHttpInterceptor } from './ngx-ui-loader-http.interceptor';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
export class NgxUiLoaderHttpModule {
    /**
     * Constructor
     * @param {?} parentModule optional
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('[ngx-ui-loader] - NgxUiLoaderHttpModule is already loaded. It should be imported in the root `AppModule` only!');
        }
    }
    /**
     * forRoot
     * @param {?} httpConfig Configuration
     * @return {?} A module with its provider dependencies
     */
    static forRoot(httpConfig) {
        return {
            ngModule: NgxUiLoaderHttpModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_HTTP_CONFIG_TOKEN,
                    useValue: httpConfig
                }
            ]
        };
    }
}
NgxUiLoaderHttpModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: NgxUiLoaderHttpInterceptor,
                        multi: true
                    }
                ],
            },] }
];
/** @nocollapse */
NgxUiLoaderHttpModule.ctorParameters = () => [
    { type: NgxUiLoaderHttpModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1odHRwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11aS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvaHR0cC9uZ3gtdWktbG9hZGVyLWh0dHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBV3BGLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBTWhDLFlBQW9DLFlBQW1DO1FBQ3JFLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0hBQWdILENBQUMsQ0FBQztTQUNuSTtJQUNILENBQUM7Ozs7OztJQU9ELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBaUM7UUFDOUMsT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSwrQkFBK0I7b0JBQ3hDLFFBQVEsRUFBRSxVQUFVO2lCQUNyQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXBDRixRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFFBQVEsRUFBRSwwQkFBMEI7d0JBQ3BDLEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2FBQ0Y7Ozs7WUFPbUQscUJBQXFCLHVCQUExRCxRQUFRLFlBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBOZ3hVaUxvYWRlckh0dHBJbnRlcmNlcHRvciB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1odHRwLmludGVyY2VwdG9yJztcbmltcG9ydCB7IE5neFVpTG9hZGVySHR0cENvbmZpZyB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1odHRwLWNvbmZpZyc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX0hUVFBfQ09ORklHX1RPS0VOIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLWh0dHAtY29uZmlnLnRva2VuJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VDbGFzczogTmd4VWlMb2FkZXJIdHRwSW50ZXJjZXB0b3IsXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VWlMb2FkZXJIdHRwTW9kdWxlIHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHBhcmVudE1vZHVsZSBvcHRpb25hbFxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBOZ3hVaUxvYWRlckh0dHBNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tuZ3gtdWktbG9hZGVyXSAtIE5neFVpTG9hZGVySHR0cE1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSXQgc2hvdWxkIGJlIGltcG9ydGVkIGluIHRoZSByb290IGBBcHBNb2R1bGVgIG9ubHkhJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGZvclJvb3RcbiAgICogQHBhcmFtIGh0dHBDb25maWcgQ29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyBBIG1vZHVsZSB3aXRoIGl0cyBwcm92aWRlciBkZXBlbmRlbmNpZXNcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGh0dHBDb25maWc6IE5neFVpTG9hZGVySHR0cENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4VWlMb2FkZXJIdHRwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfVUlfTE9BREVSX0hUVFBfQ09ORklHX1RPS0VOLFxuICAgICAgICAgIHVzZVZhbHVlOiBodHRwQ29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=