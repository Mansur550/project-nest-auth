import { Body, Controller, Get, HttpCode, Param, Post, Query, ParseIntPipe, ParseBoolPipe } from "@nestjs/common";



@Controller('property')
export class PropertController {
    @Get()
    findAll() {
        return "All Property";
    }

    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //     return id;

    // }
    //get object from param
    // @Get(":id/:slug")
    // findOneObj(@Param("id") id, @Param("slug") slug) {
    //     return `id = {$id}, slug ={$slug}`;

    // }

    //search and get search type
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
        console.log(typeof id);
        console.log(typeof sort);
        return id;

    }



    @Post()
    @HttpCode(202)//change status code 200 to 202
    create(@Body() body) {
        return "This will create Property";
    }
}

