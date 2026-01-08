import { Module } from '@nestjs/common';
import { PropertController } from './property.controller';

@Module({
    controllers: [PropertController]
})
export class PropertyModule { }
