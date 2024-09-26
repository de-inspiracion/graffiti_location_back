import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '../guards/auth.guard';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, description: 'The login has been successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async login(@Body() auth: any) {
    return { status: 'ok' };
    return this.authService.signIn(auth);
  }

  //TODO: Limitar a solo Admin
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiBody({ type: AuthDto })
  @ApiResponse({
    status: 201,
    description: 'The register has been successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  register(@Body() auth: AuthDto) {
    return this.authService.signUp(auth);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile/:username')
  getProfile(@Param('username') username: string) {
    return this.authService.getProfile(username);
  }
}
