import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

/**
 * 
 */
@ApiTags('event') // Tag for this controller
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get()
    @ApiOperation({ summary: 'Оримати всі події' })
    @ApiResponse({ status: 200, description: 'Список подій' })
    async findAll() {
        return await this.eventService.findAllEvent();
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


