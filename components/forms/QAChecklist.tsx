import React from 'react';
import { QAChecklistData, QAChecklistStatus } from '../../types';
import { QA_CHECKLIST_ITEMS } from '../../constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Input } from '../ui/Input';

interface QAChecklistProps {
    checklistData: QAChecklistData | null | undefined;
    qualificationDetails: {
        title: string;
        sector: string;
        level: number;
    };
    onUpdate: (data: QAChecklistData) => void;
    isEditable: boolean;
}

const QAChecklist: React.FC<QAChecklistProps> = ({
    checklistData,
    qualificationDetails,
    onUpdate,
    isEditable
}) => {
    const initialData: QAChecklistData = {
        items: {},
        comments: '',
        assessedBy: '',
        assessedByDesignation: '',
        assessedBySignature: '',
        assessmentDate: new Date().toISOString().split('T')[0],
    };

    const data = checklistData || initialData;

    const handleItemChange = (itemIndex: number, status: QAChecklistStatus) => {
        const newItems = { ...data.items, [itemIndex]: status };
        onUpdate({ ...data, items: newItems });
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onUpdate({ ...data, [name]: value });
    };

    return (
        <div className="space-y-6">
            <div className="border rounded-lg p-4 bg-secondary/50 space-y-2">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <Label>Qualification Title</Label>
                        <p className="font-semibold">{qualificationDetails.title}</p>
                    </div>
                    <div>
                        <Label>NVQF Level</Label>
                        <p className="font-semibold">{qualificationDetails.level}</p>
                    </div>
                </div>
                 <div>
                    <Label>Sector</Label>
                    <p className="font-semibold">{qualificationDetails.sector}</p>
                </div>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[5%]">No.</TableHead>
                        <TableHead>Checklist Item</TableHead>
                        <TableHead className="w-[25%] text-center">Yes / No / NA</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {QA_CHECKLIST_ITEMS.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}.</TableCell>
                            <TableCell>{item}</TableCell>
                            <TableCell>
                                <fieldset className="flex justify-around items-center" disabled={!isEditable}>
                                    <Label className="flex items-center space-x-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`checklist-item-${index}`}
                                            value="Yes"
                                            checked={data.items[index] === 'Yes'}
                                            onChange={() => handleItemChange(index, 'Yes')}
                                        />
                                        <span>Yes</span>
                                    </Label>
                                    <Label className="flex items-center space-x-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`checklist-item-${index}`}
                                            value="No"
                                            checked={data.items[index] === 'No'}
                                            onChange={() => handleItemChange(index, 'No')}
                                        />
                                        <span>No</span>
                                    </Label>
                                    <Label className="flex items-center space-x-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`checklist-item-${index}`}
                                            value="NA"
                                            checked={data.items[index] === 'NA'}
                                            onChange={() => handleItemChange(index, 'NA')}
                                        />
                                        <span>NA</span>
                                    </Label>
                                </fieldset>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                    id="comments"
                    name="comments"
                    value={data.comments}
                    onChange={handleFieldChange}
                    disabled={!isEditable}
                    rows={4}
                    placeholder="Enter any comments regarding the assessment..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                 <div className="space-y-2">
                    <Label htmlFor="assessedBy">Assessed by (Name)</Label>
                    <Input
                        id="assessedBy"
                        name="assessedBy"
                        value={data.assessedBy}
                        onChange={handleFieldChange}
                        disabled={!isEditable}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="assessedByDesignation">Designation</Label>
                    <Input
                        id="assessedByDesignation"
                        name="assessedByDesignation"
                        value={data.assessedByDesignation}
                        onChange={handleFieldChange}
                        disabled={!isEditable}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="assessedBySignature">Signature</Label>
                    <Input
                        id="assessedBySignature"
                        name="assessedBySignature"
                        value={data.assessedBySignature}
                        onChange={handleFieldChange}
                        disabled={!isEditable}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="assessmentDate">Date</Label>
                    <Input
                        id="assessmentDate"
                        name="assessmentDate"
                        type="date"
                        value={data.assessmentDate}
                        onChange={handleFieldChange}
                        disabled={!isEditable}
                    />
                </div>
            </div>
        </div>
    );
};

export default QAChecklist;