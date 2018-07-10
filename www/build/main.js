webpackJsonp([5],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FisherCommunityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fisher_confirm_fisher_confirm__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_FisherService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_community_info_class__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_community_class__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Imported page classes

//Imported services

//Imported non-page classes



//Function to check that custom community has been entered
function customCommEntered(selectedCommKey, customCommKey) {
    return function (group) {
        var selectedComm = group.controls[selectedCommKey];
        var customComm = group.controls[customCommKey];
        if ((selectedComm.value == 'Other') && (!customComm.value)) {
            return {
                missingCustomComm: true
            };
        }
    };
}
var FisherCommunityPage = /** @class */ (function () {
    function FisherCommunityPage(navCtrl, navParams, fisherService, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fisherService = fisherService;
        this.formBuilder = formBuilder;
        this.all_comms = [];
        this.community_info = new __WEBPACK_IMPORTED_MODULE_4__classes_community_info_class__["a" /* CommunityInfoClass */]();
        this.confirm_personal = new Object();
        this.validation_messages = {
            'province': [
                { type: 'required', message: 'Please select a province.' }
            ],
            'community': [
                { type: 'required', message: 'Please select a community.' }
            ],
        };
        //TODO -- improve this to read these communities from a csv file/from an API call
        this.list_of_communities = [
            "name_eng__c,province_abbreviation__c,unique_ext_id__c",
            "Ocean View,WC,ocean_view",
            "Lamberts Bay,WC,lambertsbaai",
            "Struis Bay,WC,struisbaai",
            "Kleinmond,WC,kleinmond",
            "Port Nolloth,NC,portnolloth",
            "Hondeklip Bay,NC,hondeklipbaai",
            "Saint Helena,WC,sainthelena",
            "Doring Bay,WC,doringbaai",
            "Olifants,WC,olifants",
            "Elands Bay,WC,elandsbaai",
            "Demo Community,WC,democommunity",
            "Muizenberg,WC,muizenberg",
            "Bellville,WC,bellville",
            "Hermanus,WC,hermanus",
            "Kalk Bay,WC,kalk_bay",
            "Grassy Park,WC,grassy_park",
            "Strand,WC,strand",
            "Strandfontein (False Bay),WC,strandfontein_falsebay",
            "Hout Bay,WC,hout_bay",
            "Simon's Town,WC,simonstown",
            "Gordon's Bay,WC,gordons_bay",
            "Arniston,WC,arniston",
            "St Helena Island,SHI,sainthelenaisland",
            "Langebaan,WC,langebaan",
            "Paternoster,WC,paternoster",
            "Bettys Bay,WC,bettysbay",
            "Pringle Bay,WC,pringlebay",
            "Cape Town,WC,capetown",
            "Coffee Bay,KZN,coffeebay",
            "Other,Other,other"
        ];
        this.communityForm = this.formBuilder.group({
            "province": ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required],
            "community": ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required],
            "custom": [null, null],
        }, { validator: customCommEntered('community', 'custom') });
        //construct the list of all communities upon and instantiate once
        for (var i = 1; i < this.list_of_communities.length; i++) {
            var line = (this.list_of_communities[i]).split(",");
            this.all_comms.push(new __WEBPACK_IMPORTED_MODULE_5__classes_community_class__["a" /* CommunityClass */](line[0], line[1], line[2]));
        }
    }
    FisherCommunityPage.prototype.provinceChanged = function () {
        this.community_info.comm_province = this.communityForm.get('province').value;
    };
    FisherCommunityPage.prototype.communityChanged = function () {
        this.community_info.comm_community = this.parseCommunity(this.communityForm.get('community').value);
    };
    FisherCommunityPage.prototype.customCommunityEntered = function () {
        if (this.community_info.comm_community == 'other') {
            this.community_info.custom_community = this.communityForm.get('custom').value;
        }
    };
    FisherCommunityPage.prototype.parseCommunity = function (name_eng) {
        var comm_ID = "";
        for (var i = 0; i < this.all_comms.length; i++) {
            if (this.all_comms[i].name_eng == name_eng) {
                comm_ID = this.all_comms[i].unique_ext_id;
                break; //we found the desired community, abort the search loop
            }
        }
        return comm_ID;
    };
    FisherCommunityPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad FisherCommunityPage");
        //package the info needed by the confirmation page for propagation ahead to the register page
        this.confirm_personal = {
            surname: this.navParams.get('personal_surname'),
            firstname: this.navParams.get('personal_firstname'),
            IDnum: this.navParams.get('personal_IDnum'),
            cellNo: this.navParams.get('personal_cellNo'),
        };
    };
    FisherCommunityPage.prototype.onFisherFinishCommunity = function () {
        this.fisherService.fisherUpdateCommunity(this.community_info);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__fisher_confirm_fisher_confirm__["a" /* FisherConfirmPage */], this.confirm_personal);
    };
    FisherCommunityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-fisher-community',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-community/fisher-community.html"*/'<!--\n  Generated template for the FisherCommunityPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n        <ion-navbar>\n              <ion-title>Abalobi Register</ion-title>\n        </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n        <form [formGroup] = "communityForm">\n\n\n                <p style="text-align:center"><b>Community / Landing</b></p>\n\n                <ion-item>\n                        <ion-label text-wrap>Please select  your province\n                        </ion-label>\n                                <ion-select text-wrap formControlName="province" (ionChange)=" provinceChanged()">\n                                        <ion-option value="Western Cape">Western Cape</ion-option>\n                                        <ion-option value="Northern Cape">Northern Cape</ion-option>\n                                        <ion-option value="Eastern Cape">Eastern Cape</ion-option>\n                                        <ion-option value="North West"> North West</ion-option>\n                                        <ion-option value="Mpumalanga">Mpumalanga</ion-option>\n                                        <ion-option value="Limpopo">Limpopo</ion-option>\n                                        <ion-option value="Gauteng">Gauteng</ion-option>\n                                        <ion-option value="Free State">Free State</ion-option>\n                                        <ion-option value="KwaZulu-Natal">KwaZulu-Natal</ion-option>\n                                </ion-select>\n                </ion-item>\n\n                <div class="validation-errors">\n                        <ng-container *ngFor="let validation of validation_messages.province" >\n                                <div style="color:red" text-wrap align="center" class="error-message" *ngIf="communityForm.get(\'province\').hasError(validation.type) && (communityForm.get(\'province\').dirty || communityForm.get(\'province\').touched)">\n                                        {{ validation.message }}\n                                </div>\n                        </ng-container>\n                </div>\n\n\n                <ion-item>\n                            <ion-label text-wrap>Please select  your community\n                            </ion-label>\n                                        <ion-select text-wrap formControlName="community" (ionChange)=" communityChanged()">\n                                                <ion-option  text-wrap *ngFor="let c of all_comms">{{c.name_eng}}</ion-option>\n                                        </ion-select>\n                </ion-item>\n\n                <div class="validation-errors">\n                        <ng-container *ngFor="let validation of validation_messages.community" >\n                                 <div style="color:red" text-wrap align="center" class="error-message" *ngIf="communityForm.get(\'community\').hasError(validation.type) && (communityForm.get(\'community\').dirty || communityForm.get(\'community\').touched)">\n                                        {{ validation.message }}\n                                 </div>\n                        </ng-container>\n                </div>\n\n\n\n                <ion-item >\n                        <ion-label text-wrap stacked>Please enter your community if not on the list</ion-label>\n                        <ion-input  type="text" formControlName="custom" placeholder="Enter your community here" (ionChange)="customCommunityEntered()"></ion-input>\n                </ion-item>\n\n                <span style="color:red" text-wrap align="center" class="validation-errors" *ngIf="communityForm.hasError(\'missingCustomComm\')">Custom community required.</span>\n\n\n\n\n\n                <p style="text-align:center"><b>Do you have a fishing permit ?</b></p>\n\n\n                <ion-list >\n                        <ion-item>\n                                <ion-label> IRP / Exemption</ion-label>\n                                <ion-checkbox [(ngModel)]="community_info.comm_IRP_chosen" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n                        </ion-item>\n\n                        <ion-item>\n                                <ion-label> Commercial</ion-label>\n                                <ion-checkbox [(ngModel)]="community_info.comm_commercial_chosen" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n                        </ion-item>\n\n                        <ion-item>\n                                <ion-label> Recreational</ion-label>\n                                <ion-checkbox [(ngModel)]="community_info.comm_recreational_chosen" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n                        </ion-item>\n\n                        <ion-item>\n                                <ion-label> Other</ion-label>\n                                <ion-checkbox [(ngModel)]="community_info.comm_other_chosen" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n                        </ion-item>\n\n                </ion-list>\n\n                <button ion-button full  [disabled]="!communityForm.valid" (click)="onFisherFinishCommunity()">Next</button>\n        </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-community/fisher-community.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_FisherService__["a" /* FisherService */], __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */]])
    ], FisherCommunityPage);
    return FisherCommunityPage;
}()); //end class

