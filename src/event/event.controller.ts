import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get()
    async findAll() {
        return await this.eventService.findAllEvent();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.eventService.findEventById(+id)
    }

    @Post()
    async add(@Body() body: any) {
        const { name, description, location, maxParticipants } = body;
        return await this.eventService.createEvent(name, description, location, maxParticipants);
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() body: any) {
        const { name, description, location, maxParticipants} = body;
        return await this.eventService.updateEvent(+id, name, description, location, maxParticipants);
    }

    @Delete('id')
    async remove(@Param('id') id: string) {
        return await this.eventService.removeEvent(+id);
    }
}
