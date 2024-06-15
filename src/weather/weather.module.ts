import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { CacheModule } from '../cache/cache.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, CacheModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
