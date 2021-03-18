import { RouterConfiguration, Router } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
export class App {
  message = "Aurelia routing app";
  router!: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;

    config.map([
      {
        route: ["", "home"],
        name: "home",
        moduleId: PLATFORM.moduleName("components/home/home"),
        title: "Home",
      },
      {
        route: "confirmation",
        name: "confirmation",
        moduleId: PLATFORM.moduleName("components/confirmation/confirmation"),
        title: "confirmation",
      },
      {
        route: "asset",
        name: "asset",
        moduleId: PLATFORM.moduleName("components/asset/asset"),
        title: "asset",
      },
      {
        route: "assets",
        name: "assets",
        moduleId: PLATFORM.moduleName("components/assets/assets"),
        title: "assets",
      },
    ]);
  }
}
