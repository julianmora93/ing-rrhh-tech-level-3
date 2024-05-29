// import { Component, ViewEncapsulation, Input, Output, EventEmitter, } from "@angular/core";
// import { FormControl, FormGroup } from "@angular/forms";
// import { ReplaySubject, Subject, takeUntil } from "rxjs";

// @Component({
//     selector: "select-search-component",
//     templateUrl: "./select.search.component.html",
//     styleUrls: ["./select.search.component.css"],
//     encapsulation: ViewEncapsulation.None,
//     standalone: false
// })
// export class SelectSearchComponent {

//     @Output() searchChangeEvent: EventEmitter<any> = new EventEmitter();
//     @Input("formGroup") formGroup = new FormGroup("");
//     @Input("formCtrlName") formCtrlName: string = '';
//     @Input("inputLabel") inputLabel: string = '';
//     @Input("textInvalid") textInvalid: string = '';
//     @Input("keyFilter") keyFilter: string = '';
//     //@Input("disabledCmp") disabledCmp: boolean = true;
//     @Input() set list(val: any[]) {
//         this._list = val;
//         this.initSearch();
//     }
//     _list: any[] = [];
//     filteredCtrl: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
//     search: FormControl = new FormControl();
  
//     protected _onDestroy = new Subject<void>();
  
//     ngOnDestroy() {
//         this._onDestroy.next();
//         this._onDestroy.complete();
//     }
  
//     initSearch() {
//         this.filteredCtrl.next(this._list.slice());
//         this.search.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
//             this.filter();
//         });
//     }
  
//     filter() {
//         let search: string = this.search.value;
//         if (!this._list) {
//             return;
//         }
//         if (!search) {
//             this.filteredCtrl.next(this._list.slice());
//         } else {
//             search = search.toLowerCase();
//         }
//         this.filteredCtrl.next(
//             this._list.filter(
//                 (data: any) => data[this.keyFilter].toLowerCase().indexOf(search) > -1
//             )
//         );
//     }

//     getControl(): FormControl {
//         return this.formGroup.get(this.formCtrlName) as FormControl;
//     }

//     selectionChangeEvent(event: any){
//         this.searchChangeEvent.emit(event);
//     }
    
// }