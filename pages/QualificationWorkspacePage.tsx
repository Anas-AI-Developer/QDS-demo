import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { History, MessageSquare, CheckCircle2 } from '../components/Icons';
import OccupationalProfileForm from '../components/workspace/OccupationalProfileForm';
import CompetencyStandardForm from '../components/workspace/CompetencyStandardForm';
import CurriculumForm from '../components/workspace/CurriculumForm';
import AssessmentGuideForm from '../components/workspace/AssessmentGuideForm';
import { QDFStatus } from '../types';

type FormType = 'profiling' | 'standards' | 'curriculum' | 'assessment';

const formTitles: Record<FormType, string> = {
    profiling: 'Occupational Profiling',
    standards: 'Competency Standards',
    curriculum: 'Curriculum',
    assessment: 'Assessment Guides'
};

const QualificationWorkspacePage: React.FC = () => {
  const { formType } = useParams<{ formType: FormType }>();
  
  // In a real app, this status would come from a context or be fetched based on the QDF ID.
  // We'll mock it to demonstrate the workflow.
  const mockQDFStatus = QDFStatus.IN_DEVELOPMENT; 
  
  const areFormsEditable = mockQDFStatus === QDFStatus.IN_DEVELOPMENT;
  const showSubmitButton = areFormsEditable && (formType === 'profiling' || formType === 'standards');


  const renderContent = () => {
    switch (formType) {
      case 'profiling':
        return <OccupationalProfileForm />;
      case 'standards':
        return <CompetencyStandardForm />;
      case 'curriculum':
        return <CurriculumForm />;
      case 'assessment':
        return <AssessmentGuideForm />;
      default:
        return <Navigate to="/workspace/profiling" replace />;
    }
  };
  
  const currentTitle = formType && formTitles[formType] ? formTitles[formType] : 'Qualification Workspace';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{currentTitle}</h1>
        <p className="text-muted-foreground">Workspace for "Advanced Mechatronics Technician" (QDF002).</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-grow space-y-4">
            {!areFormsEditable && (
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700 rounded-md">
                    These documents have been submitted for validation and are currently read-only.
                </div>
            )}
            {renderContent()}
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/4 lg:max-w-xs flex-shrink-0 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    {showSubmitButton ? (
                        <Button className="w-full" onClick={() => alert('Submitted OP & CS for validation!')}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Submit for Validation
                        </Button>
                    ) : (
                         <p className="text-sm text-muted-foreground">No actions available at this stage.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Collaboration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Active Members</h4>
                        <div className="flex -space-x-2 mt-2">
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://picsum.photos/seed/m1/40/40" alt="Member 1" />
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://picsum.photos/seed/m2/40/40" alt="Member 2" />
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://picsum.photos/seed/m3/40/40" alt="Member 3" />
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold">Version History</h4>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                            <li>v1.2 - Curriculum update by John Doe</li>
                            <li>v1.1 - Standards refined by Jane Smith</li>
                            <li>v1.0 - Initial draft created</li>
                        </ul>
                    </div>
                    <Button className="w-full"><MessageSquare className="h-4 w-4 mr-2" /> Comments</Button>
                    <Button className="w-full" variant="secondary"><History className="h-4 w-4 mr-2" /> View Full History</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default QualificationWorkspacePage;