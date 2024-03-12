import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService:ConfigService){

  }
  getHello(): string {
    return 'Hello World!';

  }

  getHello2():string{

    const port=this.configService.get("DATABASE_USER");
const port2=process.env.PORT;


    return "Hello world !!!!! "+port2;
  }
}
