export class TaskModel {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    dueDate: Date | undefined;
    status: string | undefined;
    createdDate: Date | undefined;
    updatedDate: Date | undefined;


    constructor(data: Partial<TaskModel>) {
        Object.assign(this, data);
    }

    static fromJsonData(data: any){
        return new TaskModel({
            id: data.id,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate? new Date(data.dueDate) : undefined,
            status: data.status,
            createdDate: data.createdDate? new Date(data.createdDate) : undefined,
            updatedDate: data.updatedDate? new Date(data.updatedDate) : undefined,
        })
    }
}