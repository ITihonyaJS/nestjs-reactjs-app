import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('movie-poster')
export class PosterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  url: string;

  @OneToOne(() => MovieEntity, (movie) => movie.poster, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
