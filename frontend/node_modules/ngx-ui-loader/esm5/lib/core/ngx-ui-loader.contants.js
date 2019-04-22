/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { POSITION, PB_DIRECTION, SPINNER } from './ngx-ui-loader.enums';
/**
 * The default value of task id
 * @type {?}
 */
export var DEFAULT_TASK_ID = 'default';
/**
 * The default value of loader id
 * @type {?}
 */
export var DEFAULT_MASTER_LOADER_ID = 'master';
/** @type {?} */
export var CLOSING_TIME = 1001;
/** @type {?} */
export var WAITING_FOR_OVERLAY_DISAPPEAR = 500;
/**
 * The configuration of spinners
 * @type {?}
 */
export var SPINNER_CONFIG = {
    'ball-scale-multiple': {
        divs: 3,
        class: 'sk-ball-scale-multiple'
    },
    'ball-spin': {
        divs: 8,
        class: 'sk-ball-spin'
    },
    'ball-spin-clockwise': {
        divs: 8,
        class: 'sk-ball-spin-clockwise'
    },
    'ball-spin-clockwise-fade-rotating': {
        divs: 8,
        class: 'sk-ball-spin-clockwise-fade-rotating'
    },
    'ball-spin-fade-rotating': {
        divs: 8,
        class: 'sk-ball-spin-fade-rotating'
    },
    'chasing-dots': {
        divs: 2,
        class: 'sk-chasing-dots'
    },
    'circle': {
        divs: 12,
        class: 'sk-circle'
    },
    'cube-grid': {
        divs: 9,
        class: 'sk-cube-grid'
    },
    'double-bounce': {
        divs: 2,
        class: 'sk-double-bounce'
    },
    'fading-circle': {
        divs: 12,
        class: 'sk-fading-circle'
    },
    'folding-cube': {
        divs: 4,
        class: 'sk-folding-cube'
    },
    'pulse': {
        divs: 1,
        class: 'sk-pulse'
    },
    'rectangle-bounce': {
        divs: 5,
        class: 'sk-rectangle-bounce'
    },
    'rectangle-bounce-party': {
        divs: 5,
        class: 'sk-rectangle-bounce-party'
    },
    'rectangle-bounce-pulse-out': {
        divs: 5,
        class: 'sk-rectangle-bounce-pulse-out'
    },
    'rectangle-bounce-pulse-out-rapid': {
        divs: 5,
        class: 'sk-rectangle-bounce-pulse-out-rapid'
    },
    'rotating-plane': {
        divs: 1,
        class: 'sk-rotating-plane'
    },
    'square-jelly-box': {
        divs: 2,
        class: 'sk-square-jelly-box'
    },
    'square-loader': {
        divs: 1,
        class: 'sk-square-loader'
    },
    'three-bounce': {
        divs: 3,
        class: 'sk-three-bounce'
    },
    'three-strings': {
        divs: 3,
        class: 'sk-three-strings'
    },
    'wandering-cubes': {
        divs: 2,
        class: 'sk-wandering-cubes'
    },
};
/**
 * The default configuration of ngx-ui-loader
 * @type {?}
 */
