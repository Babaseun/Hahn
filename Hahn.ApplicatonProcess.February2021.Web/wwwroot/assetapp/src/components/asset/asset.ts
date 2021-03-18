import { AssetService } from "../../services/asset.service";
import { CountryService } from "../../services/countries-api";
import { autoinject } from "aurelia-framework";
import {
  ValidationControllerFactory,
  ValidationRules,
} from "aurelia-validation";
import { DialogService } from "aurelia-dialog";
import { BootstrapFormRenderer } from "../bootstrap/bootstrap-form-renderer";
import { Prompt } from "../dialog/modals/my-modal";
import { Router } from "aurelia-router";

@autoinject
export class Asset {
  assetName = "";
  departments = [
    { id: 0, name: "HQ" },
    { id: 1, name: "Store1" },
    { id: 2, name: "Store2" },
    { id: 3, name: "Store3" },
    { id: 4, name: "MaintenanceStation" },
  ];
  countries = [];
  countryOfDepartment = "";
  emailAddressOfDepartment = "";
  selectedDepartmentId = "";
  selectedCountryName = "";
  purchaseDate = "";
  broken = false;
  dialogService: DialogService;
  enableDisabledButton = false;
  router: Router;
  controller: any;
  constructor(
    controllerFactory: ValidationControllerFactory,
    dialogService: DialogService,
    router: Router,
    private assetService: AssetService,
    private countryService: CountryService
  ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.dialogService = dialogService;
    this.enableDisabledButton = true;
    this.router = router;

    ValidationRules.ensure((a: Asset) => a.assetName)
      .required()
      .minLength(5)
      .ensure((a: Asset) => a.emailAddressOfDepartment)
      .required()
      .email()
      .ensure((a: Asset) => a.countryOfDepartment)
      .required()
      .on(Asset);
  }
  activate(): void {
    this.countryService.getCountries().then((data) => {
      this.countries = [...data];
      console.log("asset", data);
    });
  }
  submit(): void {
    const asset = {
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
    } else {
      this.assetService.addAsset(asset).then((res) => {
        if (res) {
          this.router.navigate("confirmation");
        }
      });
    }
  }

  activateResetButton(): void {
    const lengthOfStrings = [this.assetName, this.emailAddressOfDepartment];
    const noEmptyStrings = lengthOfStrings.every((s: string) => s.length > 0);
    if (noEmptyStrings) {
      this.enableDisabledButton = false;
    } else {
      this.enableDisabledButton = true;
    }
  }
  openModal(model): void {
    this.dialogService
      .open({ viewModel: Prompt, model: model, lock: false })
      .whenClosed((response) => {
        if (!response.wasCancelled) {
          if (model.reset) {
            this.assetName = "";
            this.emailAddressOfDepartment = "";
            this.selectedDepartmentId = "";
            this.countryOfDepartment = "";
            this.enableDisabledButton = true;
          }

          console.log("good");
        } else {
          console.log("bad");
        }
        console.log(response.output);
      });
  }

  reset(): void {
    this.openModal({
      errors: ["Are you sure ?"],
      title: "MESSAGE",
      reset: true,
    });
  }
}
