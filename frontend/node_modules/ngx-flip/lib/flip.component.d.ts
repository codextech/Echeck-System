import { OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
export declare class FlipComponent implements OnInit, OnChanges {
    private renderer;
    constructor(renderer: Renderer2);
    private flipContainer;
    flip: boolean;
    ngOnInit(): void;
    ngOnChanges(change: SimpleChanges): void;
    rotate(): void;
}
