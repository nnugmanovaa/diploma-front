import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
let HeaderComponent = class HeaderComponent {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        this.hideLogin = false;
        this.showCabinet = false;
        this.user = null;
        this.settingsPage = false;
        this.showNav = false;
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                if (event['url'] === '/cabinet/settings') {
                    this.settingsPage = true;
                }
                else {
                    this.settingsPage = false;
                }
                if (event['url'] !== '/') {
                    this.hideLogin = true;
                }
                else {
                    this.hideLogin = false;
                }
                this.checkLogin();
            }
        });
    }
    ngOnInit() {
        this.checkLogin();
    }
    checkLogin() {
        this.user = this.authService.getUser;
        if (this.authService.isLoggedIn) {
            this.hideLogin = true;
        }
    }
    logout() {
        this.authService.logout();
        this.user = null;
        this.showNav = false;
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'mfo-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map