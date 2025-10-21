import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2 } from '../Icons';

// Mock data structure
interface LearningUnit {
  id: number;
  description: string;
}

interface Module {
  id: number;
  title: string;
  learningUnits: LearningUnit[];
}

const initialModules: Module[] = [
  {
    id: 1,
    title: 'Module 1: Workshop Safety and Tools',
    learningUnits: [
      { id: 1, description: 'Identify and use workshop tools and equipment.' },
      { id: 2, description: 'Apply workshop safety rules and procedures.' },
    ],
  },
  {
    id: 2,
    title: 'Module 2: Automotive Electrical Systems',
    learningUnits: [
      { id: 1, description: 'Understand basic electrical principles.' },
      { id: 2, description: 'Read and interpret wiring diagrams.' },
    ],
  },
];

const CurriculumForm: React.FC = () => {
    const [modules, setModules] = useState<Module[]>(initialModules);

    // Similar add/update/remove functions as in OccupationalProfileForm
    const addModule = () => {
        setModules([...modules, { id: Date.now(), title: '', learningUnits: [] }]);
    };

    const updateModule = (moduleId: number, title: string) => {
        setModules(modules.map(m => m.id === moduleId ? { ...m, title } : m));
    };

    const removeModule = (moduleId: number) => {
        setModules(modules.filter(m => m.id !== moduleId));
    };

    const addLearningUnit = (moduleId: number) => {
        const newUnit = { id: Date.now(), description: '' };
        setModules(modules.map(m => m.id === moduleId ? { ...m, learningUnits: [...m.learningUnits, newUnit] } : m));
    };

    const updateLearningUnit = (moduleId: number, unitId: number, description: string) => {
        setModules(modules.map(m => m.id === moduleId ? { ...m, learningUnits: m.learningUnits.map(lu => lu.id === unitId ? { ...lu, description } : lu) } : m));
    };

    const removeLearningUnit = (moduleId: number, unitId: number) => {
        setModules(modules.map(m => m.id === moduleId ? { ...m, learningUnits: m.learningUnits.filter(lu => lu.id !== unitId) } : m));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Curriculum (Modules and Learning Units)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {modules.map((module, moduleIndex) => (
                    <Card key={module.id} className="bg-secondary/50 p-4">
                        <div className="flex items-center gap-4">
                           <span className="font-bold">Module {moduleIndex + 1}:</span>
                           <Input 
                                value={module.title}
                                onChange={(e) => updateModule(module.id, e.target.value)}
                                placeholder="Enter module title"
                                className="flex-grow"
                           />
                           <Button variant="ghost" size="icon" onClick={() => removeModule(module.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                           </Button>
                        </div>
                        <div className="pl-8 mt-4 space-y-2">
                            <h4 className="font-semibold text-sm">Learning Units:</h4>
                            {module.learningUnits.map((unit, unitIndex) => (
                               <div key={unit.id} className="flex items-center gap-2">
                                   <span className="text-muted-foreground">{unitIndex + 1}.</span>
                                   <Input 
                                        value={unit.description}
                                        onChange={(e) => updateLearningUnit(module.id, unit.id, e.target.value)}
                                        placeholder="Enter learning unit description"
                                        className="flex-grow"
                                   />
                                   <Button variant="ghost" size="icon" onClick={() => removeLearningUnit(module.id, unit.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                   </Button>
                               </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => addLearningUnit(module.id)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Learning Unit
                            </Button>
                        </div>
                    </Card>
                ))}
                 <Button onClick={addModule}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                </Button>
            </CardContent>
        </Card>
    );
};

export default CurriculumForm;