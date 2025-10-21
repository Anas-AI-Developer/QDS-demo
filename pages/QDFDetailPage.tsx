import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { QDF_DATA, QUALIFICATIONS_REGISTRY } from '../constants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/Dialog';
import { useAuth } from '../context/AuthContext';
import { UserRole, QDFStatus, QDF, User, QDF2Decision, WorkflowEvent } from '../types';
import ProcessFlow from '../components/ProcessFlow';
import { Briefcase, CheckCircle2 } from '../components/Icons';
import QDF1Form from '../components/forms/QDF1Form';
import QDF2Form from '../components/forms/QDF2Form';
import QAChecklist from '../components/forms/QAChecklist';
import { Textarea } from '../components/ui/Textarea';
import QDCNominationForm from '../components/forms/QDCNominationForm';

const getInitialQDF = (user: User | null): QDF => ({
    id: `QDF${String(Date.now()).slice(-6)}`, // temp ID
    title: '',
    organizationName: '',
    organizationType: '',
    organizationAddress: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    contactPersonPhone: '',
    contactPersonEmail: '',
    description: '',
    justificationSummary: '',
    justificationSupport: '',
    authorizedPerson: '',
    level: 1,
    sector: '',
    status: QDFStatus.DRAFT,
    submittedBy: user?.name || '',
    submissionDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    workflowHistory: [],
    decision: null,
    qdcMembers: [],
    qaChecklist: null,
});


const QDFDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const isNew = id === 'new';
    
    const [qdfData, setQdfData] = useState<QDF>(() => {
        if (isNew) return getInitialQDF(user);
        const existingQdf = QDF_DATA.find(q => q.id === id);
        if (existingQdf) return JSON.parse(JSON.stringify(existingQdf)); // Deep copy to avoid direct mutation
        navigate('/404'); // Or handle not found case appropriately
        return getInitialQDF(user); // Should not be reached
    });

    const [titleWarning, setTitleWarning] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);

    if (!qdfData && !isNew) {
        return <div>QDF not found.</div>;
    }
    
    // Determine permissions based on role and status
    const canEditProposal = (user?.role === UserRole.TEVTA_REP && (qdfData?.status === QDFStatus.DRAFT || qdfData?.status === QDFStatus.REJECTED)) || isNew;
    const canSubmitProposal = canEditProposal;
    const canReviewProposal = user?.role === UserRole.NAVTTCA_ADMIN && qdfData?.status === QDFStatus.SUBMITTED_FOR_REVIEW;
    const canNominateQDC = user?.role === UserRole.TEVTA_REP && (qdfData?.status === QDFStatus.PENDING_QDC_NOMINATION || qdfData?.status === QDFStatus.ON_HOLD);
    const canPerformFinalApproval = user?.role === UserRole.NAVTTCA_ADMIN && qdfData?.status === QDFStatus.PENDING_FINAL_APPROVAL;
    const showReviewForm = !isNew && qdfData?.decision;
    const showChecklist = canPerformFinalApproval || (qdfData && qdfData.qaChecklist);
    const canAccessWorkspace = qdfData && !isNew && [QDFStatus.IN_DEVELOPMENT, QDFStatus.CS_SUBMITTED_FOR_VALIDATION, QDFStatus.CS_VALIDATED].includes(qdfData.status);

    const handleFormUpdate = (field: keyof QDF, value: any) => {
        if (field === 'title' && isNew) {
            const newTitle = value as string;
            const isDuplicate = QDF_DATA.some(q => q.title.toLowerCase() === newTitle.toLowerCase().trim()) ||
                                QUALIFICATIONS_REGISTRY.some(q => q.title.toLowerCase() === newTitle.toLowerCase().trim());
            if (isDuplicate) {
                setTitleWarning('Warning: A qualification with this title already exists.');
            } else {
                setTitleWarning('');
            }
        }
        setQdfData(prev => ({ ...prev, [field]: value, lastUpdated: new Date().toISOString().split('T')[0] }));
    };

    const handleAction = (action: 'submit' | 'approve' | 'reject' | 'launch_development' | 'hold' | 'final_approve') => {
        const timestamp = new Date().toISOString();
        const updatedQdfData = { ...qdfData, lastUpdated: timestamp.split('T')[0] };

        const updateWorkflow = (history: WorkflowEvent[], stageName: string, status: 'completed' | 'in_progress', userName?: string, comments?: string): WorkflowEvent[] => {
            const newHistory = [...history];
            const event = newHistory.find(e => e.stage === stageName);
            if (event) {
                event.status = status;
                event.user = userName || user?.name || 'System';
                event.timestamp = timestamp;
                if (comments) event.comments = comments;
            }
            return newHistory;
        };

        switch (action) {
            case 'submit': {
                updatedQdfData.status = QDFStatus.SUBMITTED_FOR_REVIEW;
                const submissionEvent: WorkflowEvent = { stage: 'QDF-1 Submitted', user: user?.name || 'TEVTA Rep', timestamp, status: 'completed' };

                if (isNew) {
                    updatedQdfData.submissionDate = timestamp.split('T')[0];
                    updatedQdfData.workflowHistory = [
                        submissionEvent,
                        { stage: 'NAVTTC Review', user: '', timestamp: '', status: 'in_progress' },
                        { stage: 'QDC Nomination', user: '', timestamp: '', status: 'pending' },
                        { stage: 'QDC Development', user: '', timestamp: '', status: 'pending' },
                        { stage: 'CS Validation', user: '', timestamp: '', status: 'pending' },
                        { stage: 'Industry Validation', user: '', timestamp: '', status: 'pending' },
                        { stage: 'Final Approval', user: '', timestamp: '', status: 'pending' },
                        { stage: 'Published to Registry', user: '', timestamp: '', status: 'pending' },
                    ];
                    QDF_DATA.unshift(updatedQdfData);
                } else { // Resubmission
                    const index = QDF_DATA.findIndex(q => q.id === updatedQdfData.id);
                    if (index !== -1) {
                        let history = [...updatedQdfData.workflowHistory];
                        history.push(submissionEvent);
                        history = updateWorkflow(history, 'NAVTTC Review', 'in_progress', '');
                        updatedQdfData.workflowHistory = history;
                        QDF_DATA[index] = updatedQdfData;
                    }
                }
                break;
            }
            case 'approve': {
                updatedQdfData.status = QDFStatus.PENDING_QDC_NOMINATION;
                const index = QDF_DATA.findIndex(q => q.id === updatedQdfData.id);
                if (index !== -1) {
                    let history = [...updatedQdfData.workflowHistory];
                    history = updateWorkflow(history, 'NAVTTC Review', 'completed', user?.name, `Accepted. Due: ${updatedQdfData.submissionDueDate || 'N/A'}`);
                    history = updateWorkflow(history, 'QDC Nomination', 'in_progress', 'TEVTA Rep');
                    updatedQdfData.workflowHistory = history;
                    QDF_DATA[index] = updatedQdfData;
                }
                break;
            }
            case 'reject': {
                updatedQdfData.status = QDFStatus.REJECTED;
                const index = QDF_DATA.findIndex(q => q.id === updatedQdfData.id);
                if (index !== -1) {
                    let history = [...updatedQdfData.workflowHistory];
                    history = updateWorkflow(history, 'NAVTTC Review', 'completed', user?.name, `Rejected: ${updatedQdfData.reasonsForRejection || 'No reason.'}`);
                    
                    const reviewIdx = history.findIndex(e => e.stage === 'NAVTTC Review');
                    for (let i = reviewIdx + 1; i < history.length; i++) {
                        history[i].status = 'pending';
                    }
                    updatedQdfData.workflowHistory = history;
                    QDF_DATA[index] = updatedQdfData;
                }
                break;
            }
            case 'launch_development': {
                 updatedQdfData.status = QDFStatus.IN_DEVELOPMENT;
                 const index = QDF_DATA.findIndex(q => q.id === updatedQdfData.id);
                 if (index !== -1) {
                    let history = [...updatedQdfData.workflowHistory];
                    history = updateWorkflow(history, 'QDC Nomination', 'completed', user?.name);
                    history = updateWorkflow(history, 'QDC Development', 'in_progress', 'QDC Member');
                    updatedQdfData.workflowHistory = history;
                    QDF_DATA[index] = updatedQdfData;
                 }
                break;
            }
            case 'hold': {
                updatedQdfData.status = QDFStatus.ON_HOLD;
                const index = QDF_DATA.findIndex(q => q.id === updatedQdfData.id);
                if (index !== -1) {
                    QDF_DATA[index] = updatedQdfData;
                    // We just update the object state without navigating away
                    setQdfData(updatedQdfData);
                    return; // Exit without navigating
                }
                break;
            }
            case 'final_approve': {
                updatedQdfData.status = QDFStatus.APPROVED;
                const index = QDF_DATA.findIndex(q => q.id === updatedQdfData.id);
                if (index !== -1) {
                    let history = [...updatedQdfData.workflowHistory];
                    history = updateWorkflow(history, 'Final Approval', 'completed');
                    history = updateWorkflow(history, 'Published to Registry', 'completed', 'System');
                    updatedQdfData.workflowHistory = history;
                    QDF_DATA[index] = updatedQdfData;
                }
                break;
            }
        }
        navigate('/qdf-management');
    };

    const openRejectModal = () => {
        handleFormUpdate('decision', QDF2Decision.NOT_APPROVED);
        setShowRejectModal(true);
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    {isNew ? 'New Qualification Proposal (QDF-1)' : `QDF Details: ${qdfData?.id}`}
                </h1>
                <p className="text-muted-foreground">
                    {isNew ? 'Fill out the form to propose a new qualification.' : `Managing workflow for: ${qdfData?.title}`}
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>QDF-1: Indication of Intent</CardTitle>
                            <CardDescription>
                                {isNew ? "Fill out all sections of the Indication of Intent form." : "Details of the proposed qualification."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <QDF1Form
                                formData={qdfData}
                                onUpdate={handleFormUpdate}
                                isEditable={canEditProposal}
                            />
                             {titleWarning && <p className="text-sm text-yellow-600 mt-4">{titleWarning}</p>}
                        </CardContent>
                        {canSubmitProposal && (
                            <CardFooter className="flex justify-end space-x-2">
                                 <Button type="button" variant="outline">Save Draft</Button>
                                 <Button onClick={() => handleAction('submit')}>{isNew ? 'Submit for Review' : 'Update & Resubmit'}</Button>
                            </CardFooter>
                        )}
                    </Card>

                    {(canReviewProposal || showReviewForm) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>QDF-2: Acceptance/non-acceptance</CardTitle>
                                <CardDescription>
                                    {canReviewProposal ? "Review the proposal and provide your decision." : "NAVTTC's review decision."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QDF2Form 
                                    formData={qdfData}
                                    onUpdate={handleFormUpdate}
                                    isEditable={canReviewProposal}
                                />
                            </CardContent>
                            {canReviewProposal && (
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button type="button" onClick={openRejectModal} variant="destructive">Non-Acceptance</Button>
                                    <Button type="button" onClick={() => handleAction('approve')} variant="default">Accept for Development</Button>
                                </CardFooter>
                            )}
                        </Card>
                    )}

                    {canNominateQDC && (
                        <Card>
                            <CardHeader>
                                <CardTitle>QDC Nomination</CardTitle>
                                <CardDescription>Nominate committee members for the qualification development. Submit the list to launch the project.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QDCNominationForm
                                    members={qdfData.qdcMembers || []}
                                    onUpdate={(members) => handleFormUpdate('qdcMembers', members)}
                                    isEditable={canNominateQDC}
                                />
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => handleAction('hold')}>Put on Hold</Button>
                                <Button onClick={() => handleAction('launch_development')}>Submit Nominations & Launch Development</Button>
                            </CardFooter>
                        </Card>
                    )}

                    {canAccessWorkspace && (
                         <Card>
                            <CardHeader>
                                <CardTitle>Development Workspace</CardTitle>
                                <CardDescription>Access the collaborative workspace for this qualification.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>The development of Competency Standards, Curriculum, and Assessment Guides is managed in the workspace.</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild>
                                    <Link to={`/workspace/profiling`}><Briefcase className="mr-2 h-4 w-4" /> Go to Workspace</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {showChecklist && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Qualification Assessment Checklist</CardTitle>
                                <CardDescription>Final review checklist for NAVTTC's internal assessment.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QAChecklist
                                    checklistData={qdfData.qaChecklist}
                                    qualificationDetails={{
                                        title: qdfData.title,
                                        sector: qdfData.sector,
                                        level: qdfData.level
                                    }}
                                    onUpdate={(data) => handleFormUpdate('qaChecklist', data)}
                                    isEditable={canPerformFinalApproval}
                                />
                            </CardContent>
                            {canPerformFinalApproval && (
                                <CardFooter className="flex justify-end">
                                    <Button onClick={() => handleAction('final_approve')}>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Approve & Publish to Registry
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Process Flow</CardTitle>
                        </CardHeader>
                        <CardContent>
                           {qdfData && !isNew && <ProcessFlow history={qdfData.workflowHistory} />}
                           {isNew && <p className="text-muted-foreground">Submit the proposal to initiate the workflow.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Non-Acceptance</DialogTitle>
                        <DialogDescription>Please provide final comments for rejecting this QDF. This feedback will be recorded and sent to the originator.</DialogDescription>
                    </DialogHeader>
                    <Textarea 
                        value={qdfData.reasonsForRejection || ''} 
                        onChange={(e) => handleFormUpdate('reasonsForRejection', e.target.value)} 
                        placeholder="Rejection comments..." 
                        className="w-full min-h-[100px]" />
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setShowRejectModal(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { handleAction('reject'); setShowRejectModal(false); }}>Confirm Rejection</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default QDFDetailPage;