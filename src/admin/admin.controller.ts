import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Post('create')
  create() {
    return this.adminService.create()
  }

  @Delete('clear')
  cleanDb() {
    return this.adminService.cleanDb()
  }
}
