var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { AssetService } from "../../services/asset.service";
import { CountryService } from "../../services/countries-api";
import { autoinject } from "aurelia-framework";
import { ValidationControllerFactory, ValidationRules, } from "aurelia-validation";
import { DialogService } from "aurelia-dialog";
import { BootstrapFormRenderer } from "../bootstrap/bootstrap-form-renderer";
import { Prompt } from "../dialog/modals/my-modal";
import { Router } from "aurelia-router";
var Asset = (function () {
    function Asset(controllerFactory, dialogService, router, assetService, countryService) {
        this.assetService = assetService;
        this.countryService = countryService;
        this.assetName = "";
        this.departments = [
            { id: 0, name: "HQ" },
            { id: 1, name: "Store1" },
            { id: 2, name: "Store2" },
            { id: 3, name: "Store3" },
            { id: 4, name: "MaintenanceStation" },
        ];
        this.countries = [];
        this.countryOfDepartment = "";
        this.emailAddressOfDepartment = "";
        this.selectedDepartmentId = "";
        this.selectedCountryName = "";
        this.purchaseDate = "";
        this.broken = false;
        this.enableDisabledButton = false;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
        this.dialogService = dialogService;
        this.enableDisabledButton = true;
        this.router = router;
        ValidationRules.ensure(function (a) { return a.assetName; })
            .required()
            .minLength(5)
            .ensure(function (a) { return a.emailAddressOfDepartment; })
            .required()
            .email()
            .ensure(function (a) { return a.countryOfDepartment; })
            .required()
            .on(Asset_1);
    }
    Asset_1 = Asset;
    Asset.prototype.activate = function () {
        var _this = this;
        this.countryService.getCountries().then(function (data) {
            _this.countries = __spread(data);
        });
    };
    Asset.prototype.submit = function () {
        var _this = this;
        var asset = {
            assetName: this.assetName,
            department: this.selectedDepartmentId,
            emailAddressOfDepartment: this.emailAddressOfDepartment,
            purchaseDate: new Date(this.purchaseDate).toUTCString(),
            broken: this.broken,
            countryOfDepartment: this.selectedCountryName,
        };
        if (new Date(this.purchaseDate).toUTCString() === "Invalid Date") {
            this.openModal({
                errors: ["Purchase date is invalid"],
                title: "ERROR",
                reset: false,
            });
        }
        if (this.departments[this.selectedDepartmentId] == undefined) {
            this.openModal({
                errors: ["You have not selected a department"],
                title: "ERROR",
                reset: false,
            });
        }
        else {
            this.assetService.addAsset(asset).then(function (res) {
                if (res) {
                    _this.router.navigate("confirmation");
                }
            });
        }
    };
    Asset.prototype.activateResetButton = function () {
        var lengthOfStrings = [this.assetName, this.emailAddressOfDepartment];
        var noEmptyStrings = lengthOfStrings.every(function (s) { return s.length > 0; });
        if (noEmptyStrings) {
            this.enableDisabledButton = false;
        }
        else {
            this.enableDisabledButton = true;
        }
    };
    Asset.prototype.openModal = function (model) {
        var _this = this;
        this.dialogService
            .open({ viewModel: Prompt, model: model, lock: false })
            .whenClosed(function (response) {
            if (!response.wasCancelled) {
                if (model.reset) {
                    _this.assetName = "";
                    _this.emailAddressOfDepartment = "";
                    _this.selectedDepartmentId = "";
                    _this.countryOfDepartment = "";
                    _this.enableDisabledButton = true;
                }
                console.log("good");
            }
            else {
                console.log("bad");
            }
            console.log(response.output);
        });
    };
    Asset.prototype.reset = function () {
        this.openModal({
            errors: ["Are you sure ?"],
            title: "MESSAGE",
            reset: true,
        });
    };
    var Asset_1;
    Asset = Asset_1 = __decorate([
        autoinject,
        __metadata("design:paramtypes", [ValidationControllerFactory,
            DialogService,
            Router,
            AssetService,
            CountryService])
    ], Asset);
    return Asset;
}());
export { Asset };
//# sourceMappingURL=asset.js.map