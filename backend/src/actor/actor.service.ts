import { Injectable } from '@nestjs/common';
import { ActorEntity } from './entities/actor.entity';
import { CreateActorDto } from './dto/actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async create(dto: CreateActorDto): Promise<ActorEntity> {
    const { name } = dto;
    const newActor = this.actorRepository.create({ name });

    return await this.actorRepository.save(newActor);
  }
}
