export class TaskModel {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    dueDate: Date | undefined;
    status: string | undefined;

    constructor(data: Partial<TaskModel>) {
        Object.assign(this, data);
    }

    static fromJsonData(data: any): TaskModel {
        return new TaskModel({
            id: data._id,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate ? new Date(data.due_date) : undefined,
            status: data.status,
        });
    }

    static convertToJson(data: TaskModel): any {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            due_date: data.dueDate ? data.dueDate.toISOString() : undefined,
            status: data.status,
        };
    }
}
