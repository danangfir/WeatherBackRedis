"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherModule = void 0;
const common_1 = require("@nestjs/common");
const weather_service_1 = require("./weather.service");
const weather_controller_1 = require("./weather.controller");
const cache_module_1 = require("../cache/cache.module");
const axios_1 = require("@nestjs/axios");
let WeatherModule = class WeatherModule {
};
WeatherModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, cache_module_1.CacheModule],
        providers: [weather_service_1.WeatherService],
        controllers: [weather_controller_1.WeatherController],
    })
], WeatherModule);
exports.WeatherModule = WeatherModule;
