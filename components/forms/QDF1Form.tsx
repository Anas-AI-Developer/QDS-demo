import React from 'react';
import { QDF } from '../../types';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';

interface QDF1FormProps {
    formData: Partial<QDF>;
    onUpdate: (field: keyof QDF, value: string | number) => void;
    isEditable: boolean;
}

const QDF1Form: React.FC<QDF1FormProps> = ({ formData, onUpdate, isEditable }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'number' ? Number(value) : value;
        onUpdate(name as keyof QDF, finalValue);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="organizationName">1. Name of the organization</Label>
                <Input
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="organizationType">2. Type of organization</Label>
                <Input
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                />
            </div>
            <div className="space-y-4 border-t pt-4">
                 <Label>3. Contact details:</Label>
                 <div className="space-y-3 pl-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                        <Label htmlFor="organizationAddress" className="md:col-span-1 md:text-right pr-4">a. Address</Label>
                        <Input
                            id="organizationAddress"
                            name="organizationAddress"
                            className="md:col-span-5"
                            value={formData.organizationAddress || ''}
                            onChange={handleChange}
                            disabled={!isEditable}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                        <Label htmlFor="contactPersonName" className="md:col-span-1 md:text-right pr-4">b. Name</Label>
                        <Input
                            id="contactPersonName"
                            name="contactPersonName"
                            className="md:col-span-5"
                            value={formData.contactPersonName || ''}
                            onChange={handleChange}
                            disabled={!isEditable}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                        <Label htmlFor="contactPersonDesignation" className="md:col-span-1 md:text-right pr-4">c. Designation</Label>
                        <Input
                            id="contactPersonDesignation"
                            name="contactPersonDesignation"
                            className="md:col-span-5"
                            value={formData.contactPersonDesignation || ''}
                            onChange={handleChange}
                            disabled={!isEditable}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                        <Label htmlFor="contactPersonPhone" className="md:col-span-1 md:text-right pr-4">d. Phone number</Label>
                        <Input
                            id="contactPersonPhone"
                            name="contactPersonPhone"
                            className="md:col-span-5"
                            value={formData.contactPersonPhone || ''}
                            onChange={handleChange}
                            disabled={!isEditable}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                        <Label htmlFor="contactPersonEmail" className="md:col-span-1 md:text-right pr-4">e. Email</Label>
                        <Input
                            id="contactPersonEmail"
                            name="contactPersonEmail"
                            type="email"
                            className="md:col-span-5"
                            value={formData.contactPersonEmail || ''}
                            onChange={handleChange}
                            disabled={!isEditable}
                        />
                    </div>
                 </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="title">4. Title of the proposed qualification to be developed (NVQ title format)</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="level">NVQF Level</Label>
                    <Select id="level" name="level" value={formData.level || 1} onChange={handleChange} disabled={!isEditable}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(l => <option key={l} value={l}>Level {l}</option>)}
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Input id="sector" name="sector" value={formData.sector || ''} onChange={handleChange} disabled={!isEditable} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">5. Description of focus, scope and characteristics of the proposed qualification (A general statement)</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                    rows={4}
                />
            </div>
            <div className="space-y-4 border-t pt-4">
                <Label>6. Justification of the qualification</Label>
                <div className="space-y-2 pl-4">
                    <Label htmlFor="justificationSummary">a. Summary of the occupational skill areas that it would cover.</Label>
                    <Textarea
                        id="justificationSummary"
                        name="justificationSummary"
                        value={formData.justificationSummary || ''}
                        onChange={handleChange}
                        disabled={!isEditable}
                        rows={3}
                    />
                </div>
                <div className="space-y-2 pl-4">
                    <Label htmlFor="justificationSupport">b. Evidence of support from relevant industry and community groups for the proposed qualification development.</Label>
                     <Textarea
                        id="justificationSupport"
                        name="justificationSupport"
                        value={formData.justificationSupport || ''}
                        onChange={handleChange}
                        disabled={!isEditable}
                        rows={3}
                    />
                </div>
            </div>
            <div className="space-y-2 border-t pt-4">
                <Label htmlFor="authorizedPerson">Authorized Person (Signature of Head/Authorized Person)</Label>
                <Input
                    id="authorizedPerson"
                    name="authorizedPerson"
                    value={formData.authorizedPerson || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                />
            </div>
        </div>
    );
};

export default QDF1Form;
