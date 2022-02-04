import { __decorate } from "tslib";
import { Component } from '@angular/core';
let StepsComponent = class StepsComponent {
    constructor(stepService, route, router, registerService, authService) {
        this.stepService = stepService;
        this.route = route;
        this.router = router;
        this.registerService = registerService;
        this.authService = authService;
        this.step = 1;
        this.data = {
            "iin": null,
            "personalInfo": {
                "IPDL": "no",
                "lastName": null,
                "firstName": null,
                "middleName": null,
                "birthDate": null,
                "sameAdress": true,
                "nationalIdDocument": {
                    "idNumber": null,
                    "nationality": null,
                    "issuedBy": null,
                    "issuedDate": null,
                    "expireDate": null,
                },
                "registrationAddress": {
                    "district": null,
                    "region": null,
                    "city": null,
                    "postalCode": null,
                    "street": null,
                    "house": null,
                    "apartment": null,
                    "country": "Казахстан",
                },
                "residenceAddress": {
                    "district": null,
                    "region": null,
                    "city": null,
                    "postalCode": null,
                    "street": null,
                    "house": null,
                    "apartment": null,
                    "country": "Казахстан",
                },
                "education": null,
                "employment": null,
                "typeOfWork": null,
                "workPosition": null,
                "employer": null,
                "monthlyIncome": 0,
                "additionalMonthlyIncome": 0,
                "workExperience": 0,
                "workPhoneNum": null,
                "maritalStatus": null,
                "gender": null,
                "numberOfKids": 0
            },
            "loanAmount": 0,
            "loanPeriod": 0,
            "loanProduct": null,
            "loanMethod": null,
            "preScoreRequestId": null,
        };
        this.userInfo = {
            "addressInfoDto": {
                "region": "",
                "city": "",
                "postalCode": "",
                "street": "",
                "house": "",
                "apartment": "",
                "periodOfResidence": "",
                "addressIsValid": true
            },
            "jobDetailsDto": {
                "education": "",
                "employment": "",
                "typeOfWork": "",
                "workPosition": "",
                "employer": "",
                "monthlyIncome": "",
                "additionalMonthlyIncome": "",
                "maritalStatus": "",
                "numberOfKids": ""
            },
            "passportInfoDto": {
                "firstName": "",
                "lastName": "",
                "patronymic": "",
                "birthDate": "",
                "nationalIdNumber": "",
                "nationality": "",
                "nationalIdIssuer": "",
                "nationalIdIssueDate": "",
                "nationalIdValidDate": "",
                "isIpdl": true,
            }
        };
        this.priceMask = {
            mask: [
                { mask: '' },
                {
                    mask: 'num ₸',
                    lazy: false,
                    blocks: {
                        num: {
                            mask: Number,
                            scale: 2,
                            thousandsSeparator: ' ',
                            radix: ',',
                            mapToRadix: ['.']
                        }
                    }
                }
            ]
        };
        this.districts = null;
        this.cities = null;
        this.citiesres = null;
        this.selectedDistrict = null;
        this.selectedCity = null;
        this.selectedDistrictResidence = null;
        this.selectedCityResidence = null;
        this.stroke = "stroke-dasharray: 753.9822368615503, 753.9822368615503; stroke-dashoffset: 753.9822368615503;";
        this.intervalId = null;
        this.loading = false;
        this.percent = 0;
        this.resultShow = false;
        this.errorResult = false;
        this.successResult = false;
        this.loanID = null;
        this.showSMSModal = false;
        this.code = null;
        this.userId = null;
    }
    ngOnInit() {
        this.getLocations();
        this.fillData();
        this.getUserByPhone();
        this.route.queryParams.subscribe(queryParams => {
            if (queryParams) {
                this.data.loanAmount = queryParams.amount;
                this.data.loanPeriod = queryParams.period;
                this.data.loanMethod = queryParams.type;
                this.data.preScoreRequestId = queryParams.requestId;
            }
        });
    }
    getAnketa() {
        this.stepService.getAnketa(this.loanID).subscribe(res => {
            let file = URL.createObjectURL(res);
            window.open(file);
        });
    }
    getUserByPhone() {
        var _a, _b;
        this.authService.getUserId((_b = (_a = this.authService) === null || _a === void 0 ? void 0 : _a.getUser) === null || _b === void 0 ? void 0 : _b.username).subscribe(res => {
            this.userId = res.id;
        });
    }
    getContract() {
        this.stepService.getContract(this.loanID).subscribe(res => {
            let file = URL.createObjectURL(res);
            window.open(file);
        });
    }
    strokeLoading() {
        this.loading = true;
        let perc = 0;
        this.fillSvg();
        this.intervalId = setInterval(() => {
            this.fillSvg();
        }, 1000);
    }
    fillSvg() {
        if (this.percent > 77) {
            this.percent += Math.floor(Math.random() * 2) + 1;
        }
        else {
            this.percent += Math.floor(Math.random() * 10) + 1;
        }
        if (this.percent > 97) {
            clearInterval(this.intervalId);
            this.percent = 97;
        }
        let circumference = 120 * 2 * Math.PI;
        let offset = circumference - this.percent / 100 * circumference;
        this.stroke = `stroke-dasharray: ${circumference}, ${circumference}; stroke-dashoffset: ${offset};`;
    }
    fillData() {
        var _a, _b, _c;
        let info = localStorage.getItem('pinfo');
        if (info) {
            let dinfo = JSON.parse(info);
            this.data.iin = dinfo.iin;
            this.data.personalInfo.firstName = dinfo.firstName;
            this.data.personalInfo.lastName = dinfo.lastName;
            this.data.personalInfo.middleName = dinfo.middleName;
            this.data.personalInfo.birthDate = dinfo.dateOfBirth;
            this.data.personalInfo.nationalIdDocument.idNumber = dinfo.nationalIdNumber;
            this.data.personalInfo.nationalIdDocument.nationality = dinfo.nationality;
            this.data.personalInfo.nationalIdDocument.issuedBy = dinfo.nationalIdIssuer;
            this.data.personalInfo.nationalIdDocument.issuedDate = dinfo.nationalIdIssueDate;
            this.data.personalInfo.nationalIdDocument.expireDate = dinfo.nationalIdValidDate;
            this.data.personalInfo.gender = dinfo.gender;
            this.data.personalInfo.registrationAddress.street = (_a = dinfo === null || dinfo === void 0 ? void 0 : dinfo.registrationAddress) === null || _a === void 0 ? void 0 : _a.street;
            this.data.personalInfo.registrationAddress.house = (_b = dinfo === null || dinfo === void 0 ? void 0 : dinfo.registrationAddress) === null || _b === void 0 ? void 0 : _b.building;
            this.data.personalInfo.registrationAddress.apartment = (_c = dinfo === null || dinfo === void 0 ? void 0 : dinfo.registrationAddress) === null || _c === void 0 ? void 0 : _c.flat;
            // this.data.personalInfo.registrationAddress.street = dinfo?.registrationAddress?.street;
        }
    }
    getLocations() {
        this.stepService.getLocations().subscribe(res => {
            this.districts = res;
        });
    }
    setPostalCode(res = false) {
        if (res) {
            this.data.personalInfo.residenceAddress.city = this.selectedDistrictResidence.name_ru;
            this.data.personalInfo.residenceAddress.region = this.selectedDistrictResidence.id;
        }
        else {
            this.data.personalInfo.registrationAddress.city = this.selectedCity.name_ru;
            this.data.personalInfo.registrationAddress.region = this.selectedCity.id;
        }
    }
    getCities() {
        var _a, _b;
        this.cities = null;
        this.data.personalInfo.registrationAddress.district = (_a = this.selectedDistrict) === null || _a === void 0 ? void 0 : _a.name_ru;
        this.stepService.getCities((_b = this.selectedDistrict) === null || _b === void 0 ? void 0 : _b.id).subscribe(res => {
            this.cities = res;
        });
    }
    getResCities() {
        var _a, _b;
        this.citiesres = null;
        this.data.personalInfo.residenceAddress.district = (_a = this.selectedDistrictResidence) === null || _a === void 0 ? void 0 : _a.name_ru;
        this.stepService.getCities((_b = this.selectedDistrictResidence) === null || _b === void 0 ? void 0 : _b.id).subscribe(res => {
            this.citiesres = res;
        });
    }
    setPasportData() {
        this.step = 2;
    }
    setAdressData() {
        this.step = 3;
    }
    sendOTP() {
        var _a, _b;
        this.registerService.sendOTP({ msisdn: (_b = (_a = this.authService) === null || _a === void 0 ? void 0 : _a.getUser) === null || _b === void 0 ? void 0 : _b.username }).subscribe(res => {
            this.showSMSModal = true;
        });
    }
    sendCode() {
        var _a, _b;
        if (this.code.length == 6 && !this.code.includes('-')) {
            let data = {
                code: this.code,
                msisdn: (_b = (_a = this.authService) === null || _a === void 0 ? void 0 : _a.getUser) === null || _b === void 0 ? void 0 : _b.username
            };
            this.stepService.changeCardStatus(this.loanID).subscribe(res => {
                this.registerService.checkOTP(data).subscribe(res => {
                    let order = {
                        orderId: this.loanID,
                        "backSuccessLink": "https://zaimem.kz/cabinet/cashed-out",
                        "backFailureLink": "https://zaimem.kz/cabinet/cashed-out"
                    };
                    this.stepService.payoutCard(order).subscribe(res => {
                        window.open(res.url);
                        this.router.navigate(['/cabinet/cashed-out']);
                    });
                });
            });
        }
    }
    finishStep() {
        if (this.data.personalInfo.sameAdress) {
            this.data.personalInfo.residenceAddress = this.data.personalInfo.registrationAddress;
        }
        if (this.data.loanPeriod) {
            this.data.loanPeriod = Number(this.data.loanPeriod);
        }
        if (this.data.loanAmount) {
            this.data.loanAmount = Number(this.data.loanAmount);
        }
        if (this.data.personalInfo.monthlyIncome) {
            this.data.personalInfo.monthlyIncome = Number(this.data.personalInfo.monthlyIncome);
        }
        if (this.data.personalInfo.additionalMonthlyIncome) {
            this.data.personalInfo.additionalMonthlyIncome = Number(this.data.personalInfo.additionalMonthlyIncome);
        }
        if (this.data.personalInfo.workExperience) {
            this.data.personalInfo.workExperience = Number(this.data.personalInfo.workExperience);
        }
        if (this.data.personalInfo.numberOfKids) {
            this.data.personalInfo.numberOfKids = Number(this.data.personalInfo.numberOfKids);
        }
        this.strokeLoading();
        this.stepService.submitStep(this.data).subscribe(res => {
            this.resultShow = true;
            this.successResult = true;
            this.loanID = res.orderId;
            this.loading = false;
            this.updateUser();
        }, error => {
            this.resultShow = true;
            this.errorResult = true;
            this.loading = false;
        });
    }
    updateUser() {
        this.userInfo.passportInfoDto.firstName = this.data.personalInfo.firstName;
        this.userInfo.passportInfoDto.firstName = this.data.personalInfo.firstName;
        this.userInfo.passportInfoDto.firstName = this.data.personalInfo.firstName;
        this.userInfo.passportInfoDto.firstName = this.data.personalInfo.firstName;
        this.userInfo.passportInfoDto.firstName = this.data.personalInfo.firstName;
        this.userInfo.passportInfoDto.firstName = this.data.personalInfo.firstName;
        this.userInfo.passportInfoDto.firstName = this.data.personalInfo.firstName;
        this.authService.CreateUserPasport(this.userInfo.passportInfoDto, this.userId).subscribe(res => {
        });
    }
};
StepsComponent = __decorate([
    Component({
        selector: 'mfo-steps',
        templateUrl: './steps.component.html',
        styleUrls: ['./steps.component.scss']
    })
], StepsComponent);
export { StepsComponent };
//# sourceMappingURL=steps.component.js.map