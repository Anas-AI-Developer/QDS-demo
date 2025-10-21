import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2 } from '../Icons';

// Mock data structure
interface Task {
  id: number;
  description: string;
}

interface Duty {
  id: number;
  description: string;
  tasks: Task[];
}

const initialDuties: Duty[] = [];


const OccupationalProfileForm: React.FC = () => {
    const [duties, setDuties] = useState<Duty[]>(initialDuties);

    const addDuty = () => {
        const newDuty: Duty = { id: Date.now(), description: '', tasks: [] };
        setDuties([...duties, newDuty]);
    };

    const updateDuty = (dutyId: number, description: string) => {
        setDuties(duties.map(d => d.id === dutyId ? { ...d, description } : d));
    };


    const removeDuty = (dutyId: number) => {
        setDuties(duties.filter(d => d.id !== dutyId));
    }

    const addTask = (dutyId: number) => {
        const newTask: Task = { id: Date.now(), description: '' };
        setDuties(duties.map(d => d.id === dutyId ? { ...d, tasks: [...d.tasks, newTask] } : d));
    };

    const updateTask = (dutyId: number, taskId: number, description: string) => {
        setDuties(duties.map(d => d.id === dutyId ? { ...d, tasks: d.tasks.map(t => t.id === taskId ? { ...t, description } : t) } : d));
    };

    const removeTask = (dutyId: number, taskId: number) => {
        setDuties(duties.map(d => d.id === dutyId ? { ...d, tasks: d.tasks.filter(t => t.id !== taskId) } : d));
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Occupational Profile (Duties and Tasks)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {duties.map((duty, dutyIndex) => (
                    <Card key={duty.id} className="bg-secondary/50 p-4">
                        <div className="flex items-center gap-4">
                           <span className="font-bold">Duty {dutyIndex + 1}:</span>
                           <Input 
                                value={duty.description}
                                onChange={(e) => updateDuty(duty.id, e.target.value)}
                                placeholder="Enter duty description"
                                className="flex-grow"
                           />
                           <Button variant="ghost" size="icon" onClick={() => removeDuty(duty.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                           </Button>
                        </div>
                        <div className="pl-8 mt-4 space-y-2">
                            <h4 className="font-semibold text-sm">Tasks:</h4>
                            {duty.tasks.map((task, taskIndex) => (
                               <div key={task.id} className="flex items-center gap-2">
                                   <span className="text-muted-foreground">{taskIndex + 1}.</span>
                                   <Input 
                                        value={task.description}
                                        onChange={(e) => updateTask(duty.id, task.id, e.target.value)}
                                        placeholder="Enter task description"
                                        className="flex-grow"
                                   />
                                   <Button variant="ghost" size="icon" onClick={() => removeTask(duty.id, task.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                   </Button>
                               </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => addTask(duty.id)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Task
                            </Button>
                        </div>
                    </Card>
                ))}
                 <Button onClick={addDuty}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Duty
                </Button>
            </CardContent>
        </Card>
    );
};

export default OccupationalProfileForm;