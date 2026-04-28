import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/actor.dto';
import { Actor } from '@prisma/client';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto;
    const newActor = await this.prismaService.actor.create({
      data: {
        name,
      },
    });
    return newActor;
  }
}
