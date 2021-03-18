var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { ValidationController } from 'aurelia-validation';
import { ValidationControllerFactory } from 'aurelia-validation';
var BootstrapFormRenderer = (function () {
    function BootstrapFormRenderer() {
    }
    BootstrapFormRenderer.prototype.render = function (instruction) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        try {
            for (var _e = __values(instruction.unrender), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = _f.value, result = _g.result, elements = _g.elements;
                try {
                    for (var elements_1 = (e_2 = void 0, __values(elements)), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                        var element = elements_1_1.value;
                        this.remove(element, result);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (elements_1_1 && !elements_1_1.done && (_b = elements_1.return)) _b.call(elements_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _h = __values(instruction.render), _j = _h.next(); !_j.done; _j = _h.next()) {
                var _k = _j.value, result = _k.result, elements = _k.elements;
                try {
                    for (var elements_2 = (e_4 = void 0, __values(elements)), elements_2_1 = elements_2.next(); !elements_2_1.done; elements_2_1 = elements_2.next()) {
                        var element = elements_2_1.value;
                        this.add(element, result);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (elements_2_1 && !elements_2_1.done && (_d = elements_2.return)) _d.call(elements_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    BootstrapFormRenderer.prototype.add = function (element, result) {
        if (result.valid) {
            return;
        }
        element.classList.add('is-invalid');
        var formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }
        var message = document.createElement('div');
        message.className = 'invalid-feedback';
        message.textContent = result.message;
        message.id = "validation-message-" + result.id;
        formGroup.appendChild(message);
        return;
    };
    BootstrapFormRenderer.prototype.remove = function (element, result) {
        if (result.valid) {
            return;
        }
        var formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }
        var message = formGroup.querySelector("#validation-message-" + result.id);
        if (message) {
            formGroup.removeChild(message);
            if (formGroup.querySelectorAll('.invalid-feedback').length === 0) {
                element.classList.remove('is-invalid');
            }
        }
        return;
    };
    return BootstrapFormRenderer;
}());
export { BootstrapFormRenderer };
var BootstrapValidationControllerFactory = (function (_super) {
    __extends(BootstrapValidationControllerFactory, _super);
    function BootstrapValidationControllerFactory(container) {
        return _super.call(this, container) || this;
    }
    BootstrapValidationControllerFactory.get = function (container) {
        return new BootstrapValidationControllerFactory(container);
    };
    BootstrapValidationControllerFactory.prototype.createForCurrentScope = function () {
        var ctrl = _super.prototype.createForCurrentScope.call(this);
        ctrl.addRenderer(new BootstrapFormRenderer());
        return ctrl;
    };
    return BootstrapValidationControllerFactory;
}(ValidationControllerFactory));
export { BootstrapValidationControllerFactory };
var BootstrapValidationController = (function (_super) {
    __extends(BootstrapValidationController, _super);
    function BootstrapValidationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootstrapValidationController.get = function (container) {
        return new BootstrapValidationControllerFactory(container).createForCurrentScope();
    };
    return BootstrapValidationController;
}(ValidationController));
export { BootstrapValidationController };
BootstrapValidationController['protocol:aurelia:resolver'] = true;
//# sourceMappingURL=bootstrap-form-renderer.js.map