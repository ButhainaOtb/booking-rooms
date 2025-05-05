import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { RolesGuard } from './commons/guards/roles.guard';
import { BookingModule } from './booking/booking.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
  ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    RoomsModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule { }
