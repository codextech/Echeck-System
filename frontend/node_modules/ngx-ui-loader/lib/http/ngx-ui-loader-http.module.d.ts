import { ModuleWithProviders } from '@angular/core';
import { NgxUiLoaderHttpConfig } from './ngx-ui-loader-http-config';
export declare class NgxUiLoaderHttpModule {
    /**
     * Constructor
     * @param parentModule optional
     */
    constructor(parentModule: NgxUiLoaderHttpModule);
    /**
     * forRoot
     * @param httpConfig Configuration
     * @returns A module with its provider dependencies
     */
    static forRoot(httpConfig: NgxUiLoaderHttpConfig): ModuleWithProviders;
}
