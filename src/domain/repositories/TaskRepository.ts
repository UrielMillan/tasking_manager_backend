import { Task } from "@domain/entities/Task.js";

export interface TaskRepository {
    save(task: Task): Promise<void>;
    find(id: number): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    delete(id: number): Promise<void>;
}