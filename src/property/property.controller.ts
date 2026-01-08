import { Controller, Get, Post } from "@nestjs/common";


@Controller('property')
export class PropertController {
    @Get()
    findAll() {
        return "All Property";
    }

    @Post()
    create() {
        return "This will create Property";
    }
}

