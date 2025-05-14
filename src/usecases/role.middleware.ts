// usecases/role.middleware.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { NextFunction } from 'express';

export function RoleMiddleware(requiredRole: string) {
  return(req: any, res: any, next: NextFunction) => {
    const user = req.user;
    if (!user || user.role !== this.requiredRole) {
      throw new ForbiddenException('Permission denied');
    }
    next();
  }
}
