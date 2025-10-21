import React, { useState } from 'react';
import { QDF_DATA } from '../constants';
import { QDF, QDFStatus } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge, BadgeVariant } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { Plus } from '../components/Icons';

const getStatusBadgeVariant = (status: QDFStatus): BadgeVariant => {
    switch(status) {
        case QDFStatus.APPROVED: return 'approved';
        case QDFStatus.REJECTED: return 'rejected';
        case QDFStatus.SUBMITTED_FOR_REVIEW: return 'submitted';
        case QDFStatus.CS_SUBMITTED_FOR_VALIDATION: return 'under_review';
        case QDFStatus.CS_VALIDATED: return 'validated';
        case QDFStatus.IN_DEVELOPMENT: return 'in_development';
        case QDFStatus.PENDING_FINAL_APPROVAL: return 'pending_approval';
        case QDFStatus.PENDING_INDUSTRY_VALIDATION: return 'pending_approval';
        case QDFStatus.PENDING_QDC_NOMINATION: return 'pending_approval';
        case QDFStatus.DRAFT: return 'draft';
        case QDFStatus.ON_HOLD: return 'draft';
        default: return 'default';
    }
};

const QDFManagementPage: React.FC = () => {
  const [qdfs, setQdfs] = useState<QDF[]>(QDF_DATA);
  const [filters, setFilters] = useState({ status: '', sector: '', search: '' });
  const navigate = useNavigate();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredQDFs = qdfs.filter(qdf => {
    return (
      (filters.status === '' || qdf.status === filters.status) &&
      (filters.sector === '' || qdf.sector === filters.sector) &&
      (qdf.title.toLowerCase().includes(filters.search.toLowerCase()) ||
       qdf.id.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const uniqueSectors = [...new Set(QDF_DATA.map(qdf => qdf.sector))];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">QDF Management</h1>
            <p className="text-muted-foreground">Review, track, and manage all Qualification Development Forms.</p>
        </div>
        <Button onClick={() => navigate('/qdf/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New QDF
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              name="search"
              placeholder="Search by Title or ID..."
              className="md:max-w-xs"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <Select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              {Object.values(QDFStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
            <Select name="sector" value={filters.sector} onChange={handleFilterChange}>
              <option value="">All Sectors</option>
              {uniqueSectors.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>QDF ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQDFs.map(qdf => (
                <TableRow key={qdf.id} className="cursor-pointer" onClick={() => navigate(`/qdf/${qdf.id}`)}>
                  <TableCell className="font-medium">{qdf.id}</TableCell>
                  <TableCell>{qdf.title}</TableCell>
                  <TableCell>{qdf.sector}</TableCell>
                  <TableCell>{qdf.level}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(qdf.status)}>{qdf.status}</Badge>
                  </TableCell>
                  <TableCell>{qdf.submittedBy}</TableCell>
                  <TableCell>{qdf.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QDFManagementPage;