import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';

import { RolesEnum } from '../roles.enum'; // Assuming RolesEnum is your enum

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RolesEnum[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No roles specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role; // Assuming user object is available in request

    return requiredRoles.includes(userRole);
  }
}
