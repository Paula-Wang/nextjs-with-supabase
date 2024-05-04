export type TodoProps = {
    id: number;
    created_at: string;
    task: string;
    completed: boolean;
    priority: number;
}

export type AddTodoProps = {
    task: string;
    completed:boolean;
    priority:number;
}


