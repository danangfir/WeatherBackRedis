"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../cache/cache.service");
const axios_1 = require("@nestjs/axios");
let WeatherService = class WeatherService {
    constructor(httpService, cacheService) {
        this.httpService = httpService;
        this.cacheService = cacheService;
        this.WEATHER_API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Indonesia?unitGroup=metric&key=HM5UNTGZT3WR7B42FXLXLZ4FT&contentType=json';
        this.API_KEY = process.env.WEATHER_API_KEY;
    }
    async getWeather(city) {
        const cacheKey = `weather:${city}`;
        const cachedWeather = await this.cacheService.get(cacheKey);
        if (cachedWeather) {
            return JSON.parse(cachedWeather);
        }
        const response = await this.httpService.get(`${this.WEATHER_API_URL}?key=${this.API_KEY}&q=${city}`).toPromise();
        if (!response) {
            throw new Error('Failed to get weather data');
        }
        const weatherData = response.data;
        await this.cacheService.set(cacheKey, JSON.stringify(weatherData), 3600);
        return weatherData;
    }
};
WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, cache_service_1.CacheService])
], WeatherService);
exports.WeatherService = WeatherService;
