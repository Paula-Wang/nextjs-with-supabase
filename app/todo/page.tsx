"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteTodo, UpdateTodo, addTodo, readTodo } from "./actions";
import { useState, useEffect } from "react";
import { TodoProps } from "@/types";
import { AddTodoProps } from "@/types";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Todo() {
  // const supabase = createClient();

  // let { data: TODO } = await supabase.from("TODO app").select("*");

  const [taskTodo, setTaskTodo] = useState<TodoProps[]>([]);
  const [task, setTask] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [priority, setPriority] = useState<number>(0);

  useEffect(() => {
    const handleRead = async () => {
      try {
        const readItem = await readTodo();
        setTaskTodo(readItem || []);
      } catch (error) {
        console.error(error);
      }
    };
    handleRead();
    console.log(task, completed, priority);
  }, []);

  const handleAdd = async ({ task, completed, priority }: AddTodoProps) => {
    try {
      await addTodo({ task, completed, priority });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async ( id:number, task:string, completed:boolean, priority:number) => {
    try {
      await UpdateTodo(id, task, completed, priority);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id:number) => {
    try {
      await DeleteTodo(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button style={{ backgroundColor: "orange" }} variant="outline">
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add a new task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={() => handleAdd({ task, completed, priority })}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Task
                </Label>
                <Input
                  id="name"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Completed
                </Label>
                <Input
                  type="checkbox"
                  id="username"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Priority
                </Label>

                <Input
                  type="number"
                  id="username"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>Todo List.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Priority</TableHead>
            <TableHead className="text-right">Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskTodo.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="font-medium">{todo.id}</TableCell>
              <TableCell>{todo.task}</TableCell>
              <TableCell>{todo.created_at}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell>{todo.completed ? "True" : "False"}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      style={{ backgroundColor: "royalblue" }}
                      variant="outline"
                      onClick={() =>{setTask(todo.task), setCompleted(todo.completed), setPriority(todo.priority)}}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                      <DialogDescription>
                        Edit the task of your choice here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={() => handleUpdate(todo.id, task, completed, priority )}
                    >
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Task
                          </Label>
                          <Input
                            id="name"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Completed
                          </Label>
                          <Input
                            type="checkbox"
                            id="username"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Priority
                          </Label>

                          <Input
                            type="number"
                            id="username"
                            value={priority}
                            onChange={(e) =>
                              setPriority(parseInt(e.target.value))
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button style={{ backgroundColor: "red" }} variant="outline" onClick={() => {handleDelete(todo.id)}}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
