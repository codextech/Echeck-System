import { ModuleWithProviders } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderRouterConfig } from './ngx-ui-loader-router-config';
export declare class NgxUiLoaderRouterModule {
    /**
     * forRoot
     * @param routerConfig Configuration
     * @returns A module with its provider dependencies
     */
    static forRoot(routerConfig: NgxUiLoaderRouterConfig): ModuleWithProviders;
    /**
     * Constructor
     *
     * @param parentModule
     * @param config
     * @param router
     * @param ngxUiLoaderService
     */
    constructor(parentModule: NgxUiLoaderRouterModule, config: NgxUiLoaderRouterConfig, router: Router, ngxUiLoaderService: NgxUiLoaderService);
}
