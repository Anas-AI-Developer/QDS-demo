
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/Dialog';

const ValidationReviewPage: React.FC = () => {
  const [showCommentModal, setShowCommentModal] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Validation & Review</h1>
        <p className="text-muted-foreground">Reviewing qualification: "Advanced Mechatronics Technician"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document Viewer */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Qualification Document Viewer</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md bg-secondary/50 p-4 h-[600px] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Competency Standards for Advanced Mechatronics Technician</h2>
                        <p><strong>Standard 1: System Integration</strong><br />Ability to integrate mechanical, electrical, and computer control systems to design and manufacture useful products.</p>
                        <p className="mt-2"><strong>Standard 2: Troubleshooting and Repair</strong><br />Proficiency in diagnosing and repairing complex automated systems, including PLCs, robotics, and hydraulic/pneumatic systems.</p>
                        {/* More content... */}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Feedback Form */}
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Industry Feedback</CardTitle>
                    <CardDescription>Your expert opinion is valuable for ensuring industry relevance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Overall Assessment</label>
                            <div className="flex items-center space-x-4 mt-2">
                                <label><input type="radio" name="assessment" value="approve" className="mr-1" /> Relevant</label>
                                <label><input type="radio" name="assessment" value="minor" className="mr-1" /> Needs Minor Revisions</label>
                                <label><input type="radio" name="assessment" value="major" className="mr-1" /> Needs Major Revisions</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="feedback" className="text-sm font-medium">Detailed Feedback & Suggestions</label>
                            <textarea id="feedback" rows={8} className="mt-1 w-full p-2 border rounded-md" placeholder="Provide specific comments here..."></textarea>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col space-y-2 items-stretch">
                    <Button>Submit Feedback</Button>
                    <Button variant="destructive" onClick={() => setShowCommentModal(true)}>Reject with Comments</Button>
                </CardFooter>
            </Card>
        </div>
      </div>

       <Dialog open={showCommentModal} onOpenChange={setShowCommentModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Final Rejection Comments</DialogTitle>
                    <DialogDescription>This action will formally reject the qualification pending major overhaul. Please provide your final reasoning.</DialogDescription>
                </DialogHeader>
                <textarea placeholder="Final rejection comments..." className="w-full min-h-[100px] p-2 border rounded-md" />
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setShowCommentModal(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => { alert('Rejected'); setShowCommentModal(false); }}>Confirm Rejection</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default ValidationReviewPage;
