/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { coerceNumber } from './coercion';
import { WAITING_FOR_OVERLAY_DISAPPEAR } from './ngx-ui-loader.contants';
var NgxUiLoaderBlurredDirective = /** @class */ (function () {
    function NgxUiLoaderBlurredDirective(elementRef, renderer, ngxUiLoaderService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.ngxUiLoaderService = ngxUiLoaderService;
        this.blurNumber = this.ngxUiLoaderService.getDefaultConfig().blur;
        this.loaderId = this.ngxUiLoaderService.getDefaultConfig().masterLoaderId;
    }
    Object.defineProperty(NgxUiLoaderBlurredDirective.prototype, "blur", {
        get: /**
         * @return {?}
         */
        function () {
            return this.blurNumber;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.blurNumber = coerceNumber(value, this.ngxUiLoaderService.getDefaultConfig().blur);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * On Init event
     */
    /**
     * On Init event
     * @return {?}
     */
    NgxUiLoaderBlurredDirective.prototype.ngOnInit = /**
     * On Init event
     * @return {?}
     */
    function () {
        var _this = this;
        this.showForegroundWatcher = this.ngxUiLoaderService.showForeground$
            .pipe(filter((/**
         * @param {?} showEvent
         * @return {?}
         */
        function (showEvent) { return _this.loaderId === showEvent.loaderId; })))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data.isShow) {
                /** @type {?} */
                var filterValue = "blur(" + _this.blurNumber + "px)";
                _this.renderer.setStyle(_this.elementRef.nativeElement, '-webkit-filter', filterValue);
                _this.renderer.setStyle(_this.elementRef.nativeElement, 'filter', filterValue);
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (!_this.ngxUiLoaderService.hasForeground(data.loaderId)) {
                        _this.renderer.setStyle(_this.elementRef.nativeElement, '-webkit-filter', 'none');
                        _this.renderer.setStyle(_this.elementRef.nativeElement, 'filter', 'none');
                    }
                }), WAITING_FOR_OVERLAY_DISAPPEAR);
            }
        }));
    };
    /**
     * On destroy event
     */
    /**
     * On destroy event
     * @return {?}
     */
    NgxUiLoaderBlurredDirective.prototype.ngOnDestroy = /**
     * On destroy event
     * @return {?}
     */
    function () {
        if (this.showForegroundWatcher) {
            this.showForegroundWatcher.unsubscribe();
        }
    };
    NgxUiLoaderBlurredDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngxUiLoaderBlurred]' },] }
    ];
    /** @nocollapse */
    NgxUiLoaderBlurredDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgxUiLoaderService }
    ]; };
    NgxUiLoaderBlurredDirective.propDecorators = {
        blur: [{ type: Input }],
        loaderId: [{ type: Input }]
    };
    return NgxUiLoaderBlurredDirective;
}());
export { NgxUiLoaderBlurredDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1ibHVycmVkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11aS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvY29yZS9uZ3gtdWktbG9hZGVyLWJsdXJyZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXpFO0lBa0JFLHFDQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGtCQUFzQztRQUZ0QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUU5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQztRQUNsRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUM1RSxDQUFDO0lBcEJELHNCQUNJLDZDQUFJOzs7O1FBRFI7WUFFRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFFRCxVQUFTLEtBQWE7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pGLENBQUM7OztPQUpBO0lBbUJEOztPQUVHOzs7OztJQUNILDhDQUFROzs7O0lBQVI7UUFBQSxpQkFpQkM7UUFoQkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlO2FBQ2pFLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxTQUFvQixJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxFQUFwQyxDQUFvQyxFQUFDLENBQUM7YUFDNUUsU0FBUzs7OztRQUFDLFVBQUEsSUFBSTtZQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTs7b0JBQ1QsV0FBVyxHQUFHLFVBQVEsS0FBSSxDQUFDLFVBQVUsUUFBSztnQkFDaEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3JGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUM5RTtpQkFBTTtnQkFDTCxVQUFVOzs7Z0JBQUM7b0JBQ1QsSUFBSSxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUN6RCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDaEYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUN6RTtnQkFDSCxDQUFDLEdBQUUsNkJBQTZCLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGlEQUFXOzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7SUFDSCxDQUFDOztnQkF4REYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs7O2dCQVQzQixVQUFVO2dCQUFvQixTQUFTO2dCQUlsRCxrQkFBa0I7Ozt1QkFVeEIsS0FBSzsyQkFTTCxLQUFLOztJQTJDUixrQ0FBQztDQUFBLEFBekRELElBeURDO1NBeERZLDJCQUEyQjs7Ozs7O0lBRXRDLGlEQUEyQjs7SUFXM0IsK0NBQTBCOztJQUUxQiw0REFBb0M7Ozs7O0lBR2xDLGlEQUE4Qjs7Ozs7SUFDOUIsK0NBQTJCOzs7OztJQUMzQix5REFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmd4VWlMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyIH0gZnJvbSAnLi9jb2VyY2lvbic7XG5pbXBvcnQgeyBTaG93RXZlbnQgfSBmcm9tICcuL25neC11aS1sb2FkZXIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBXQUlUSU5HX0ZPUl9PVkVSTEFZX0RJU0FQUEVBUiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci5jb250YW50cyc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3hVaUxvYWRlckJsdXJyZWRdJyB9KVxuZXhwb3J0IGNsYXNzIE5neFVpTG9hZGVyQmx1cnJlZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGJsdXJOdW1iZXI6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBnZXQgYmx1cigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJsdXJOdW1iZXI7XG4gIH1cblxuICBzZXQgYmx1cih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5ibHVyTnVtYmVyID0gY29lcmNlTnVtYmVyKHZhbHVlLCB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCkuYmx1cik7XG4gIH1cblxuICBASW5wdXQoKSBsb2FkZXJJZDogc3RyaW5nO1xuXG4gIHNob3dGb3JlZ3JvdW5kV2F0Y2hlcjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBuZ3hVaUxvYWRlclNlcnZpY2U6IE5neFVpTG9hZGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmJsdXJOdW1iZXIgPSB0aGlzLm5neFVpTG9hZGVyU2VydmljZS5nZXREZWZhdWx0Q29uZmlnKCkuYmx1cjtcbiAgICB0aGlzLmxvYWRlcklkID0gdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpLm1hc3RlckxvYWRlcklkO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIEluaXQgZXZlbnRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2hvd0ZvcmVncm91bmRXYXRjaGVyID0gdGhpcy5uZ3hVaUxvYWRlclNlcnZpY2Uuc2hvd0ZvcmVncm91bmQkXG4gICAgICAucGlwZShmaWx0ZXIoKHNob3dFdmVudDogU2hvd0V2ZW50KSA9PiB0aGlzLmxvYWRlcklkID09PSBzaG93RXZlbnQubG9hZGVySWQpKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEuaXNTaG93KSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBgYmx1cigke3RoaXMuYmx1ck51bWJlcn1weClgO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICctd2Via2l0LWZpbHRlcicsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZmlsdGVyJywgZmlsdGVyVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5neFVpTG9hZGVyU2VydmljZS5oYXNGb3JlZ3JvdW5kKGRhdGEubG9hZGVySWQpKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICctd2Via2l0LWZpbHRlcicsICdub25lJyk7XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmaWx0ZXInLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIFdBSVRJTkdfRk9SX09WRVJMQVlfRElTQVBQRUFSKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT24gZGVzdHJveSBldmVudFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc2hvd0ZvcmVncm91bmRXYXRjaGVyKSB7XG4gICAgICB0aGlzLnNob3dGb3JlZ3JvdW5kV2F0Y2hlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19