//# sourceMappingURL=fisher-community.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FisherConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_FisherService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_personal_info_class__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__after_register_after_register__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Imported services



var FisherConfirmPage = /** @class */ (function () {
    function FisherConfirmPage(navCtrl, navParams, fisherService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fisherService = fisherService;
        //user details are propagated from personal details page through the community page to this final page
        //passed as navParams upon opening a new page
        this.confirm_info = new __WEBPACK_IMPORTED_MODULE_3__classes_personal_info_class__["a" /* PersonalInfoClass */]();
    }
    FisherConfirmPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FisherConfirmPage');
        this.confirm_info.personal_surname = this.navParams.get('surname');
        this.confirm_info.personal_firstname = this.navParams.get('firstname');
        this.confirm_info.personal_IDnum = this.navParams.get('IDnum');
        this.confirm_info.personal_cellNo = this.navParams.get('cellNo');
    };
    FisherConfirmPage.prototype.onFisherSubmit = function () {
        this.fisherService.fisherSubmitRegistration();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__after_register_after_register__["a" /* AfterRegisterPage */]); //navigate to blank page after registration attemp, whether successful or not
    };
    FisherConfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-fisher-confirm',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-confirm/fisher-confirm.html"*/'<!--\n  Generated template for the FisherConfirmPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-header>\n          <ion-navbar>\n                  <ion-title>Abalobi Register</ion-title>\n          </ion-navbar>\n</ion-header>\n\n\n<ion-content title="Abalobi Register-confirm" id="fisher-register-confirm">\n\n          <p text-wrap style="text-align:center;padding-left:0.5em;padding-right:0.5em">\n                    If everything is correct please press the Register button below. Otherwise please go back and correct the info.\n          </p>\n\n          <form text-wrap>\n                    <ion-item>\n                          <ion-label>Name: {{confirm_info.personal_firstname}}</ion-label>\n                          <ion-input placeholder=""></ion-input>\n                    </ion-item>\n\n\n                    <ion-item>\n                          <ion-label>Surname: {{confirm_info.personal_surname}}</ion-label>\n                          <ion-input placeholder=""></ion-input>\n                    </ion-item>\n\n\n                    <ion-item>\n                          <ion-label>ID Number: {{confirm_info.personal_IDnum}} </ion-label>\n                          <ion-input placeholder=""></ion-input>\n                    </ion-item>\n\n\n                    <ion-item>\n                          <ion-label>Cell Number:{{confirm_info.personal_cellNo}} </ion-label>\n                          <ion-input placeholder=""></ion-input>\n                    </ion-item>\n          </form>\n\n\n    <button ion-button full  (click)="onFisherSubmit()">Register</button>\n</ion-content>\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-confirm/fisher-confirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_FisherService__["a" /* FisherService */]])
    ], FisherConfirmPage);
    return FisherConfirmPage;
}()); //end class

//# sourceMappingURL=fisher-confirm.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FisherUsetermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fisher_personal_fisher_personal__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_FisherService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_fisher_useterms_class__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Imported page classes

//Imported services

//Imported non-page classes


var FisherUsetermsPage = /** @class */ (function () {
    function FisherUsetermsPage(navCtrl, navParams, fisherService, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fisherService = fisherService;
        this.formBuilder = formBuilder;
        this.terms_status = new __WEBPACK_IMPORTED_MODULE_4__classes_fisher_useterms_class__["a" /* FisherUsetermsClass */]();
        this.validation_messages = {
            'agree': [
                { type: 'required', message: 'Check "*I Agree" to accept the terms above.' },
            ],
        };
        this.termsForm = this.formBuilder.group({
            'agree': ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* Validators */].required],
        });
        this.termsForm.reset('agree'); //reset the checkbox upon creation
    }
    FisherUsetermsPage.prototype.ionViewDidLoad = function () {
    };
    FisherUsetermsPage.prototype.onFisherFinishTerms = function () {
        this.fisherService.fisherUpdateTerms(this.terms_status);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__fisher_personal_fisher_personal__["a" /* FisherPersonalPage */]);
    };
    FisherUsetermsPage.prototype.termsChanged = function () {
        this.terms_status.terms_use_agreed = this.termsForm.get('agree').value;
    };
    FisherUsetermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-fisher-useterms',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-useterms/fisher-useterms.html"*/'<!--\n  Generated template for the FisherUsetermsPage page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n        <ion-navbar>\n                <ion-title>Terms of Use</ion-title>\n        </ion-navbar>\n</ion-header>\n\n\n<ion-content title="Terms of Use" id="fisher-terms-form">\n\n            <form [formGroup] = "termsForm">\n\n                        <p text-wrap style="text-align:center;padding-left:0.5em;padding-right:0.5em"><!--style="padding-left:0.5em;padding-right:0.5em;text-align: center"-->\n                                <b>In order to maintain the Abalobi system it is possible for the core Abalobi team to access all data, however all data submitted will be treated with the utmost privacy. No individual fisher data will be shared with 3rd parties without express consent\n                                    of the fisher, however aggregated catch data for all fishers together may be published. (e.g. Total kg Snoek catch recorded in South Africa in Nov 2016.) If you allocate some of your catch to the co-op, the co-op will be able to receive that information.\n                                    You will always be able to access your own data on the Abalobi system.\n                                </b>\n                        </p>\n\n\n                        <ion-item>\n                                <ion-label>* I Agree</ion-label>\n                                <ion-checkbox formControlName=\'agree\' (ionChange)="termsChanged()"></ion-checkbox>\n                        </ion-item>\n\n                        <div style="color:red" text-wrap align="center" class="validation-errors">\n                            <ng-container *ngFor="let validation of validation_messages.agree" >\n                                    <div class="error-message" *ngIf="!termsForm.get(\'agree\').value"><!-- && ( termsForm.get(\'agree\').dirty || termsForm.get(\'agree\')).touched"-->\n                                                {{ validation.message }}\n                                    </div>\n                            </ng-container>\n                        </div>\n\n\n                        <p text-wrap style="text-align:center;padding-left:0.5em;padding-right:0.5em">\n                                <b> I further consent to share my data with the following parties (tick where applicable):</b>\n                        </p>\n\n\n                        <ion-list text-wrap id="termsOfUse-list2">\n                                <ion-item>\n                                        <ion-label> Abalobi Local Fisher Assistant</ion-label>\n                                        <ion-checkbox [(ngModel)]="terms_status.terms_assistant_agreed" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n                                </ion-item>\n\n\n                                <ion-item>\n                                        <ion-label > DAFF (Department of Agriculture, Forestry and Fisheries)</ion-label>\n                                        <ion-checkbox [(ngModel)]="terms_status.terms_DAFF_agreed" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n                                </ion-item>\n                        </ion-list>\n\n                        <button ion-button full  [disabled]="!termsForm.valid" (click)="onFisherFinishTerms()">Next</button>\n\n            </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-useterms/fisher-useterms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_FisherService__["a" /* FisherService */], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */]])
    ], FisherUsetermsPage);
    return FisherUsetermsPage;
}()); //end class

