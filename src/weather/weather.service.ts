import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class WeatherService {
  private readonly WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-5&longitude=120&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation&timezone=Asia%2FSingapore';

  constructor(private readonly httpService: HttpService, private readonly cacheService: CacheService) {}

  async getWeather(city: string): Promise<any> {
    const cacheKey = `weather:${city}`;
    const cachedWeather = await this.cacheService.get(cacheKey);

    if (cachedWeather) {
      return JSON.parse(cachedWeather);
    }

    console.log(`Requesting weather for city: ${city}`);
    const response = await this.httpService.get(this.WEATHER_API_URL).toPromise();

    if (!response?.data) {
      throw new HttpException('No data received from weather API', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const weatherData = response.data;
    console.log('Weather data received:', weatherData);

    await this.cacheService.set(cacheKey, JSON.stringify(weatherData), 3600); // cache for 1 hour

    return weatherData;
  }
}
