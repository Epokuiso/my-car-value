import { 
    Entity,
    Column,
    PrimaryGeneratedColumn, 
    AfterInsert,
    AfterRemove,
    AfterUpdate
 } from "typeorm";

@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert ()
    {
        console.log (`A new user with the id: ${this.id} was inserted into the database.`);
    }

    @AfterRemove()
    logRemove ()
    {
        console.log (`A user with the id: ${this.id} was removed from the database.`);
    }

    @AfterUpdate ()
    logUpdate ()
    {
        console.log (`The user with the id: ${this.id} was updated.`);
    }
}