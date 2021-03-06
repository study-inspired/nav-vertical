import {AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Directive({
    selector: '[appNavVertical]'
})
export class NavVerticalDirective implements OnInit, AfterViewInit
{
    top: number = 0;

    @HostListener('click', ['$event'])
    onMouseEnter(event: any)
    {
        // this.top = event.target.offsetTop;
        // let inkBar = this.render2.selectRootElement('.ink-bar');
        // inkBar.style.cssText = `top : ${this.top}px`;

        this.setTopInkBar(event.target.offsetTop);
    }

    constructor(private ref: ElementRef,
                private router: Router,
                private route: ActivatedRoute,
                private render2: Renderer2)
    { }

    ngOnInit(): void
    {
        const inkBar = this.render2.createElement(`span`);
        inkBar.className = 'ink-bar-vertical';
        inkBar.style.cssText = `top : ${this.top}px`;
        this.render2.appendChild(this.ref.nativeElement, inkBar);

    }

    ngAfterViewInit(): void
    {

        //TODO bug binding list menu
        const pathName = window.location.pathname;
        const listNodes = [...this.ref.nativeElement.childNodes];
        const elementActive = listNodes.find(x => x.innerHTML.includes(pathName));
        this.setTopInkBar(elementActive.offsetTop);
    }

    private setTopInkBar(topPosition)
    {
        this.top = topPosition;
        let inkBar = this.render2.selectRootElement('.ink-bar-vertical');
        inkBar.style.cssText = `top : ${this.top}px`;
    }
}
