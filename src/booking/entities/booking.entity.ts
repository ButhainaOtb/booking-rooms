import { Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Entity, JoinColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Room } from "src/rooms/entities/room.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'roomId' })
    room: Room;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @CreateDateColumn()
    createdAt: Date;


}
