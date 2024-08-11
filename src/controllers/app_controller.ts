import { Controller, Get } from '@/decorators/RouteDecorators'

@Controller('/:version')
export class AppController {
  @Get('/')
  baseApp() {
    return 'Hello World'
  }
}
