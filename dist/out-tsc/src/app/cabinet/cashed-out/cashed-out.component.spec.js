import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { CashedOutComponent } from './cashed-out.component';
describe('CashedOutComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [CashedOutComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CashedOutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=cashed-out.component.spec.js.map