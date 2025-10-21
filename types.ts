import { FileSignature, CheckCircle2, XCircle, Clock, Pencil, FileText as FileTextIcon } from './components/Icons'; // Assuming Icons barrel file exists

export enum UserRole {
  NAVTTCA_ADMIN = 'NAVTTC Admin',
  TEVTA_REP = 'TEVTA Representative',
  QDC_MEMBER = 'QDC Member',
  INDUSTRY_EXPERT = 'Industry Expert',
  TRAINING_PROVIDER = 'Training Provider',
  SYSTEM_ADMIN = 'System Admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export enum QDFStatus {
  DRAFT = 'Draft',
  SUBMITTED_FOR_REVIEW = 'Submitted for Review',
  PENDING_QDC_NOMINATION = 'Pending QDC Nomination',
  ON_HOLD = 'On Hold',
  IN_DEVELOPMENT = 'In Development',
  CS_SUBMITTED_FOR_VALIDATION = 'CS Submitted for Validation',
  CS_VALIDATED = 'CS Validated',
  PENDING_INDUSTRY_VALIDATION = 'Pending Industry Validation',
  PENDING_FINAL_APPROVAL = 'Pending Final Approval',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum QDF2Decision {
  APPROVED = 'Approved',
  INCOMPLETE = 'Incomplete / Needs Revision',
  NOT_APPROVED = 'Not Approved',
}

export type QAChecklistStatus = 'Yes' | 'No' | 'NA';

export interface QAChecklistData {
  items: { [key: number]: QAChecklistStatus };
  comments: string;
  assessedBy: string;
  assessedByDesignation: string;
  assessedBySignature: string;
  assessmentDate: string;
}

export interface WorkflowEvent {
    stage: string;
    user: string;
    timestamp: string;
    status: 'completed' | 'in_progress' | 'pending';
    comments?: string;
}

export interface QDCMember {
  id: string;
  name: string;
  designation: string;
  organization: string;
  email: string;
  phone: string;
}

export interface QDF {
  id: string;
  
  // QDF-1 Fields
  title: string;
  organizationName: string;
  organizationType: string;
  organizationAddress: string;
  contactPersonName: string;
  contactPersonDesignation: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  description: string;
  justificationSummary: string;
  justificationSupport: string;
  authorizedPerson: string;
  
  // QDF-2 Fields
  dateReceived?: string;
  dateReviewed?: string;
  decision?: QDF2Decision | null;
  decisionComments?: string;
  reasonsForRejection?: string;
  submissionDueDate?: string;
  reviewerSignature?: string;
  
  // QDC Nomination
  qdcMembers?: QDCMember[];

  // QA Checklist Fields
  qaChecklist?: QAChecklistData | null;

  // Metadata
  level: number;
  sector: string;
  status: QDFStatus;
  submittedBy: string;
  submissionDate: string;
  lastUpdated: string;
  workflowHistory: WorkflowEvent[];
}


export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface Qualification {
    id: string;
    title: string;
    sector: string;
    nvqfLevel: number;
    approvalYear: number;
    version: string;
}