var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { AssetService } from "../../services/asset.service";
import { autoinject } from "aurelia-framework";
import { Prompt } from "components/dialog/modals/my-modal";
import { DialogService } from "aurelia-dialog";
var Assets = (function () {
    function Assets(assetService, dialogService) {
        this.assetService = assetService;
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
        this.assetService = assetService;
        this.dialogService = dialogService;
        this.assets = [];
    }
    Assets.prototype.activate = function () {
        this.getAssets(1);
    };
    Assets.prototype.getAssets = function (page) {
        var _this = this;
        return this.assetService
            .getAssets(page)
            .then(function (_a) {
            var data = _a.data, count = _a.count, perPage = _a.perPage, pageNumber = _a.pageNumber;
            console.log(data);
            data === null || data === void 0 ? void 0 : data.forEach(function (element) {
                element.canEdit = false;
                _this.assets.push(element);
            });
            _this.pagination(count, perPage, pageNumber);
        });
    };
    Assets.prototype.editAsset = function (asset) {
        asset.canEdit = true;
    };
    Assets.prototype.saveAsset = function (asset) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asset.canEdit = false;
                        asset.broken = this.broken;
                        return [4, this.assetService.updateAsset(asset)];
                    case 1:
                        res = _b.sent();
                        return [4, res.json()];
                    case 2:
                        data = _b.sent();
                        if (data.errors !== null) {
                            (_a = data.errors) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
                                var propertyValue = _a.propertyValue;
                                _this.errorResponse.push(propertyValue);
                            });
                            this.openModal({
                                errors: this.errorResponse,
                                title: "ERROR",
                                reset: false,
                            });
                        }
                        return [2];
                }
            });
        });
    };
    Assets.prototype.openModal = function (model) {
        this.dialogService
            .open({ viewModel: Prompt, model: model, lock: false })
            .whenClosed(function (response) {
            if (!response.wasCancelled) {
                console.log("good");
            }
            else {
                console.log("bad");
            }
            console.log(response.output);
        });
    };
    Assets.prototype.deleteAsset = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.assets = this.assets.filter(function (a) { return a.id !== id; });
                        return [4, this.assetService.deleteAsset(id)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    Assets.prototype.paginatedButton = function (button) {
        this.count.forEach(function (x) {
            if (x.button === button.button) {
                x.status = !x.status;
            }
        });
        this.assets = [];
        this.getAssets(button.button);
        this.pagination(button.assetsCount, 6, button.button);
    };
    Assets.prototype.pagination = function (count, perPage, pageNumber) {
        this.count = [];
        var j = 1;
        var counter = Math.floor(count / perPage);
        var remainingRecords = count % perPage;
        while (j <= counter) {
            var countButtonAttributes = {
                button: j,
                status: j === pageNumber ? true : false,
                assetsCount: count,
            };
            this.count.push(countButtonAttributes);
            j++;
        }
        if (remainingRecords !== 0) {
            var countButtonAttributes = {
                button: j,
                status: j === pageNumber ? true : false,
                assetsCount: count,
            };
            this.count.push(countButtonAttributes);
        }
    };
    Assets = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AssetService,
            DialogService])
    ], Assets);
    return Assets;
}());
export { Assets };
//# sourceMappingURL=assets.js.map