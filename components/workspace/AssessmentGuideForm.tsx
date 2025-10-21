import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Plus, Trash2 } from '../Icons';

interface Criteria {
    id: number;
    description: string;
}

interface EvidenceTask {
    id: number;
    description: string;
    criteria: Criteria[];
}

const AssessmentGuideForm: React.FC = () => {
    const [header, setHeader] = useState({
        title: '',
        code: '',
        level: '',
        version: '',
        unit: '',
        assessmentDate: '',
    });
    const [guidance, setGuidance] = useState('');
    const [evidenceTasks, setEvidenceTasks] = useState<EvidenceTask[]>([]);

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeader({ ...header, [e.target.name]: e.target.value });
    };

    const addEvidenceTask = () => {
        setEvidenceTasks([...evidenceTasks, { id: Date.now(), description: '', criteria: [] }]);
    };

    const removeEvidenceTask = (taskId: number) => {
        setEvidenceTasks(evidenceTasks.filter(t => t.id !== taskId));
    };

    const updateEvidenceTask = (taskId: number, description: string) => {
        setEvidenceTasks(evidenceTasks.map(t => t.id === taskId ? { ...t, description } : t));
    };
    
    const addCriteria = (taskId: number) => {
        const newCriteria = { id: Date.now(), description: '' };
        setEvidenceTasks(evidenceTasks.map(t => t.id === taskId ? { ...t, criteria: [...t.criteria, newCriteria] } : t));
    };
    
    const removeCriteria = (taskId: number, criteriaId: number) => {
        setEvidenceTasks(evidenceTasks.map(t => t.id === taskId ? { ...t, criteria: t.criteria.filter(c => c.id !== criteriaId) } : t));
    };

    const updateCriteria = (taskId: number, criteriaId: number, description: string) => {
        setEvidenceTasks(evidenceTasks.map(t => t.id === taskId ? { ...t, criteria: t.criteria.map(c => c.id === criteriaId ? { ...c, description } : c) } : t));
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Assessment Guide</CardTitle>
                <CardDescription>Details for conducting the practical assessment.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg p-6 space-y-8">
                    {/* Header Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-600 text-white p-4 rounded-t-md gap-4">
                            <Input name="title" value={header.title} onChange={handleHeaderChange} placeholder="Title of Competency Standard" className="bg-gray-700 text-white placeholder:text-gray-400 border-gray-500 flex-grow" />
                            <div className="flex gap-2">
                                <Input name="code" value={header.code} onChange={handleHeaderChange} placeholder="CS Code" className="bg-gray-700 text-white placeholder:text-gray-400 border-gray-500 w-24" />
                                <Input name="level" value={header.level} onChange={handleHeaderChange} placeholder="Level" className="bg-gray-700 text-white placeholder:text-gray-400 border-gray-500 w-20" />
                                <Input name="version" value={header.version} onChange={handleHeaderChange} placeholder="Version" className="bg-gray-700 text-white placeholder:text-gray-400 border-gray-500 w-24" />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-500 text-white p-4 gap-4">
                            <Input name="unit" value={header.unit} onChange={handleHeaderChange} placeholder="Competency Unit" className="bg-gray-600 text-white placeholder:text-gray-400 border-gray-500 flex-grow" />
                            <div className="text-right whitespace-nowrap">
                                Assessment Date (DD/MM/YY):
                                <Input name="assessmentDate" value={header.assessmentDate} onChange={handleHeaderChange} type="date" className="bg-gray-600 text-white placeholder:text-gray-400 border-gray-500 w-40 inline-block ml-2" />
                            </div>
                        </div>
                    </div>

                    {/* Main Sections */}
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-1 border-r pr-4 text-right font-semibold text-muted-foreground">Candidate Details</div>
                        <div className="col-span-4 space-y-2">
                            <div>
                                <label className="w-48 inline-block">Name:</label>
                                <Input className="inline-block w-auto flex-grow" placeholder="Enter candidate name..." />
                            </div>
                            <div>
                                <label className="w-48 inline-block">Registration/Roll Number:</label>
                                <Input className="inline-block w-auto flex-grow" placeholder="Enter roll number..." />
                            </div>
                        </div>
                        
                        <div className="col-span-1 border-r pr-4 text-right font-semibold text-muted-foreground">Guidance for Candidate</div>
                        <div className="col-span-4">
                            <p>To meet this standard you are required to complete the following within the given time frame (for practical demonstration & assessment):</p>
                             <Textarea
                                className="bg-gray-200 dark:bg-gray-700 mt-2"
                                rows={5}
                                value={guidance}
                                onChange={(e) => setGuidance(e.target.value)}
                                placeholder="Enter tasks for the candidate, e.g.,&#10;1. Assessment Task 1&#10;2. Assessment Task 2&#10;3. Knowledge assessment test (Written or Oral)"
                            />
                        </div>
                        
                        <div className="col-span-1 border-r pr-4 text-right font-semibold text-muted-foreground">Minimum Evidence Required</div>
                        <div className="col-span-4 space-y-4">
                            <p>During a practical assessment, under observation by an assessor, you will complete:</p>
                             {evidenceTasks.map((task, index) => (
                                <div key={task.id}>
                                    <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
                                        <span className="font-semibold">{index + 1}.</span>
                                        <Input
                                            value={task.description}
                                            onChange={(e) => updateEvidenceTask(task.id, e.target.value)}
                                            placeholder="Assessment Task Description"
                                            className="flex-grow bg-transparent border-0 ring-0 focus-visible:ring-0"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => removeEvidenceTask(task.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                    <div className="list-disc list-inside ml-6 mt-2 space-y-2">
                                        {task.criteria.map(c => (
                                            <div key={c.id} className="flex items-center gap-2">
                                                <span>•</span>
                                                <Input
                                                    value={c.description}
                                                    onChange={(e) => updateCriteria(task.id, c.id, e.target.value)}
                                                    placeholder="Performance Criteria"
                                                    className="flex-grow"
                                                />
                                                <Button variant="ghost" size="icon" onClick={() => removeCriteria(task.id, c.id)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => addCriteria(task.id)}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Criteria
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button onClick={addEvidenceTask}>
                                <Plus className="h-4 w-4 mr-2" /> Add Assessment Task
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AssessmentGuideForm;