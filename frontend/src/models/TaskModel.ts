export class TaskModel {
    title: string | undefined;
    description: string | undefined;
    dueDate: Date | undefined;
    status: string | undefined;

    constructor(data: Partial<TaskModel>) {
        Object.assign(this, data);
    }
}