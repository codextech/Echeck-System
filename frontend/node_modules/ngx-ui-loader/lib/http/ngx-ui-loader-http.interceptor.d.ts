import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderHttpConfig } from './ngx-ui-loader-http-config';
export declare class NgxUiLoaderHttpInterceptor implements HttpInterceptor {
    private ngxUiLoaderService;
    private count;
    private defaultConfig;
    private exclude;
    private excludeRegexp;
    /**
     * Constructor
     * @param config
     * @param ngxUiLoaderService
     */
    constructor(config: NgxUiLoaderHttpConfig, ngxUiLoaderService: NgxUiLoaderService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private isIgnored;
}
