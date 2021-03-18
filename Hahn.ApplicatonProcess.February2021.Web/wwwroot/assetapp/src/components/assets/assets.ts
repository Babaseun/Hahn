import { AssetService } from "../../services/asset.service";
import { autoinject } from "aurelia-framework";
import { Prompt } from "components/dialog/modals/my-modal";
import { DialogService } from "aurelia-dialog";

@autoinject
export class Assets {
  private dialogService: DialogService;
  assets: any[];
  errorResponse: any;
  count: any;
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
  constructor(
    private assetService: AssetService,
    dialogService: DialogService
  ) {
    this.assetService = assetService;
    this.dialogService = dialogService;
    this.assets = [];
  }
  activate(): void {
    this.getAssets(1);
  }
  getAssets(page: number): Promise<void> {
    return this.assetService
      .getAssets(page)
      .then(({ data, count, perPage, pageNumber }) => {
        console.log(data);
        data?.forEach((element) => {
          element.canEdit = false;
          this.assets.push(element);
        });
        this.pagination(count, perPage, pageNumber);
      });
  }
  editAsset(asset): void {
    asset.canEdit = true;
  }
  async saveAsset(asset): Promise<void> {
    asset.canEdit = false;
    asset.broken = this.broken;

    const res = await this.assetService.updateAsset(asset);
    const data = await res.json();
    if (data.errors !== null) {
      data.errors?.forEach(({ propertyValue }: any) => {
        this.errorResponse.push(propertyValue);
      });

      this.openModal({
        errors: this.errorResponse,
        title: "ERROR",
        reset: false,
      });
    }
  }
  openModal(model): void {
    this.dialogService
      .open({ viewModel: Prompt, model: model, lock: false })
      .whenClosed((response: any) => {
        if (!response.wasCancelled) {
          console.log("good");
        } else {
          console.log("bad");
        }
        console.log(response.output);
      });
  }
  async deleteAsset({ id }): Promise<void> {
    this.assets = this.assets.filter((a) => a.id !== id);

    await this.assetService.deleteAsset(id);
  }
  paginatedButton(button): void {
    this.count.forEach((x) => {
      if (x.button === button.button) {
        x.status = !x.status;
      }
    });
    this.assets = [];
    this.getAssets(button.button);
    this.pagination(button.assetsCount, 6, button.button);
  }
  pagination(count: number, perPage: number, pageNumber: number): void {
    this.count = [];
    let j = 1;
    const counter = Math.floor(count / perPage);
    const remainingRecords = count % perPage;
    while (j <= counter) {
      const countButtonAttributes = {
        button: j,
        status: j === pageNumber ? true : false,
        assetsCount: count,
      };
      this.count.push(countButtonAttributes);
      j++;
    }
    if (remainingRecords !== 0) {
      const countButtonAttributes = {
        button: j,
        status: j === pageNumber ? true : false,
        assetsCount: count,
      };
      this.count.push(countButtonAttributes);
    }
  }
}
