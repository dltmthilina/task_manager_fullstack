export class TaskModel {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    dueDate: Date | undefined;
    status: string | undefined;
    createdDate:Date | undefined;


    constructor(data: Partial<TaskModel>) {
        Object.assign(this, data);
    }
}