//# sourceMappingURL=fisher-useterms.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FisherPersonalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fisher_community_fisher_community__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_FisherService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_personal_info_class__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//Imported page classes

//Imported services

//Imported non-page classes

//Function to check for matching passwords
function matchingPasswords(passwordKey, confirmPasswordKey) {
    return function (group) {
        var password = group.controls[passwordKey];
        var confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
    };
}
var FisherPersonalPage = /** @class */ (function () {
    function FisherPersonalPage(navCtrl, navParams, fisherService, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fisherService = fisherService;
        this.formBuilder = formBuilder;
        this.personal_info = new __WEBPACK_IMPORTED_MODULE_5__classes_personal_info_class__["a" /* PersonalInfoClass */]();
        this.validation_messages = {
            'surname': [
                { type: 'required', message: 'Surname is required.' }
            ],
            'name': [
                { type: 'required', message: 'Name is required.' }
            ],
            'nickname': [
                { type: 'required', message: 'Nickame is required.' }
            ],
            'gender': [
                { type: 'required', message: 'Gender is required.' }
            ],
            'ID': [
                { type: 'required', message: 'ID is required.' },
                { type: 'minlength', message: 'ID number too short.' },
                { type: 'minLength', message: 'ID number too short.' },
                { type: 'maxlength', message: 'ID number too long.' },
                { type: 'maxLength', message: 'ID number too long.' },
                { type: 'pattern', message: 'Unacceptable symbols in ID.' }
            ],
            'cell': [
                { type: 'required', message: 'Cell Number is required.' },
                { type: 'minlength', message: 'Cell Number too short.' },
                { type: 'minLength', message: 'Cell Number too short.' },
                { type: 'maxlength', message: 'Cell Number too long.' },
                { type: 'maxLength', message: 'Cell Number too long.' },
                { type: 'pattern', message: 'Unacceptable symbols in Cell Number.' }
            ],
            'password1': [
                { type: 'required', message: 'Password is required.' },
            ],
            'password2': [
                { type: 'required', message: 'Password confirmation required.' },
            ]
        };
        this.personalForm = this.formBuilder.group({
            "surname": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            "name": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            "nickname": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            "gender": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            "ID": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[0-9]+$'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(13), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(13)])],
            "cell": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[0-9]+$'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(10)])],
            "password1": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            "password2": ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        }, { validator: matchingPasswords('password1', 'password2') });
    }
    FisherPersonalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FisherPersonalPage');
    };
    FisherPersonalPage.prototype.onFisherFinishPersonal = function () {
        this.fisherService.fisherUpdatePersonal(this.personal_info);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__fisher_community_fisher_community__["a" /* FisherCommunityPage */], this.personal_info);
    };
    FisherPersonalPage.prototype.surnameChanged = function () {
        this.personal_info.personal_surname = this.personalForm.get("surname").value;
    };
    FisherPersonalPage.prototype.nameChanged = function () {
        this.personal_info.personal_firstname = this.personalForm.get("name").value;
    };
    FisherPersonalPage.prototype.nickNameChanged = function () {
        this.personal_info.personal_nickname = this.personalForm.get("nickname").value;
    };
    FisherPersonalPage.prototype.genderChanged = function () {
        this.personal_info.personal_gender = this.personalForm.get("gender").value;
    };
    FisherPersonalPage.prototype.IDchanged = function () {
        this.personal_info.personal_IDnum = this.personalForm.get("ID").value;
    };
    FisherPersonalPage.prototype.cellChanged = function () {
        this.personal_info.personal_cellNo = this.personalForm.get("cell").value;
    };
    FisherPersonalPage.prototype.password1Changed = function () {
        this.personal_info.personal_password1 = this.personalForm.get("password1").value;
    };
    FisherPersonalPage.prototype.password2Changed = function () {
        this.personal_info.personal_password2 = this.personalForm.get("password2").value;
    };
    FisherPersonalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-fisher-personal',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-personal/fisher-personal.html"*/'<ion-header>\n        <ion-navbar>\n                <ion-title>Abalobi Register</ion-title>\n        </ion-navbar>\n</ion-header>\n\n\n\n<ion-content title="fisher-personal-form" id="page5">\n\n    <form [formGroup] = "personalForm">\n            <ion-item>\n                      <ion-label stacked>* Surname</ion-label>\n                    <ion-input type="text" formControlName="surname" placeholder="Enter your surname here"(ionChange)="surnameChanged()"></ion-input>\n            </ion-item>\n\n            <div style="color:red" text-wrap align="center" class="validation-errors">\n                        <ng-container *ngFor="let validation of validation_messages.surname" >\n                                <div class="error-message" *ngIf="personalForm.get(\'surname\').hasError(validation.type) && (personalForm.get(\'surname\').dirty || personalForm.get(\'surname\').touched)">\n                                    {{ validation.message }}\n                                </div>\n                        </ng-container>\n            </div>\n\n\n            <ion-item>\n                        <ion-label stacked>* First Name</ion-label>\n                        <ion-input type="text" formControlName="name" placeholder="Enter your name here"(ionChange)="nameChanged()"></ion-input>\n            </ion-item>\n\n            <div class="validation-errors">\n                        <ng-container *ngFor="let validation of validation_messages.name" >\n                                <div style="color:red" text-wrap align="center" class="error-message" *ngIf="personalForm.get(\'name\').hasError(validation.type) && (personalForm.get(\'name\').dirty || personalForm.get(\'name\').touched)">\n                                        {{ validation.message }}\n                                </div>\n                        </ng-container>\n            </div>\n\n\n            <ion-item>\n                        <ion-label stacked>* Nickname</ion-label>\n                        <ion-input type="text" formControlName="nickname" placeholder="What do people usually call you?"(ionChange)="nickNameChanged()"></ion-input>\n            </ion-item>\n\n            <div class="validation-errors">\n                        <ng-container *ngFor="let validation of validation_messages.nickname" >\n                                    <div style="color:red" text-wrap align="center" class="error-message" *ngIf="personalForm.get(\'nickname\').hasError(validation.type) && (personalForm.get(\'nickname\').dirty || personalForm.get(\'nickname\').touched)">\n                                            {{ validation.message }}\n                                    </div>\n                        </ng-container>\n            </div>\n\n\n            <ion-item>\n                    <ion-label stacked>* Gender (Required)\n                    </ion-label>\n                        <ion-select formControlName="gender" (ionChange)=" genderChanged()">\n                                  <ion-option value = "male">Male</ion-option>\n                                  <ion-option value = "female">Female</ion-option>\n                        </ion-select>\n            </ion-item>\n            <div class="validation-errors">\n                    <ng-container *ngFor="let validation of validation_messages.gender" >\n                            <div style="color:red" text-wrap align="center" class="error-message" *ngIf="personalForm.get(\'gender\').hasError(validation.type) && (personalForm.get(\'gender\').dirty || personalForm.get(\'gender\').touched)">\n                                    {{ validation.message }}\n                            </div>\n                    </ng-container>\n            </div>\n\n\n            <ion-item>\n                      <ion-label stacked>* ID Number</ion-label>\n                      <ion-input formControlName="ID"  type="text"  placeholder="Enter your ID Number here"(ionChange)="IDchanged()"></ion-input>\n            </ion-item>\n            <div class="validation-errors">\n                        <ng-container *ngFor="let validation of validation_messages.ID" >\n                                <div style="color:red" text-wrap align="center" class="error-message" *ngIf="personalForm.get(\'ID\').hasError(validation.type) && (personalForm.get(\'ID\').dirty || personalForm.get(\'ID\').touched)">\n                                    {{ validation.message }}\n                                </div>\n                        </ng-container>\n            </div>\n\n\n            <ion-item>\n                        <ion-label text-wrap stacked>* Personal Cellphone Number</ion-label>\n                        <ion-input formControlName="cell"  type="text"   placeholder="Enter your cell number here"(ionChange)="cellChanged()"></ion-input>\n            </ion-item>\n            <div style="color:red" text-wrap align="center" class="validation-errors">\n                    <ng-container *ngFor="let validation of validation_messages.cell" >\n                            <div class="error-message" *ngIf="personalForm.get(\'cell\').hasError(validation.type) && (personalForm.get(\'cell\').dirty || personalForm.get(\'cell\').touched)">\n                                    {{ validation.message }}\n                            </div>\n                    </ng-container>\n            </div>\n\n\n            <!--Password 1-->\n            <ion-item>\n                    <ion-label stacked>* Password</ion-label>\n                    <ion-input  type="text"  formControlName="password1" placeholder="Please choose a password"(ionChange)="password1Changed()"></ion-input>\n            </ion-item>\n            <div class="validation-errors">\n                    <ng-container *ngFor="let validation of validation_messages.password1" >\n                            <div style="color:red" text-wrap align="center" class="error-message" *ngIf="personalForm.get(\'password1\').hasError(validation.type) && (personalForm.get(\'password1\').dirty || personalForm.get(\'password1\').touched)">\n                                    {{ validation.message }}\n                            </div>\n                    </ng-container>\n            </div>\n            <!--span style="color:red" text-wrap align="center" class="validation-error" *ngIf="personalForm.get(\'password1\').touched && personalForm.get(\'password1\').errors?.notEqual"> Passwords do not match</span-->\n\n            <!--Password 2-->\n            <ion-item>\n                    <ion-label stacked>* Retype password</ion-label>\n                    <ion-input  type="text"  formControlName="password2" placeholder="Please re-type password"(ionChange)="password2Changed()"></ion-input>\n            </ion-item>\n            <div class="validation-errors">\n                    <ng-container *ngFor="let validation of validation_messages.password2" >\n                            <div style="color:red" text-wrap align="center" class="error-message" *ngIf="personalForm.get(\'password2\').hasError(validation.type) && (personalForm.get(\'password2\').dirty || personalForm.get(\'password2\').touched)">\n                                {{ validation.message }}\n                            </div>\n                    </ng-container>\n            </div>\n\n            <span style="color:red" text-wrap align="center" class="validation-errors" *ngIf="(personalForm.get(\'password1\').value.length >= 1)&&(personalForm.get(\'password2\').value.length >= 1)&&personalForm.hasError(\'mismatchedPasswords\')">Passwords do not match.</span>\n\n\n            <button ion-button type="submit"  [disabled]="!personalForm.valid" full  (click)="onFisherFinishPersonal()">Next</button>\n    </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-personal/fisher-personal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_FisherService__["a" /* FisherService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], FisherPersonalPage);
    return FisherPersonalPage;
}()); //end class

//# sourceMappingURL=fisher-personal.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FisherRolePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fisher_useterms_fisher_useterms__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_FisherService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//Imported service


var FisherRolePage = /** @class */ (function () {
    function FisherRolePage(navCtrl, navParams, fisherService, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fisherService = fisherService;
        this.formBuilder = formBuilder;
        this.validation_messages = {
            'role': [
                { type: 'required', message: 'Please select your role.' }
            ],
        };
        this.roleForm = this.formBuilder.group({
            "role": ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
        });
    }
    FisherRolePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FisherRolePage');
    };
    FisherRolePage.prototype.nextFromFisherRole = function () {
        this.fisherService.fisherUpdateRole(this.role);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__fisher_useterms_fisher_useterms__["a" /* FisherUsetermsPage */]);
    };
    FisherRolePage.prototype.roleChanged = function () {
        this.role = this.roleForm.get("role").value;
    };
    FisherRolePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-fisher-role',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-role/fisher-role.html"*/'\n<ion-header>\n    <ion-navbar>\n            <ion-title>Abalobi Register</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content title="Abalobi Register-role" id="fisher-role-form">\n\n    <form [formGroup] = "roleForm">\n\n                <p text-wrap style="text-align:center;padding-left:0.5em;padding-right:0.5em;background-color:#33CEFF;color:#FFFFFF;padding-left:0.5em">\n                        <b>Select \'Fisher\' if you are a fisher wanting to record and view your catch data using Abalobi.</b>\n                </p>\n\n                <ion-list radio-group type="text" formControlName=\'role\' (ionChange)="roleChanged()">\n                        <ion-item>\n                                <ion-label text-wrap>Fisher</ion-label>\n                                <ion-radio  type="text" value ="fisher" ></ion-radio>\n                        </ion-item>\n\n                        <ion-item>\n                                <ion-label text-wrap>Fisher Assistant</ion-label>\n                                <ion-radio type="text" value ="fisher_manager"></ion-radio>\n                        </ion-item>\n\n\n                        <ion-item>\n                                <ion-label text-wrap>Local Assistant AND fisher (will be logging own catch)</ion-label>\n                                <ion-radio type="text" value ="fisher,fisher_manager"></ion-radio>\n                        </ion-item>\n                </ion-list>\n\n                <div style="color:red" text-wrap align="center" class="validation-errors">\n                        <ng-container *ngFor="let validation of validation_messages.role" >\n                                <div class="error-message" *ngIf="roleForm.get(\'role\').hasError(validation.type)"> <!-- && (roleForm.get(\'role\').dirty || roleForm.get(\'role\').touched)"-->\n                                        {{ validation.message }}\n                                </div>\n                        </ng-container>\n                </div>\n\n            <button ion-button full [disabled]="!roleForm.valid" (click)="nextFromFisherRole()">Next</button>\n    </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/fisher-role/fisher-role.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_FisherService__["a" /* FisherService */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */]])
    ], FisherRolePage);
    return FisherRolePage;
}());

