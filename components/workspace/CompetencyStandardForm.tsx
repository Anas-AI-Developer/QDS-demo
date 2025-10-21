import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2 } from '../Icons';

interface Criteria {
    id: string;
    code: string;
    description: string;
}

interface CompetencyUnit {
    id: string;
    code: string;
    title: string;
    performanceCriteria: Criteria[];
    knowledgeCriteria: Criteria[];
}

const initialUnits: CompetencyUnit[] = [
    {
        id: 'cu1',
        code: 'B2',
        title: 'Repair lighting system of the vehicle.',
        performanceCriteria: [
            { id: 'p1', code: 'P1.', description: 'Select tools and equipment according to job requirement.' },
            { id: 'p2', code: 'P2.', description: 'Repair faults in the components as diagnosed according to procedures.' },
            { id: 'p3', code: 'P3.', description: 'Adopt a method for repairing systems and components without causing damage to them' },
            { id: 'p4', code: 'P4.', description: 'Inspect and verify the fault is removed' },
            { id: 'p5', code: 'P5.', description: 'Observe occupational health and safety precautions at all times.' },
        ],
        knowledgeCriteria: [
            { id: 'k1', code: 'K1.', description: 'Explain uses of multi-meter, test lamp & toolkit' },
            { id: 'k2', code: 'K2.', description: 'Define methods and procedures of repairing faults in the components ( harness, switch)' },
            { id: 'k3', code: 'K3.', description: 'Describe techniques for inspecting and verifying the repair of lighting system.' },
            { id: 'k4', code: 'K4.', description: 'Define repair specific safety precautions & guidelines.' },
        ]
    }
];

const CompetencyStandardForm: React.FC = () => {
    const [units, setUnits] = useState<CompetencyUnit[]>(initialUnits);

    const addUnit = () => {
        const newId = `cu${Date.now()}`;
        setUnits([...units, {
            id: newId,
            code: '',
            title: '',
            performanceCriteria: [],
            knowledgeCriteria: []
        }]);
    };

    const updateUnitField = (unitId: string, field: 'code' | 'title', value: string) => {
        setUnits(units.map(u => u.id === unitId ? { ...u, [field]: value } : u));
    };
    
    const removeUnit = (unitId: string) => {
        setUnits(units.filter(u => u.id !== unitId));
    };

    const addCriteria = (unitId: string, type: 'performanceCriteria' | 'knowledgeCriteria') => {
        const prefix = type === 'performanceCriteria' ? 'P' : 'K';
        const newId = `${prefix.toLowerCase()}${Date.now()}`;
        setUnits(units.map(u => {
            if (u.id === unitId) {
                const newCode = `${prefix}${u[type].length + 1}.`;
                return { ...u, [type]: [...u[type], { id: newId, code: newCode, description: '' }] };
            }
            return u;
        }));
    };
    
    const updateCriteria = (unitId: string, type: 'performanceCriteria' | 'knowledgeCriteria', criteriaId: string, description: string) => {
        setUnits(units.map(u => u.id === unitId ? { ...u, [type]: u[type].map(c => c.id === criteriaId ? { ...c, description } : c) } : u));
    };

    const removeCriteria = (unitId: string, type: 'performanceCriteria' | 'knowledgeCriteria', criteriaId: string) => {
        setUnits(units.map(u => {
            if (u.id === unitId) {
                const updatedCriteria = u[type].filter(c => c.id !== criteriaId);
                // Re-number codes
                const prefix = type === 'performanceCriteria' ? 'P' : 'K';
                const renumberedCriteria = updatedCriteria.map((c, index) => ({...c, code: `${prefix}${index + 1}.`}));
                return { ...u, [type]: renumberedCriteria };
            }
            return u;
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Competency Standards</CardTitle>
                <CardDescription>Define competency units, performance criteria, and knowledge requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {units.map(unit => (
                    <div key={unit.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4 flex-grow">
                                <Input value={unit.code} onChange={e => updateUnitField(unit.id, 'code', e.target.value)} placeholder="Code" className="w-20" />
                                <Input value={unit.title} onChange={e => updateUnitField(unit.id, 'title', e.target.value)} placeholder="Unit of Competency Title" className="flex-grow" />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeUnit(unit.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Performance Criteria */}
                            <div>
                                <h3 className="font-semibold mb-2">Performance Criteria</h3>
                                <p className="text-sm text-muted-foreground mb-2">You must be able to:</p>
                                <div className="space-y-2">
                                    {unit.performanceCriteria.map(pc => (
                                        <div key={pc.id} className="flex items-start gap-2">
                                            <span className="font-semibold pt-2">{pc.code}</span>
                                            <textarea
                                                value={pc.description}
                                                onChange={e => updateCriteria(unit.id, 'performanceCriteria', pc.id, e.target.value)}
                                                className="flex-grow min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                rows={1}
                                            />
                                            <Button variant="ghost" size="icon" onClick={() => removeCriteria(unit.id, 'performanceCriteria', pc.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button size="sm" variant="outline" onClick={() => addCriteria(unit.id, 'performanceCriteria')}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Criteria
                                    </Button>
                                </div>
                            </div>
                            {/* Knowledge & Understanding */}
                            <div>
                                <h3 className="font-semibold mb-2">Knowledge & Understanding</h3>
                                <p className="text-sm text-muted-foreground mb-2">You must be able to:</p>
                                <div className="space-y-2">
                                    {unit.knowledgeCriteria.map(kc => (
                                        <div key={kc.id} className="flex items-start gap-2">
                                            <span className="font-semibold pt-2">{kc.code}</span>
                                            <textarea
                                                value={kc.description}
                                                onChange={e => updateCriteria(unit.id, 'knowledgeCriteria', kc.id, e.target.value)}
                                                className="flex-grow min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                rows={1}
                                            />
                                            <Button variant="ghost" size="icon" onClick={() => removeCriteria(unit.id, 'knowledgeCriteria', kc.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button size="sm" variant="outline" onClick={() => addCriteria(unit.id, 'knowledgeCriteria')}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Knowledge
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <Button onClick={addUnit}><Plus className="h-4 w-4 mr-2" /> Add Competency Unit</Button>
            </CardContent>
        </Card>
    );
};

export default CompetencyStandardForm;