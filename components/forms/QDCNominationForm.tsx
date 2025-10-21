import React from 'react';
import { QDCMember } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Plus, Trash2 } from '../Icons';

interface QDCNominationFormProps {
    members: QDCMember[];
    onUpdate: (members: QDCMember[]) => void;
    isEditable: boolean;
}

const QDCNominationForm: React.FC<QDCNominationFormProps> = ({ members, onUpdate, isEditable }) => {
    
    const addMember = () => {
        const newMember: QDCMember = {
            id: `qdc-${Date.now()}`,
            name: '',
            designation: '',
            organization: '',
            email: '',
            phone: '',
        };
        onUpdate([...members, newMember]);
    };

    const removeMember = (id: string) => {
        onUpdate(members.filter(m => m.id !== id));
    };

    const handleMemberChange = (id: string, field: keyof Omit<QDCMember, 'id'>, value: string) => {
        const updatedMembers = members.map(m => m.id === id ? { ...m, [field]: value } : m);
        onUpdate(updatedMembers);
    };

    return (
        <div className="space-y-4">
            {members.length === 0 && isEditable && (
                <p className="text-muted-foreground text-center py-4">No committee members nominated yet. Click "Add Member" to start.</p>
            )}

            {members.map((member, index) => (
                <Card key={member.id} className="p-4 bg-secondary/50">
                    <CardContent className="p-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Committee Member #{index + 1}</h3>
                            {isEditable && (
                                <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                    <span className="sr-only">Remove Member</span>
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <Label htmlFor={`name-${member.id}`}>Full Name</Label>
                                <Input 
                                    id={`name-${member.id}`} 
                                    value={member.name}
                                    onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                                    disabled={!isEditable} 
                                />
                            </div>
                             <div className="space-y-1">
                                <Label htmlFor={`designation-${member.id}`}>Designation</Label>
                                <Input 
                                    id={`designation-${member.id}`} 
                                    value={member.designation}
                                    onChange={(e) => handleMemberChange(member.id, 'designation', e.target.value)}
                                    disabled={!isEditable} 
                                />
                            </div>
                             <div className="space-y-1">
                                <Label htmlFor={`organization-${member.id}`}>Organization</Label>
                                <Input 
                                    id={`organization-${member.id}`} 
                                    value={member.organization}
                                    onChange={(e) => handleMemberChange(member.id, 'organization', e.target.value)}
                                    disabled={!isEditable} 
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`email-${member.id}`}>Email</Label>
                                <Input 
                                    id={`email-${member.id}`} 
                                    type="email" 
                                    value={member.email}
                                    onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                                    disabled={!isEditable} 
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`phone-${member.id}`}>Phone</Label>
                                <Input 
                                    id={`phone-${member.id}`} 
                                    type="tel" 
                                    value={member.phone}
                                    onChange={(e) => handleMemberChange(member.id, 'phone', e.target.value)}
                                    disabled={!isEditable} 
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {isEditable && (
                <Button variant="outline" onClick={addMember} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                </Button>
            )}
        </div>
    );
};

export default QDCNominationForm;