//# sourceMappingURL=fisher-role.js.map

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 122;

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/fisher-community/fisher-community.module": [
		300,
		4
	],
	"../pages/fisher-confirm/fisher-confirm.module": [
		301,
		3
	],
	"../pages/fisher-personal/fisher-personal.module": [
		303,
		2
	],
	"../pages/fisher-role/fisher-role.module": [
		304,
		1
	],
	"../pages/fisher-useterms/fisher-useterms.module": [
		302,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 166;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Registree; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Registree = /** @class */ (function () {
    function Registree() {
        //Role details
        this.role = "";
        //Terms of use details
        this.terms_agreed = false;
        this.assistant_agreed = false;
        this.DAFF_agreed = false;
        //Personal details
        this.surname = "";
        this.firstname = "";
        this.nickname = "";
        this.gender = "";
        this.IDnum = "";
        this.cellNo = "";
        this.password = "";
        //Community details
        this.province = "";
        this.community = "";
        this.custom_community = "";
        this.comm_not_listed = false;
        this.IRP_selected = false;
        this.commercial_selected = false;
        this.recreational_selected = false;
        this.other_seleted = false;
    }
    Registree = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], Registree);
    return Registree;
}()); //end class registree

//# sourceMappingURL=registree_class.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Secrets; });
var Secrets = /** @class */ (function () {
    function Secrets() {
        this.marketplaceCheckUserURL = "http://169.239.183.156:1337/api/users/find/?username=";
        this.marketplaceAddUserURL = "http://169.239.183.156:1337/api/users/create/";
        this.fisherCheckUserIDurl = "http://server.abalobi.info/api/users/id/checkidexists?id=";
        this.fisherAddUserURL = "https://www.openfn.org/inbox/3afab0f1-3937-4ca8-95a3-5491f6f32a4e";
        this.testPostURL = "http://server.abalobi.info/api/testpost";
    }
    return Secrets;
}());

