import { Body, Controller, Get, Param, Post } from "@nestjs/common";


@Controller('property')
export class PropertController {
    @Get()
    findAll() {
        return "All Property";
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return id;

    }
    @Get(":id/:slug")
    findOneObj(@Param("id") id, @Param("slug") slug) {
        return `id = {$id}, slug ={$slug}`;

    }

    @Post()
    create(@Body() body) {
        return "This will create Property";
    }
}

