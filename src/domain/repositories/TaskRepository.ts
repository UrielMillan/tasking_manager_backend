import { Task } from "@domain/entities/Task.js";

export interface TaskRepository {
    create(task: Task): Promise<void>;
    findById(id: number): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    update(task: Task): Promise<void>;
    delete(id: number): Promise<void>;
}