//# sourceMappingURL=secrets.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonalInfoClass; });
var PersonalInfoClass = /** @class */ (function () {
    function PersonalInfoClass() {
        this.personal_surname = "";
        this.personal_firstname = "";
        this.personal_nickname = "";
        this.personal_gender = "";
        this.personal_IDnum = "";
        this.personal_cellNo = "";
        this.personal_password1 = "";
        this.personal_password2 = "";
    }
    return PersonalInfoClass;
}());

//# sourceMappingURL=personal_info_class.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__marketplace_home_marketplace_home__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fisher_role_fisher_role__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import {Device} from "@ionic-native/device";
var HomePage = /** @class */ (function () {
    //device:Device = new Device();
    function HomePage(loadingCtrl, navCtrl) {
        //document.addEventListener("deviceready", this.onDeviceReady(this.device), false);
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.onSelectFisherRegistration = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__fisher_role_fisher_role__["a" /* FisherRolePage */]);
    };
    HomePage.prototype.onSelectMarketplaceRegistration = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__marketplace_home_marketplace_home__["a" /* MarketplaceHome */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/home/home.html"*/'<ion-header>\n        <ion-navbar>\n              <ion-title>\n                Abalobi Register\n              </ion-title>\n        </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding="true"  padding id="page1">\n  <img id="banner-img" src="https://res.cloudinary.com/techairos/image/upload/v1523889571/QR_app_Banner_ylefpe.png" style="display:block;width:100%;height:auto;margin-left:auto;margin-right:auto;">\n  <button ion-button full (click)="onSelectFisherRegistration()">Register As A Fisher</button>\n    <br>\n  <button ion-button full  (click)="onSelectMarketplaceRegistration()">Register For Marketplace</button>\n</ion-content>\n\n\n\n\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}()); //end class homepage

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarketplaceHome; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_MarketplaceService__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__after_register_after_register__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(42);
/**
 * Generated class for the MarketplaceHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MarketplaceHome = /** @class */ (function () {
    function MarketplaceHome(loadingCtrl, marketplaceService, navCtrl, http, zone) {
        this.loadingCtrl = loadingCtrl;
        this.marketplaceService = marketplaceService;
        this.navCtrl = navCtrl;
        this.http = http;
        this.zone = zone;
        this.loaderShowing = false;
        this.captchaPassed = false;
    }
    // called from the UI when the register button has been clicked
    MarketplaceHome.prototype.registerBtnClick = function () {
        var _this = this;
        // validate the user's input
        this.validate().then(function () {
            // validate the captcha
            return _this.validateCaptcha();
        }).then(function () {
            // after validation -> attempt to register the user
            _this.showLoader('Submitting your details');
            return _this.register();
        }).then(function () {
            // on succesful registration -> alert the user
            alert("You have successfully been registered with ABALOBI Marketplace");
            // clear fields
            _this.email = null;
            _this.password = null;
            _this.repeat_password = null;
            _this.name = null;
            _this.surname = null;
            _this.cell_number = null;
            _this.name_of_establishment = null;
            _this.company_details = null;
            _this.extra_email_1 = null;
            _this.extra_email_2 = null;
            _this.extra_email_3 = null;
            _this.extra_email_4 = null;
            _this.extra_email_5 = null;
            // navigate to the successful sign up page
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__after_register_after_register__["a" /* AfterRegisterPage */]);
            _this.dismissLoader();
        }).catch(function (error) {
            // alert the user to any errors that may have occurred
            alert(error);
            _this.dismissLoader();
        });
    };
    MarketplaceHome.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    MarketplaceHome.prototype.validateCaptcha = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.captchaPassed) {
                reject("Please tick the \"I'm not a robot\" box at the bottom");
            }
            else {
                var data = {
                    captchaResponse: _this.captchaResponse
                };
                _this.http.post('http://server.abalobi.info:8080/api/users/recaptcha', data).toPromise().then(function (res) {
                    resolve();
                }, function (error) {
                    console.log("Got error");
                    reject("Failed validating reCAPTCHA with server. Please try refreshing page");
                });
            }
        });
    };
    // validates the user on the client and server side to ensure that they can be registered
    MarketplaceHome.prototype.validate = function () {
        // if (!this.validateCaptcha())
        //   return Promise.reject("Failed validating captcha.  Please try refreshing page");
        var _this = this;
        return new Promise(function (resolve, reject) {
            // check that all fields are filled in
            if (!(_this.email && _this.password && _this.name && _this.surname && _this.cell_number && _this.name_of_establishment && _this.company_details)) {
                reject("Please fill in all the fields");
            }
            // Validate e-mail address(es)
            if (!_this.validateEmail(_this.email)) {
                reject("Please use a valid e-mail address");
            }
            if (_this.extra_email_1) {
                if (!_this.validateEmail(_this.extra_email_1)) {
                    reject("Please use a valid e-mail address for notifications e-mail 1");
                }
            }
            if (_this.extra_email_2) {
                if (!_this.validateEmail(_this.extra_email_2)) {
                    reject("Please use a valid e-mail address for notifications e-mail 2");
                }
            }
            if (_this.extra_email_3) {
                if (!_this.validateEmail(_this.extra_email_3)) {
                    reject("Please use a valid e-mail address for notifications e-mail 3");
                }
            }
            if (_this.extra_email_4) {
                if (!_this.validateEmail(_this.extra_email_4)) {
                    reject("Please use a valid e-mail address for notifications e-mail 4");
                }
            }
            if (_this.extra_email_5) {
                if (!_this.validateEmail(_this.extra_email_5)) {
                    reject("Please use a valid e-mail address for notifications e-mail 5");
                }
            }
            // check that the passwords match
            if (_this.password !== _this.repeat_password) {
                reject("The passwords you have entered do not match");
            }
            // rudimentarily check that the cell number is valid
            if (_this.cell_number.length !== 10 || isNaN(parseFloat(_this.cell_number))) {
                reject("Please enter a valid phone number. Phone numbers should contain 10 digits. Only South African numbers are allowed at present. Example: 0821234567");
            }
            // check that the user does not already exist
            _this.marketplaceService.checkIfUserAlreadyExists(_this.email).then(function (user) {
                "";
                if (user[0]) {
                    reject("This username is already taken");
                }
                else {
                    resolve();
                }
            }).catch(function (error) {
                console.log(error);
                // alert(error);
            });
        }).catch(function (error) {
            return Promise.reject(error);
        });
    };
    // attempts to register the user on the marketplace
    MarketplaceHome.prototype.register = function () {
        var user = {
            username: this.email,
            password: this.password,
            firstname: this.name,
            lastname: this.surname,
            h2c_buyer_company: this.name_of_establishment,
            buyer_details: this.company_details.split("\n"),
            sellerEnabled: false,
            abalobiId: null,
            cell_number: this.cell_number,
            approved: false,
            buyer_notifications: {
                extra_invoice_1: this.extra_email_1,
                extra_invoice_2: this.extra_email_2,
                extra_qr_1: this.extra_email_3,
                extra_qr_2: this.extra_email_4,
                extra_qr_3: this.extra_email_5
            }
        };
        return this.marketplaceService.registerUser(user).then(function () {
            return Promise.resolve();
        }).catch(function (error) {
            return Promise.reject(error);
        });
    };
    MarketplaceHome.prototype.showLoader = function (msg) {
        this.loading = this.loadingCtrl.create({
            content: msg
        });
        this.loading.present();
        this.loaderShowing = true;
    };
    MarketplaceHome.prototype.dismissLoader = function () {
        if (this.loaderShowing) {
            this.loading.dismiss();
            this.loaderShowing = false;
        }
    };
    MarketplaceHome.prototype.captchaResolved = function (response) {
        var _this = this;
        console.log("captchaResolved");
        console.log(response);
        this.zone.run(function () {
            // If the recaptcha expired then reset the state
            if (response) {
                _this.captchaPassed = true;
            }
            else {
                _this.captchaPassed = false;
            }
            _this.captchaResponse = response;
        });
    };
    MarketplaceHome = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-marketplace-home',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/marketplace-home/marketplace-home.html"*/'<!--\n  Generated template for the MarketplaceHomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Register for ABALOBI Marketplace\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding id="page1">\n  <img id="banner-img" src="https://res.cloudinary.com/techairos/image/upload/v1523889571/QR_app_Banner_ylefpe.png" style="display:block;width:100%;height:auto;margin-left:auto;margin-right:auto;" />\n\n  <form id="page-form1">\n    <div id="page-markdown1" class="show-list-numbers-and-dots">\n      <p id="header-text" style="color:#000000;">\n        Complete this form if you&#39;d like to be able to\n        <strong>\n          BUY seafood\n        </strong>\n        using the ABALOBI Marketplace app\n      </p>\n      <hr>\n\n      <p>\n        Thank you for your interest in sourcing traceable, storied seafood by empowered small-scale fishers!\n      </p>\n\n      <p>\n        Use of the Marketplace app is not (yet) open to the general public - our group of users is being grown with\n        hand-picked restaurants and chefs who understand and buy into what we\'re trying to achieve through ABALOBI.\n      </p>\n\n      <p>\n        If you feel that you fit the bill and are keen to become (or already are) an ambassador for traceable, storied\n        seafood by empowered small-scale fishers, then please register here and send a short motivation to\n        <a href="mailto:hello@abalobi.org">hello@abalobi.org</a> - we\'d love to hear more about your enterprise.\n      </p>\n    </div>\n\n\n\n    <ion-item-divider color="light" id="page-list-item-divider1">\n      Login Details\n    </ion-item-divider>\n\n    <ion-item id="page-input2">\n      <ion-label>\n        Email\n      </ion-label>\n      <ion-input [(ngModel)]="email" name="email" type="email" placeholder="e.g. jsmith@gmail.com" [email]="true"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input3">\n      <ion-label>\n        Password\n      </ion-label>\n      <ion-input [(ngModel)]="password" name="password" type="password" placeholder=""></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input4">\n      <ion-label>\n        Repeat Password\n      </ion-label>\n      <ion-input [(ngModel)]="repeat_password" name="repeat_password" type="password" placeholder=""></ion-input>\n    </ion-item>\n  </form>\n\n\n\n\n\n  <form id="page-form3">\n    <ion-item-divider color="light" id="page-list-item-divider3">\n      Your Details\n    </ion-item-divider>\n\n    <ion-item id="page-input8">\n      <ion-label>\n        Name\n      </ion-label>\n      <ion-input [(ngModel)]="name" name="name" type="text" placeholder="e.g. John"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input9">\n      <ion-label>\n        Surname\n      </ion-label>\n      <ion-input [(ngModel)]="surname" name="surname" type="text" placeholder="e.g. Smith"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input10">\n      <ion-label>\n        Cell Number\n      </ion-label>\n      <ion-input [(ngModel)]="cell_number" name="cell_number" type="tel" placeholder="e.g. 0821234567"></ion-input>\n    </ion-item>\n  </form>\n\n\n\n\n  <form id="page-form5">\n    <ion-item-divider color="light" id="page-list-item-divider5">\n      Your Company\n    </ion-item-divider>\n\n    <ion-item id="page-input14">\n      <ion-label stacked>\n        Name of establishment\n      </ion-label>\n      <ion-input [(ngModel)]="name_of_establishment" name="name_of_establishment" type="text" placeholder="The name shown to the client"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input15">\n      <ion-label stacked>\n        Company details (multiple lines allowed)\n      </ion-label>\n      <ion-textarea [(ngModel)]="company_details" name="company_details" type="text" placeholder="What you want printed on the invoices"></ion-textarea>>\n    </ion-item>\n    <!--<div id="page-container1"></div>-->\n    <!--<button id="page-button1" (click)="registerBtnClick()" ion-button color="positive" block>-->\n    <!--Register-->\n    <!--</button>-->\n  </form>\n\n\n\n  <form id="page-form6">\n    <ion-item-divider color="light" id="page-list-item-divider6">\n      Notifications\n    </ion-item-divider>\n\n    <div>Invoices and QR codes are sent to you by e-mail. Please list any others who should receive these too (e.g.\n      finance department, floor manager etc.) The QR codes are for printing and displaying to restaurant patrons -\n      they scan these to view the HookToCook page for the seafood. New QR codes are provided with each purchase from\n      ABALOBI Marketplace.\n    </div>\n\n\n    <ion-item id="page-input16">\n      <ion-label stacked>\n        Also e-mail invoices and QR codes to\n      </ion-label>\n      <ion-input [(ngModel)]="extra_email_1" name="extra_email_1" type="email" placeholder="Optional" [email]="true"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input17">\n      <ion-label stacked>\n        Also e-mail invoices and QR codes to\n      </ion-label>\n      <ion-input [(ngModel)]="extra_email_2" name="extra_email_2" type="email" placeholder="Optional" [email]="true"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input18">\n      <ion-label stacked>\n        Also e-mail QR codes to\n      </ion-label>\n      <ion-input [(ngModel)]="extra_email_3" name="extra_email_3" type="email" placeholder="Optional" [email]="true"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input19">\n      <ion-label stacked>\n        Also e-mail QR codes to\n      </ion-label>\n      <ion-input [(ngModel)]="extra_email_4" name="extra_email_4" type="email" placeholder="Optional" [email]="true"></ion-input>\n    </ion-item>\n\n    <ion-item id="page-input20">\n      <ion-label stacked>\n        Also e-mail QR codes to\n      </ion-label>\n      <ion-input [(ngModel)]="extra_email_5" name="extra_email_5" type="email" placeholder="Optional" [email]="true"></ion-input>\n    </ion-item>\n\n    <re-captcha (resolved)="captchaResolved($event)" siteKey="6LdWBF4UAAAAAK8gVGD8yWcTbHsNaNEFtnFMJUU3"></re-captcha>\n    <div id="page-container1"></div>\n\n    <button id="page-button1" (click)="registerBtnClick()" ion-button color="positive" block>\n      Register\n    </button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/marketplace-home/marketplace-home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_MarketplaceService__["a" /* MarketplaceService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], MarketplaceHome);
    return MarketplaceHome;
}());

