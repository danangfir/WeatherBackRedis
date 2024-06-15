import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [WeatherModule, CacheModule],
})
export class AppModule {}
