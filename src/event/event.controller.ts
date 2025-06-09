import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Throttle } from '@nestjs/throttler';

/**
 * 
 */
@ApiTags('event') // Tag for this controller
@Throttle({default: {limit: 100, ttl: 10000}})
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get()
    @ApiOperation({ summary: 'Оримати всі події' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    @ApiResponse({ status: 200, description: 'Список подій' })
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.eventService.findAllEvent(+page, +limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Оримати подію за ідентифікатором' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: 'Не знайдено' })
    async findById(@Param('id') id: string) {
        return await this.eventService.findEventById(+id)
    }

    @Post()
    @ApiOperation({ summary: 'Створити подію' })
    @ApiBody({ type: CreateEventDto })
    @ApiResponse({ status: 201, description: 'Подію створено' })
    async add(@Body() dto: CreateEventDto) {
        return await this.eventService.createEvent(dto);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Редагувати подію'})
    @ApiResponse({status: 200, description: 'Подію змінено'})
    @ApiResponse({status: 404, description: 'Немає події за цим id'})
    async update(@Param('id') id, @Body() dto: UpdateEventDto) {
        return await this.eventService.updateEvent(+id, dto);
    }

    @Delete('id')
    @ApiOperation({summary: 'Редагувати подію'})
    @ApiResponse({status: 200, description: 'Подію видалено'})
    @ApiResponse({status: 404, description: 'Немає події за цим id'})
    async remove(@Param('id') id: string) {
        return await this.eventService.removeEvent(+id);
    }
}