//# sourceMappingURL=marketplace-home.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarketplaceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secrets__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MarketplaceService = /** @class */ (function () {
    function MarketplaceService(http) {
        this.http = http;
        this.secrets = new __WEBPACK_IMPORTED_MODULE_2__secrets__["a" /* Secrets */]();
    }
    MarketplaceService.prototype.checkIfUserAlreadyExists = function (username) {
        return this.http.get(this.secrets.marketplaceCheckUserURL + username).toPromise();
    };
    MarketplaceService.prototype.registerUser = function (user) {
        return this.http.post(this.secrets.marketplaceAddUserURL, user).toPromise();
    };
    MarketplaceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], MarketplaceService);
    return MarketplaceService;
}());

//# sourceMappingURL=MarketplaceService.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(235);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng_recaptcha__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng_recaptcha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng_recaptcha__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_fisher_community_fisher_community__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_fisher_confirm_fisher_confirm__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_fisher_personal_fisher_personal__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_fisher_role_fisher_role__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_fisher_useterms_fisher_useterms__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_marketplace_home_marketplace_home__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_after_register_after_register__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_MarketplaceService__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_FisherService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__classes_registree_class__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__classes_confirm_password_validator_directive__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Modules







//Development

//Common landing page

//Fisher registration pages





//Marketplace registration pages


