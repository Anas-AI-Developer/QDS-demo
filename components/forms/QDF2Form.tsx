import React from 'react';
import { QDF, QDF2Decision } from '../../types';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Card } from '../ui/Card';

interface QDF2FormProps {
    formData: Partial<QDF>;
    onUpdate: (field: keyof QDF, value: any) => void;
    isEditable: boolean;
}

const QDF2Form: React.FC<QDF2FormProps> = ({ formData, onUpdate, isEditable }) => {
    const handleDecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDecision = e.target.value as QDF2Decision;
        // Clear conditional fields when decision changes
        onUpdate('decision', newDecision);
        if (newDecision !== QDF2Decision.APPROVED) onUpdate('submissionDueDate', '');
        if (newDecision !== QDF2Decision.INCOMPLETE) onUpdate('decisionComments', '');
        if (newDecision !== QDF2Decision.NOT_APPROVED) onUpdate('reasonsForRejection', '');
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onUpdate(e.target.name as keyof QDF, e.target.value);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="dateReceived">3. Date proposal received in NAVTTC</Label>
                    <Input
                        id="dateReceived"
                        name="dateReceived"
                        type="date"
                        value={formData.dateReceived || ''}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="dateReviewed">4. Date proposal reviewed in NAVTTC</Label>
                    <Input
                        id="dateReviewed"
                        name="dateReviewed"
                        type="date"
                        value={formData.dateReviewed || ''}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>
            </div>
            
            <div className="space-y-4">
                <Label>5. NAVTTC Decision (Check one box)</Label>
                <div className="space-y-4">
                    {/* Option 1: Approved */}
                    <Card className={`p-4 ${formData.decision === QDF2Decision.APPROVED ? 'border-primary' : ''}`}>
                        <div className="flex items-start">
                             <input
                                type="radio"
                                id="decision-approved"
                                name="decision"
                                value={QDF2Decision.APPROVED}
                                checked={formData.decision === QDF2Decision.APPROVED}
                                onChange={handleDecisionChange}
                                disabled={!isEditable}
                                className="mr-3 mt-1 h-4 w-4"
                            />
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="decision-approved" className="font-normal">
                                    1. The proposal to develop the qualification is approved.
                                    <br/>2. The organization may proceed further to develop the qualification in the light of guidelines and templates provided in this manual.
                                </Label>
                                {formData.decision === QDF2Decision.APPROVED && (
                                    <div className="flex items-center gap-2 pt-2">
                                        <Label htmlFor="submissionDueDate" className="whitespace-nowrap">3. The full qualification package may be submitted by</Label>
                                        <Input
                                            id="submissionDueDate"
                                            name="submissionDueDate"
                                            type="date"
                                            value={formData.submissionDueDate || ''}
                                            onChange={handleChange}
                                            disabled={!isEditable}
                                            className="w-full"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Option 2: Incomplete */}
                    <Card className={`p-4 ${formData.decision === QDF2Decision.INCOMPLETE ? 'border-primary' : ''}`}>
                        <div className="flex items-start">
                             <input
                                type="radio"
                                id="decision-incomplete"
                                name="decision"
                                value={QDF2Decision.INCOMPLETE}
                                checked={formData.decision === QDF2Decision.INCOMPLETE}
                                onChange={handleDecisionChange}
                                disabled={!isEditable}
                                className="mr-3 mt-1 h-4 w-4"
                            />
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="decision-incomplete" className="font-normal">
                                    The information submitted is incomplete and requires following further information/documents.
                                </Label>
                                {formData.decision === QDF2Decision.INCOMPLETE && (
                                    <Textarea
                                        name="decisionComments"
                                        placeholder="1. ...&#10;2. ...&#10;3. ..."
                                        value={formData.decisionComments || ''}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        rows={4}
                                    />
                                )}
                                <p className="text-xs text-muted-foreground">The revised document be submitted within 15 days for reconsideration.</p>
                            </div>
                        </div>
                    </Card>

                    {/* Option 3: Not Approved */}
                    <Card className={`p-4 ${formData.decision === QDF2Decision.NOT_APPROVED ? 'border-primary' : ''}`}>
                        <div className="flex items-start">
                             <input
                                type="radio"
                                id="decision-not-approved"
                                name="decision"
                                value={QDF2Decision.NOT_APPROVED}
                                checked={formData.decision === QDF2Decision.NOT_APPROVED}
                                onChange={handleDecisionChange}
                                disabled={!isEditable}
                                className="mr-3 mt-1 h-4 w-4"
                            />
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="decision-not-approved" className="font-normal">
                                    The proposal to develop the qualification is not approved on the basis of following reasons.
                                </Label>
                                {formData.decision === QDF2Decision.NOT_APPROVED && (
                                    <Textarea
                                        name="reasonsForRejection"
                                        placeholder="1. ...&#10;2. ...&#10;3. ..."
                                        value={formData.reasonsForRejection || ''}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        rows={4}
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

             <div className="space-y-2 border-t pt-4">
                <Label htmlFor="reviewerSignature">Signature (Reviewer Name/Designation)</Label>
                <Input
                    id="reviewerSignature"
                    name="reviewerSignature"
                    value={formData.reviewerSignature || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="e.g., Director General, NAVTTC"
                />
            </div>
        </div>
    );
};

export default QDF2Form;
