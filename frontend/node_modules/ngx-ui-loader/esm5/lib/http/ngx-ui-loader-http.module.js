/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderHttpInterceptor } from './ngx-ui-loader-http.interceptor';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
var NgxUiLoaderHttpModule = /** @class */ (function () {
    /**
     * Constructor
     * @param parentModule optional
     */
    function NgxUiLoaderHttpModule(parentModule) {
        if (parentModule) {
            throw new Error('[ngx-ui-loader] - NgxUiLoaderHttpModule is already loaded. It should be imported in the root `AppModule` only!');
        }
    }
    /**
     * forRoot
     * @param httpConfig Configuration
     * @returns A module with its provider dependencies
     */
    /**
     * forRoot
     * @param {?} httpConfig Configuration
     * @return {?} A module with its provider dependencies
     */
    NgxUiLoaderHttpModule.forRoot = /**
     * forRoot
     * @param {?} httpConfig Configuration
     * @return {?} A module with its provider dependencies
     */
    function (httpConfig) {
        return {
            ngModule: NgxUiLoaderHttpModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_HTTP_CONFIG_TOKEN,
                    useValue: httpConfig
                }
            ]
        };
    };
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
    NgxUiLoaderHttpModule.ctorParameters = function () { return [
        { type: NgxUiLoaderHttpModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return NgxUiLoaderHttpModule;
}());
export { NgxUiLoaderHttpModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1odHRwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11aS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvaHR0cC9uZ3gtdWktbG9hZGVyLWh0dHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBGO0lBV0U7OztPQUdHO0lBQ0gsK0JBQW9DLFlBQW1DO1FBQ3JFLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0hBQWdILENBQUMsQ0FBQztTQUNuSTtJQUNILENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7SUFDSSw2QkFBTzs7Ozs7SUFBZCxVQUFlLFVBQWlDO1FBQzlDLE9BQU87WUFDTCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsK0JBQStCO29CQUN4QyxRQUFRLEVBQUUsVUFBVTtpQkFDckI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztnQkFwQ0YsUUFBUSxTQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixRQUFRLEVBQUUsMEJBQTBCOzRCQUNwQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRjs7OztnQkFPbUQscUJBQXFCLHVCQUExRCxRQUFRLFlBQUksUUFBUTs7SUFzQm5DLDRCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0E1QlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE5neFVpTG9hZGVySHR0cEludGVyY2VwdG9yIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLWh0dHAuaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgTmd4VWlMb2FkZXJIdHRwQ29uZmlnIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLWh0dHAtY29uZmlnJztcbmltcG9ydCB7IE5HWF9VSV9MT0FERVJfSFRUUF9DT05GSUdfVE9LRU4gfSBmcm9tICcuL25neC11aS1sb2FkZXItaHR0cC1jb25maWcudG9rZW4nO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICAgIHVzZUNsYXNzOiBOZ3hVaUxvYWRlckh0dHBJbnRlcmNlcHRvcixcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlckh0dHBNb2R1bGUge1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gcGFyZW50TW9kdWxlIG9wdGlvbmFsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IE5neFVpTG9hZGVySHR0cE1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW25neC11aS1sb2FkZXJdIC0gTmd4VWlMb2FkZXJIdHRwTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJdCBzaG91bGQgYmUgaW1wb3J0ZWQgaW4gdGhlIHJvb3QgYEFwcE1vZHVsZWAgb25seSEnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZm9yUm9vdFxuICAgKiBAcGFyYW0gaHR0cENvbmZpZyBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIEEgbW9kdWxlIHdpdGggaXRzIHByb3ZpZGVyIGRlcGVuZGVuY2llc1xuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoaHR0cENvbmZpZzogTmd4VWlMb2FkZXJIdHRwQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hVaUxvYWRlckh0dHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5HWF9VSV9MT0FERVJfSFRUUF9DT05GSUdfVE9LRU4sXG4gICAgICAgICAgdXNlVmFsdWU6IGh0dHBDb25maWdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==