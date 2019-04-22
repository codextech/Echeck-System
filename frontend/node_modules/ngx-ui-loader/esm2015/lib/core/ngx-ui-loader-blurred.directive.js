/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { coerceNumber } from './coercion';
import { WAITING_FOR_OVERLAY_DISAPPEAR } from './ngx-ui-loader.contants';
export class NgxUiLoaderBlurredDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} ngxUiLoaderService
     */
    constructor(elementRef, renderer, ngxUiLoaderService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.ngxUiLoaderService = ngxUiLoaderService;
        this.blurNumber = this.ngxUiLoaderService.getDefaultConfig().blur;
        this.loaderId = this.ngxUiLoaderService.getDefaultConfig().masterLoaderId;
    }
    /**
     * @return {?}
     */
    get blur() {
        return this.blurNumber;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set blur(value) {
        this.blurNumber = coerceNumber(value, this.ngxUiLoaderService.getDefaultConfig().blur);
    }
    /**
     * On Init event
     * @return {?}
     */
    ngOnInit() {
        this.showForegroundWatcher = this.ngxUiLoaderService.showForeground$
            .pipe(filter((/**
         * @param {?} showEvent
         * @return {?}
         */
        (showEvent) => this.loaderId === showEvent.loaderId)))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data.isShow) {
                /** @type {?} */
                const filterValue = `blur(${this.blurNumber}px)`;
                this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', filterValue);
                this.renderer.setStyle(this.elementRef.nativeElement, 'filter', filterValue);
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (!this.ngxUiLoaderService.hasForeground(data.loaderId)) {
                        this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', 'none');
                        this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'none');
                    }
                }), WAITING_FOR_OVERLAY_DISAPPEAR);
            }
        }));
    }
    /**
     * On destroy event
     * @return {?}
     */
    ngOnDestroy() {
        if (this.showForegroundWatcher) {
            this.showForegroundWatcher.unsubscribe();
        }
    }
}
NgxUiLoaderBlurredDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxUiLoaderBlurred]' },] }
];
/** @nocollapse */
NgxUiLoaderBlurredDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgxUiLoaderService }
];
NgxUiLoaderBlurredDirective.propDecorators = {
    blur: [{ type: Input }],
    loaderId: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.blurNumber;
    /** @type {?} */
    NgxUiLoaderBlurredDirective.prototype.loaderId;
    /** @type {?} */
    NgxUiLoaderBlurredDirective.prototype.showForegroundWatcher;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.ngxUiLoaderService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1ibHVycmVkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11aS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvY29yZS9uZ3gtdWktbG9hZGVyLWJsdXJyZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3pFLE1BQU0sT0FBTywyQkFBMkI7Ozs7OztJQWlCdEMsWUFDVSxVQUFzQixFQUN0QixRQUFtQixFQUNuQixrQkFBc0M7UUFGdEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFFOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDbEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxjQUFjLENBQUM7SUFDNUUsQ0FBQzs7OztJQXBCRCxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RixDQUFDOzs7OztJQWtCRCxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlO2FBQ2pFLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUMsQ0FBQzthQUM1RSxTQUFTOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztzQkFDVCxXQUFXLEdBQUcsUUFBUSxJQUFJLENBQUMsVUFBVSxLQUFLO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQzlFO2lCQUFNO2dCQUNMLFVBQVU7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUN6RTtnQkFDSCxDQUFDLEdBQUUsNkJBQTZCLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFLRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDO0lBQ0gsQ0FBQzs7O1lBeERGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OztZQVQzQixVQUFVO1lBQW9CLFNBQVM7WUFJbEQsa0JBQWtCOzs7bUJBVXhCLEtBQUs7dUJBU0wsS0FBSzs7Ozs7OztJQVhOLGlEQUEyQjs7SUFXM0IsK0NBQTBCOztJQUUxQiw0REFBb0M7Ozs7O0lBR2xDLGlEQUE4Qjs7Ozs7SUFDOUIsK0NBQTJCOzs7OztJQUMzQix5REFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmd4VWlMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyIH0gZnJvbSAnLi9jb2VyY2lvbic7XG5pbXBvcnQgeyBTaG93RXZlbnQgfSBmcm9tICcuL25neC11aS1sb2FkZXIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBXQUlUSU5HX0ZPUl9PVkVSTEFZX0RJU0FQUEVBUiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci5jb250YW50cyc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3hVaUxvYWRlckJsdXJyZWRdJyB9KVxuZXhwb3J0IGNsYXNzIE5neFVpTG9hZGVyQmx1cnJlZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGJsdXJOdW1iZXI6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBnZXQgYmx1cigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJsdXJOdW1iZXI7XG4gIH1cblxuICBzZXQgYmx1cih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5ibHVyTnVtYmVyID0gY29lcmNlTnVtYmVyKHZhbHVlLCB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCkuYmx1cik7XG4gIH1cblxuICBASW5wdXQoKSBsb2FkZXJJZDogc3RyaW5nO1xuXG4gIHNob3dGb3JlZ3JvdW5kV2F0Y2hlcjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBuZ3hVaUxvYWRlclNlcnZpY2U6IE5neFVpTG9hZGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmJsdXJOdW1iZXIgPSB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCkuYmx1cjtcbiAgICB0aGlzLmxvYWRlcklkID0gdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpLm1hc3RlckxvYWRlcklkO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIEluaXQgZXZlbnRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2hvd0ZvcmVncm91bmRXYXRjaGVyID0gdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2Uuc2hvd0ZvcmVncm91bmQkXG4gICAgICAucGlwZShmaWx0ZXIoKHNob3dFdmVudDogU2hvd0V2ZW50KSA9PiB0aGlzLmxvYWRlcklkID09PSBzaG93RXZlbnQubG9hZGVySWQpKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEuaXNTaG93KSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBgYmx1cigke3RoaXMuYmx1ck51bWJlcn1weClgO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICctd2Via2l0LWZpbHRlcicsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZmlsdGVyJywgZmlsdGVyVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5neFVpTG9hZGVyU2VydmljZS5oYXNGb3JlZ3JvdW5kKGRhdGEubG9hZGVySWQpKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICctd2Via2l0LWZpbHRlcicsICdub25lJyk7XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmaWx0ZXInLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIFdBSVRJTkdfRk9SX09WRVJMQVlfRElTQVBQRUFSKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT24gZGVzdHJveSBldmVudFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc2hvd0ZvcmVncm91bmRXYXRjaGVyKSB7XG4gICAgICB0aGlzLnNob3dGb3JlZ3JvdW5kV2F0Y2hlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19