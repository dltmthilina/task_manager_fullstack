export class TaskModel {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    dueDate: string | undefined;
    createdDate: Date |undefined;
    status: string | undefined;

    constructor(data: Partial<TaskModel>) {
        Object.assign(this, data);
    }

    static fromJsonData(data: any): TaskModel {
        console.log(data)
        return new TaskModel({
            id: data._id,
            title: data.title,
            description: data.description,
            dueDate: data.due_date,
            createdDate: data.created_date? new Date(data.created_date): new Date(),
            status: data.status,
        });
    }

    static convertToJson(data: TaskModel): any {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            due_date: data.dueDate,
            created_date: data.createdDate,
            status: data.status,
        };
    }
}