//Imported services




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_fisher_community_fisher_community__["a" /* FisherCommunityPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_fisher_confirm_fisher_confirm__["a" /* FisherConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_fisher_personal_fisher_personal__["a" /* FisherPersonalPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_fisher_role_fisher_role__["a" /* FisherRolePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_fisher_useterms_fisher_useterms__["a" /* FisherUsetermsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_marketplace_home_marketplace_home__["a" /* MarketplaceHome */],
                __WEBPACK_IMPORTED_MODULE_15__pages_after_register_after_register__["a" /* AfterRegisterPage */],
                __WEBPACK_IMPORTED_MODULE_19__classes_confirm_password_validator_directive__["a" /* confirmEqualValidatorsDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/fisher-community/fisher-community.module#FisherCommunityPageModule', name: 'FisherCommunityPage', segment: 'fisher-community', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fisher-confirm/fisher-confirm.module#FisherConfirmPageModule', name: 'FisherConfirmPage', segment: 'fisher-confirm', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fisher-useterms/fisher-useterms.module#FisherUsetermsPageModule', name: 'FisherUsetermsPage', segment: 'fisher-useterms', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fisher-personal/fisher-personal.module#FisherPersonalPageModule', name: 'FisherPersonalPage', segment: 'fisher-personal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fisher-role/fisher-role.module#FisherRolePageModule', name: 'FisherRolePage', segment: 'fisher-role', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_1_ng_recaptcha__["RecaptchaModule"].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_fisher_community_fisher_community__["a" /* FisherCommunityPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_fisher_confirm_fisher_confirm__["a" /* FisherConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_fisher_personal_fisher_personal__["a" /* FisherPersonalPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_fisher_role_fisher_role__["a" /* FisherRolePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_fisher_useterms_fisher_useterms__["a" /* FisherUsetermsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_marketplace_home_marketplace_home__["a" /* MarketplaceHome */],
                __WEBPACK_IMPORTED_MODULE_15__pages_after_register_after_register__["a" /* AfterRegisterPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_16__providers_MarketplaceService__["a" /* MarketplaceService */],
                __WEBPACK_IMPORTED_MODULE_17__providers_FisherService__["a" /* FisherService */],
                __WEBPACK_IMPORTED_MODULE_18__classes_registree_class__["a" /* Registree */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Fisher; });
//import {Device} from "@ionic-native/device";
var Fisher = /** @class */ (function () {
    function Fisher() {
        //Required
        this.preferred_language = "English";
        this.filter = "abalobi_registration";
        //Might be required
        this.landingsite_custom = "";
        /*this.app_version            =   "";
        this.device_version         =   this.device.version;
        this.device_uuid            =   this.device.uuid;
        this.device_model           =   this.device.model;
        this.device_manufacturer    =   this.device.manufacturer;
        this.device_platform        =   this.device.platform;
        this.device_serial          =   this.device.serial;
        this.birth_date             =   "";*/
        this.uuid_timestamp = "2018-07-06T14:37:30.684Z"; // place temporary value for now until timestamp is implemented
    }
    return Fisher;
}());

//# sourceMappingURL=fisher-class.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunityInfoClass; });
var CommunityInfoClass = /** @class */ (function () {
    function CommunityInfoClass() {
        this.comm_province = "";
        this.comm_community = "";
        this.custom_community = "";
        this.comm_not_listed = false;
        this.comm_IRP_chosen = false;
        this.comm_commercial_chosen = false;
        this.comm_recreational_chosen = false;
        this.comm_other_chosen = false;
    }
    return CommunityInfoClass;
}());

//# sourceMappingURL=community_info_class.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunityClass; });
var CommunityClass = /** @class */ (function () {
    function CommunityClass(inputName, inputProv, inputID) {
        this.name_eng = inputName;
        this.province_abbrev = inputProv;
        this.unique_ext_id = inputID;
    } //end constructor
    return CommunityClass;
}()); //end class

//# sourceMappingURL=community_class.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FisherUsetermsClass; });
var FisherUsetermsClass = /** @class */ (function () {
    function FisherUsetermsClass() {
        this.terms_assistant_agreed = false;
        this.terms_DAFF_agreed = false;
        this.terms_use_agreed = false;
    }
    return FisherUsetermsClass;
}());

//# sourceMappingURL=fisher-useterms_class.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return confirmEqualValidatorsDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var confirmEqualValidatorsDirective = /** @class */ (function () {
    function confirmEqualValidatorsDirective() {
    }
    confirmEqualValidatorsDirective_1 = confirmEqualValidatorsDirective;
    confirmEqualValidatorsDirective.prototype.validate = function (control) {
        var controlToCompare = control.parent.get(this.appConfirmEqualValidator);
        if (controlToCompare && controlToCompare.value !== control.value) {
            return { 'notEqual': true };
        }
        return null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], confirmEqualValidatorsDirective.prototype, "appConfirmEqualValidator", void 0);
    confirmEqualValidatorsDirective = confirmEqualValidatorsDirective_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
            selector: '[appConfirmEqualValidator]',
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* NG_VALIDATORS */],
                    useExisting: confirmEqualValidatorsDirective_1,
                    multi: true
                }]
        })
    ], confirmEqualValidatorsDirective);
    return confirmEqualValidatorsDirective;
    var confirmEqualValidatorsDirective_1;
}());

