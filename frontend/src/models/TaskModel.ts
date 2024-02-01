export class TaskModel {
    title: string | undefined;
    description: string | undefined;
    dueDate: Date | undefined;
    status: string | undefined;

    constructor(data: Partial<TaskModel>) {
        Object.assign(this, data);
    }

    static fromJsonData(data: any){
        return new TaskModel({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate? new Date(data.dueDate) : undefined,
            status: data.status,
        })
    }
}