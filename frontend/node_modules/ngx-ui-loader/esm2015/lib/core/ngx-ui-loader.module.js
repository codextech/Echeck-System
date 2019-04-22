/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderBlurredDirective } from './ngx-ui-loader-blurred.directive';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
export class NgxUiLoaderModule {
    /**
     * forRoot
     * @param {?} ngxUiLoaderConfig
     * @return {?} A module with its provider dependencies
     */
    static forRoot(ngxUiLoaderConfig) {
        return {
            ngModule: NgxUiLoaderModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_CONFIG_TOKEN,
                    useValue: ngxUiLoaderConfig
                }
            ]
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdWktbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbmd4LXVpLWxvYWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWdCMUUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBTzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQW9DO1FBQ2pELE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsMEJBQTBCO29CQUNuQyxRQUFRLEVBQUUsaUJBQWlCO2lCQUM1QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTlCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG9CQUFvQjtvQkFDcEIsMkJBQTJCO2lCQUM1QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asb0JBQW9CO29CQUNwQiwyQkFBMkI7aUJBQzVCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTmd4VWlMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL25neC11aS1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5neFVpTG9hZGVyQmx1cnJlZERpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1ibHVycmVkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX0NPTkZJR19UT0tFTiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgTmd4VWlMb2FkZXJDb25maWcgfSBmcm9tICcuL25neC11aS1sb2FkZXItY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VWlMb2FkZXJDb21wb25lbnQsXG4gICAgTmd4VWlMb2FkZXJCbHVycmVkRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmd4VWlMb2FkZXJDb21wb25lbnQsXG4gICAgTmd4VWlMb2FkZXJCbHVycmVkRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFVpTG9hZGVyTW9kdWxlIHtcblxuICAvKipcbiAgICogZm9yUm9vdFxuICAgKiBAcGFyYW0gbmd4VWlMb2FkZXJDb25maWdcbiAgICogQHJldHVybnMgQSBtb2R1bGUgd2l0aCBpdHMgcHJvdmlkZXIgZGVwZW5kZW5jaWVzXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChuZ3hVaUxvYWRlckNvbmZpZzogTmd4VWlMb2FkZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neFVpTG9hZGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfVUlfTE9BREVSX0NPTkZJR19UT0tFTixcbiAgICAgICAgICB1c2VWYWx1ZTogbmd4VWlMb2FkZXJDb25maWdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==