//# sourceMappingURL=confirm-password-validator-directive.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FisherService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_registree_class__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_fisher_class__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__secrets__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Imported non-page classes



var FisherService = /** @class */ (function () {
    function FisherService(http, registree) {
        this.http = http;
        this.registree = registree;
        this.secrets = new __WEBPACK_IMPORTED_MODULE_4__secrets__["a" /* Secrets */]();
    }
    FisherService.prototype.fisherUpdateRole = function (role_info) {
        this.registree.role = role_info;
    };
    FisherService.prototype.fisherUpdateTerms = function (terms_status) {
        this.registree.terms_agreed = terms_status.terms_use_agreed;
        this.registree.assistant_agreed = terms_status.terms_assistant_agreed;
        this.registree.DAFF_agreed = terms_status.terms_DAFF_agreed;
    };
    FisherService.prototype.fisherUpdatePersonal = function (personal_info) {
        this.registree.surname = personal_info.personal_surname;
        this.registree.firstname = personal_info.personal_firstname;
        this.registree.nickname = personal_info.personal_nickname;
        this.registree.gender = personal_info.personal_gender;
        this.registree.IDnum = personal_info.personal_IDnum;
        this.registree.cellNo = personal_info.personal_cellNo;
        this.registree.password = personal_info.personal_password1; //only use one copy of the 2 identical passwords
    };
    FisherService.prototype.fisherUpdateCommunity = function (community_info) {
        this.registree.province = community_info.comm_province;
        this.registree.community = community_info.comm_community;
        this.registree.custom_community = community_info.custom_community;
        this.registree.comm_not_listed = community_info.comm_not_listed;
        this.registree.IRP_selected = community_info.comm_IRP_chosen;
        this.registree.commercial_selected = community_info.comm_commercial_chosen;
        this.registree.recreational_selected = community_info.comm_recreational_chosen;
        this.registree.other_seleted = community_info.comm_other_chosen;
    };
    //Attempt to register the fisher
    FisherService.prototype.fisherSubmitRegistration = function () {
        var fisher = new __WEBPACK_IMPORTED_MODULE_3__classes_fisher_class__["a" /* Fisher */]();
        this.parseFisher(fisher);
        console.log("This fisher has been created");
        console.log(fisher);
        //Attempt a better implementation of registration
        this.checkIfFisherAlreadyExists(fisher.id) //first promise check if the ID number has already been taken
            .then(function (response) {
            alert(JSON.stringify(response));
            //alert('ID number already exists');
        })
            .catch(function (error) {
            alert(JSON.stringify(error));
            //Go ahead and attempt to register unique fisher
            /* alert('ID number is unique');
             this.registerFisher(fisher)//upon success i.e. second promise attempts to register user
                 .then ((reply)=> {
                     alert('User registration successful');
                 })
                 .catch( ()=>{//failure to register , but ID is unique
                     alert('User registration failed');
                 })*/
        });
        //The implementation below works but has the issue that the registration is executed in an error clause of the first promise
        /*this.checkIfFisherAlreadyExists(fisher.id)//first promise check if the ID number has already been taken
           .then((response)=>{//ID found, not unique
               alert('ID number already exists');
           })
            .catch(()=>{//ID number is unique

                //Go ahead and attempt to register unique fisher
                alert('ID number is unique');
                this.registerFisher(fisher)//upon success i.e. second promise attempts to register user
                    .then ((reply)=> {
                        alert('User registration successful');
                    })
                    .catch( ()=>{//failure to register , but ID is unique
                        alert('User registration failed');
                    })
            })*/
        this.fisherClearDetails(); //clear the recently entered details(confirm page will push a blank white page thereafter
    }; //end SubmitRegistration
    //parse fisher data to a format congruent to what the backend expects
    FisherService.prototype.parseFisher = function (fisher) {
        fisher.name = this.registree.firstname;
        fisher.surname = this.registree.surname;
        fisher.nickname = this.registree.nickname;
        fisher.password = this.registree.password;
        fisher.cell = this.registree.cellNo;
        fisher.gender = this.registree.gender;
        fisher.id = this.registree.IDnum;
        fisher.usertype = this.registree.role;
        fisher.landingsite = this.registree.community;
        fisher.landingsite_custom = this.registree.custom_community;
        fisher.fisher_license_irp = this.registree.IRP_selected;
        fisher.fisher_license_recreational = this.registree.recreational_selected;
        fisher.permission_local_implementer = this.registree.assistant_agreed;
        fisher.permission_daff = this.registree.DAFF_agreed;
    };
    //Clear the recently entered fisher info
    FisherService.prototype.fisherClearDetails = function () {
        //Reset the registree fields after attempted registration
        //Role details
        this.registree.role = "";
        //Terms of use details
        this.registree.terms_agreed = false;
        this.registree.assistant_agreed = false;
        this.registree.DAFF_agreed = false;
        //Personal details
        this.registree.surname = "";
        this.registree.firstname = "";
        this.registree.nickname = "";
        this.registree.gender = "";
        this.registree.IDnum = "";
        this.registree.cellNo = "";
        this.registree.password = "";
        //Community details
        this.registree.province = "";
        this.registree.community = "";
        this.registree.custom_community = "";
        this.registree.comm_not_listed = false;
        this.registree.IRP_selected = false;
        this.registree.commercial_selected = false;
        this.registree.recreational_selected = false;
        this.registree.other_seleted = false;
        console.log("........Fisher Service Cleared User Details........");
    };
    //Check if fisher with the proposed ID doesn't exist already
    FisherService.prototype.checkIfFisherAlreadyExists = function (ID) {
        return this.http.get(this.secrets.fisherCheckUserIDurl + ID).toPromise();
    };
    //Go ahead and actually try to register the fisher
    FisherService.prototype.registerFisher = function (fisher) {
        console.log("Posting fisher registration");
        return this.http.post(this.secrets.fisherAddUserURL, fisher).toPromise();
    };
    FisherService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__classes_registree_class__["a" /* Registree */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__classes_registree_class__["a" /* Registree */]) === "function" && _b || Object])
    ], FisherService);
    return FisherService;
    var _a, _b;
}()); //end class

//# sourceMappingURL=FisherService.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AfterRegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AfterRegisterPage = /** @class */ (function () {
    function AfterRegisterPage() {
    }
    AfterRegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'after-register',template:/*ion-inline-start:"/Users/techairos/JOSHUA_WORK/register/src/pages/after-register/after-register.html"*/'<!--ion-header>\n  <ion-navbar>\n    <ion-title>\n      Registered for ABALOBI Marketplace\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content> <strong><p>Thank you for joining ABALOBI Marketplace!</p></strong>\n  <p>An ABALOBI team member will approve your registration and you will receive an e-mail letting you know you are activated. If you don\'t receive an e-mail within 1 business day please contact ABALOBI Support on 082 366 0270</p>\n  <a href="https://play.google.com/store/apps/details?id=com.abalobi.marketplace">\n    <button ion-button color="positive" block>\n      Download ABALOBI Marketplace\n    </button>\n  </a>\n  <a href="http://abalobi.info/"><button ion-button color="positive" block>\n    ABALOBI Website\n  </button></a>\n</ion-content-->\n'/*ion-inline-end:"/Users/techairos/JOSHUA_WORK/register/src/pages/after-register/after-register.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], AfterRegisterPage);
    return AfterRegisterPage;
}());

//# sourceMappingURL=after-register.js.map

/***/ })

},[215]);
//# sourceMappingURL=main.js.map