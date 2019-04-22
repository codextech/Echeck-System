/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderBlurredDirective } from './ngx-ui-loader-blurred.directive';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
var NgxUiLoaderModule = /** @class */ (function () {
    function NgxUiLoaderModule() {
    }
    /**
     * forRoot
     * @param ngxUiLoaderConfig
     * @returns A module with its provider dependencies
     */
    /**
     * forRoot
     * @param {?} ngxUiLoaderConfig
     * @return {?} A module with its provider dependencies
     */
    NgxUiLoaderModule.forRoot = /**
     * forRoot
     * @param {?} ngxUiLoaderConfig
     * @return {?} A module with its provider dependencies
     */
    function (ngxUiLoaderConfig) {
        return {
            ngModule: NgxUiLoaderModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_CONFIG_TOKEN,
                    useValue: ngxUiLoaderConfig
                }
            ]
        };
    };
    NgxUiLoaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        NgxUiLoaderComponent,
                        NgxUiLoaderBlurredDirective,
                    ],
                    exports: [
                        NgxUiLoaderComponent,
                        NgxUiLoaderBlurredDirective,
                    ]
                },] }
    ];
    return NgxUiLoaderModule;
}());
export { NgxUiLoaderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdWktbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbmd4LXVpLWxvYWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUcxRTtJQUFBO0lBK0JBLENBQUM7SUFoQkM7Ozs7T0FJRzs7Ozs7O0lBQ0kseUJBQU87Ozs7O0lBQWQsVUFBZSxpQkFBb0M7UUFDakQsT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSwwQkFBMEI7b0JBQ25DLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBOUJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osb0JBQW9CO3dCQUNwQiwyQkFBMkI7cUJBQzVCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLDJCQUEyQjtxQkFDNUI7aUJBQ0Y7O0lBbUJELHdCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0FsQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE5neFVpTG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hVaUxvYWRlckJsdXJyZWREaXJlY3RpdmUgfSBmcm9tICcuL25neC11aS1sb2FkZXItYmx1cnJlZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTkdYX1VJX0xPQURFUl9DT05GSUdfVE9LRU4gfSBmcm9tICcuL25neC11aS1sb2FkZXItY29uZmlnLnRva2VuJztcbmltcG9ydCB7IE5neFVpTG9hZGVyQ29uZmlnIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFVpTG9hZGVyQ29tcG9uZW50LFxuICAgIE5neFVpTG9hZGVyQmx1cnJlZERpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5neFVpTG9hZGVyQ29tcG9uZW50LFxuICAgIE5neFVpTG9hZGVyQmx1cnJlZERpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlck1vZHVsZSB7XG5cbiAgLyoqXG4gICAqIGZvclJvb3RcbiAgICogQHBhcmFtIG5neFVpTG9hZGVyQ29uZmlnXG4gICAqIEByZXR1cm5zIEEgbW9kdWxlIHdpdGggaXRzIHByb3ZpZGVyIGRlcGVuZGVuY2llc1xuICAgKi9cbiAgc3RhdGljIGZvclJvb3Qobmd4VWlMb2FkZXJDb25maWc6IE5neFVpTG9hZGVyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hVaUxvYWRlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTkdYX1VJX0xPQURFUl9DT05GSUdfVE9LRU4sXG4gICAgICAgICAgdXNlVmFsdWU6IG5neFVpTG9hZGVyQ29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=