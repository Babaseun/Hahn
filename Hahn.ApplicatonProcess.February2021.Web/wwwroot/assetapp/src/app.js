import { PLATFORM } from "aurelia-pal";
var App = (function () {
    function App() {
        this.message = "Aurelia routing app";
    }
    App.prototype.configureRouter = function (config, router) {
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
    };
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map