export var DEFAULT_CONFIG = {
    bgsColor: '#00ACC1',
    bgsOpacity: 0.5,
    bgsPosition: POSITION.bottomRight,
    bgsSize: 60,
    bgsType: SPINNER.ballSpinClockwise,
    blur: 5,
    fgsColor: '#00ACC1',
    fgsPosition: POSITION.centerCenter,
    fgsSize: 60,
    fgsType: SPINNER.ballSpinClockwise,
    gap: 24,
    logoPosition: POSITION.centerCenter,
    logoSize: 120,
    logoUrl: '',
    masterLoaderId: DEFAULT_MASTER_LOADER_ID,
    overlayBorderRadius: '0',
    overlayColor: 'rgba(40, 40, 40, 0.8)',
    pbColor: '#00ACC1',
    pbDirection: PB_DIRECTION.leftToRight,
    pbThickness: 3,
    hasProgressBar: true,
    text: '',
    textColor: '#FFFFFF',
    textPosition: POSITION.centerCenter,
    threshold: 500
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci5jb250YW50cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11aS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvY29yZS9uZ3gtdWktbG9hZGVyLmNvbnRhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFLeEUsTUFBTSxLQUFPLGVBQWUsR0FBRyxTQUFTOzs7OztBQUt4QyxNQUFNLEtBQU8sd0JBQXdCLEdBQUcsUUFBUTs7QUFFaEQsTUFBTSxLQUFPLFlBQVksR0FBRyxJQUFJOztBQUVoQyxNQUFNLEtBQU8sNkJBQTZCLEdBQUcsR0FBRzs7Ozs7QUFLaEQsTUFBTSxLQUFPLGNBQWMsR0FBRztJQUM1QixxQkFBcUIsRUFBRTtRQUNyQixJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSx3QkFBd0I7S0FDaEM7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSxjQUFjO0tBQ3RCO0lBQ0QscUJBQXFCLEVBQUU7UUFDckIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsd0JBQXdCO0tBQ2hDO0lBQ0QsbUNBQW1DLEVBQUU7UUFDbkMsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsc0NBQXNDO0tBQzlDO0lBQ0QseUJBQXlCLEVBQUU7UUFDekIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsNEJBQTRCO0tBQ3BDO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsaUJBQWlCO0tBQ3pCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsV0FBVztLQUNuQjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxDQUFDO1FBQ1AsS0FBSyxFQUFFLGNBQWM7S0FDdEI7SUFDRCxlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSxrQkFBa0I7S0FDMUI7SUFDRCxlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsRUFBRTtRQUNSLEtBQUssRUFBRSxrQkFBa0I7S0FDMUI7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSxpQkFBaUI7S0FDekI7SUFDRCxPQUFPLEVBQUc7UUFDUixJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSxVQUFVO0tBQ2xCO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUscUJBQXFCO0tBQzdCO0lBQ0Qsd0JBQXdCLEVBQUU7UUFDeEIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsMkJBQTJCO0tBQ25DO0lBQ0QsNEJBQTRCLEVBQUU7UUFDNUIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsK0JBQStCO0tBQ3ZDO0lBQ0Qsa0NBQWtDLEVBQUU7UUFDbEMsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUscUNBQXFDO0tBQzdDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsbUJBQW1CO0tBQzNCO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUscUJBQXFCO0tBQzdCO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsa0JBQWtCO0tBQzFCO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsaUJBQWlCO0tBQ3pCO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsa0JBQWtCO0tBQzFCO0lBQ0QsaUJBQWlCLEVBQUU7UUFDakIsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsb0JBQW9CO0tBQzVCO0NBQ0Y7Ozs7O0FBS0QsTUFBTSxLQUFPLGNBQWMsR0FBc0I7SUFDL0MsUUFBUSxFQUFFLFNBQVM7SUFDbkIsVUFBVSxFQUFFLEdBQUc7SUFDZixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7SUFDakMsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQztJQUNQLFFBQVEsRUFBRSxTQUFTO0lBQ25CLFdBQVcsRUFBRSxRQUFRLENBQUMsWUFBWTtJQUNsQyxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxPQUFPLENBQUMsaUJBQWlCO0lBQ2xDLEdBQUcsRUFBRSxFQUFFO0lBQ1AsWUFBWSxFQUFFLFFBQVEsQ0FBQyxZQUFZO0lBQ25DLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLEVBQUU7SUFDWCxjQUFjLEVBQUUsd0JBQXdCO0lBQ3hDLG1CQUFtQixFQUFFLEdBQUc7SUFDeEIsWUFBWSxFQUFFLHVCQUF1QjtJQUNyQyxPQUFPLEVBQUUsU0FBUztJQUNsQixXQUFXLEVBQUUsWUFBWSxDQUFDLFdBQVc7SUFDckMsV0FBVyxFQUFFLENBQUM7SUFDZCxjQUFjLEVBQUUsSUFBSTtJQUNwQixJQUFJLEVBQUUsRUFBRTtJQUNSLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFlBQVksRUFBRSxRQUFRLENBQUMsWUFBWTtJQUNuQyxTQUFTLEVBQUUsR0FBRztDQUNmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmd4VWlMb2FkZXJDb25maWcgfSBmcm9tICcuL25neC11aS1sb2FkZXItY29uZmlnJztcbmltcG9ydCB7IFBPU0lUSU9OLCBQQl9ESVJFQ1RJT04sIFNQSU5ORVIgfSBmcm9tICcuL25neC11aS1sb2FkZXIuZW51bXMnO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIHRhc2sgaWRcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEFTS19JRCA9ICdkZWZhdWx0JztcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB2YWx1ZSBvZiBsb2FkZXIgaWRcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFTVEVSX0xPQURFUl9JRCA9ICdtYXN0ZXInO1xuXG5leHBvcnQgY29uc3QgQ0xPU0lOR19USU1FID0gMTAwMTtcblxuZXhwb3J0IGNvbnN0IFdBSVRJTkdfRk9SX09WRVJMQVlfRElTQVBQRUFSID0gNTAwO1xuXG4vKipcbiAqIFRoZSBjb25maWd1cmF0aW9uIG9mIHNwaW5uZXJzXG4gKi9cbmV4cG9ydCBjb25zdCBTUElOTkVSX0NPTkZJRyA9IHtcbiAgJ2JhbGwtc2NhbGUtbXVsdGlwbGUnOiB7XG4gICAgZGl2czogMyxcbiAgICBjbGFzczogJ3NrLWJhbGwtc2NhbGUtbXVsdGlwbGUnXG4gIH0sXG4gICdiYWxsLXNwaW4nOiB7XG4gICAgZGl2czogOCxcbiAgICBjbGFzczogJ3NrLWJhbGwtc3BpbidcbiAgfSxcbiAgJ2JhbGwtc3Bpbi1jbG9ja3dpc2UnOiB7XG4gICAgZGl2czogOCxcbiAgICBjbGFzczogJ3NrLWJhbGwtc3Bpbi1jbG9ja3dpc2UnXG4gIH0sXG4gICdiYWxsLXNwaW4tY2xvY2t3aXNlLWZhZGUtcm90YXRpbmcnOiB7XG4gICAgZGl2czogOCxcbiAgICBjbGFzczogJ3NrLWJhbGwtc3Bpbi1jbG9ja3dpc2UtZmFkZS1yb3RhdGluZydcbiAgfSxcbiAgJ2JhbGwtc3Bpbi1mYWRlLXJvdGF0aW5nJzoge1xuICAgIGRpdnM6IDgsXG4gICAgY2xhc3M6ICdzay1iYWxsLXNwaW4tZmFkZS1yb3RhdGluZydcbiAgfSxcbiAgJ2NoYXNpbmctZG90cyc6IHtcbiAgICBkaXZzOiAyLFxuICAgIGNsYXNzOiAnc2stY2hhc2luZy1kb3RzJ1xuICB9LFxuICAnY2lyY2xlJzoge1xuICAgIGRpdnM6IDEyLFxuICAgIGNsYXNzOiAnc2stY2lyY2xlJ1xuICB9LFxuICAnY3ViZS1ncmlkJzoge1xuICAgIGRpdnM6IDksXG4gICAgY2xhc3M6ICdzay1jdWJlLWdyaWQnXG4gIH0sXG4gICdkb3VibGUtYm91bmNlJzoge1xuICAgIGRpdnM6IDIsXG4gICAgY2xhc3M6ICdzay1kb3VibGUtYm91bmNlJ1xuICB9LFxuICAnZmFkaW5nLWNpcmNsZSc6IHtcbiAgICBkaXZzOiAxMixcbiAgICBjbGFzczogJ3NrLWZhZGluZy1jaXJjbGUnXG4gIH0sXG4gICdmb2xkaW5nLWN1YmUnOiB7XG4gICAgZGl2czogNCxcbiAgICBjbGFzczogJ3NrLWZvbGRpbmctY3ViZSdcbiAgfSxcbiAgJ3B1bHNlJzogIHtcbiAgICBkaXZzOiAxLFxuICAgIGNsYXNzOiAnc2stcHVsc2UnXG4gIH0sXG4gICdyZWN0YW5nbGUtYm91bmNlJzoge1xuICAgIGRpdnM6IDUsXG4gICAgY2xhc3M6ICdzay1yZWN0YW5nbGUtYm91bmNlJ1xuICB9LFxuICAncmVjdGFuZ2xlLWJvdW5jZS1wYXJ0eSc6IHtcbiAgICBkaXZzOiA1LFxuICAgIGNsYXNzOiAnc2stcmVjdGFuZ2xlLWJvdW5jZS1wYXJ0eSdcbiAgfSxcbiAgJ3JlY3RhbmdsZS1ib3VuY2UtcHVsc2Utb3V0Jzoge1xuICAgIGRpdnM6IDUsXG4gICAgY2xhc3M6ICdzay1yZWN0YW5nbGUtYm91bmNlLXB1bHNlLW91dCdcbiAgfSxcbiAgJ3JlY3RhbmdsZS1ib3VuY2UtcHVsc2Utb3V0LXJhcGlkJzoge1xuICAgIGRpdnM6IDUsXG4gICAgY2xhc3M6ICdzay1yZWN0YW5nbGUtYm91bmNlLXB1bHNlLW91dC1yYXBpZCdcbiAgfSxcbiAgJ3JvdGF0aW5nLXBsYW5lJzoge1xuICAgIGRpdnM6IDEsXG4gICAgY2xhc3M6ICdzay1yb3RhdGluZy1wbGFuZSdcbiAgfSxcbiAgJ3NxdWFyZS1qZWxseS1ib3gnOiB7XG4gICAgZGl2czogMixcbiAgICBjbGFzczogJ3NrLXNxdWFyZS1qZWxseS1ib3gnXG4gIH0sXG4gICdzcXVhcmUtbG9hZGVyJzoge1xuICAgIGRpdnM6IDEsXG4gICAgY2xhc3M6ICdzay1zcXVhcmUtbG9hZGVyJ1xuICB9LFxuICAndGhyZWUtYm91bmNlJzoge1xuICAgIGRpdnM6IDMsXG4gICAgY2xhc3M6ICdzay10aHJlZS1ib3VuY2UnXG4gIH0sXG4gICd0aHJlZS1zdHJpbmdzJzoge1xuICAgIGRpdnM6IDMsXG4gICAgY2xhc3M6ICdzay10aHJlZS1zdHJpbmdzJ1xuICB9LFxuICAnd2FuZGVyaW5nLWN1YmVzJzoge1xuICAgIGRpdnM6IDIsXG4gICAgY2xhc3M6ICdzay13YW5kZXJpbmctY3ViZXMnXG4gIH0sXG59O1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gb2Ygbmd4LXVpLWxvYWRlclxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUc6IE5neFVpTG9hZGVyQ29uZmlnID0ge1xuICBiZ3NDb2xvcjogJyMwMEFDQzEnLFxuICBiZ3NPcGFjaXR5OiAwLjUsXG4gIGJnc1Bvc2l0aW9uOiBQT1NJVElPTi5ib3R0b21SaWdodCxcbiAgYmdzU2l6ZTogNjAsXG4gIGJnc1R5cGU6IFNQSU5ORVIuYmFsbFNwaW5DbG9ja3dpc2UsXG4gIGJsdXI6IDUsXG4gIGZnc0NvbG9yOiAnIzAwQUNDMScsXG4gIGZnc1Bvc2l0aW9uOiBQT1NJVElPTi5jZW50ZXJDZW50ZXIsXG4gIGZnc1NpemU6IDYwLFxuICBmZ3NUeXBlOiBTUElOTkVSLmJhbGxTcGluQ2xvY2t3aXNlLFxuICBnYXA6IDI0LFxuICBsb2dvUG9zaXRpb246IFBPU0lUSU9OLmNlbnRlckNlbnRlcixcbiAgbG9nb1NpemU6IDEyMCxcbiAgbG9nb1VybDogJycsXG4gIG1hc3RlckxvYWRlcklkOiBERUZBVUxUX01BU1RFUl9MT0FERVJfSUQsXG4gIG92ZXJsYXlCb3JkZXJSYWRpdXM6ICcwJyxcbiAgb3ZlcmxheUNvbG9yOiAncmdiYSg0MCwgNDAsIDQwLCAwLjgpJyxcbiAgcGJDb2xvcjogJyMwMEFDQzEnLFxuICBwYkRpcmVjdGlvbjogUEJfRElSRUNUSU9OLmxlZnRUb1JpZ2h0LFxuICBwYlRoaWNrbmVzczogMyxcbiAgaGFzUHJvZ3Jlc3NCYXI6IHRydWUsXG4gIHRleHQ6ICcnLFxuICB0ZXh0Q29sb3I6ICcjRkZGRkZGJyxcbiAgdGV4dFBvc2l0aW9uOiBQT1NJVElPTi5jZW50ZXJDZW50ZXIsXG4gIHRocmVzaG9sZDogNTAwXG59O1xuIl19