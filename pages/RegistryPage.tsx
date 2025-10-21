
import React, { useState } from 'react';
import { QUALIFICATIONS_REGISTRY } from '../constants';
import { Qualification } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Download } from '../components/Icons';

const RegistryPage: React.FC = () => {
  const [qualifications, setQualifications] = useState<Qualification[]>(QUALIFICATIONS_REGISTRY);
  const [filters, setFilters] = useState({ sector: '', level: '', year: '', search: '' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredQualifications = qualifications.filter(q => {
    return (
      (filters.sector === '' || q.sector === filters.sector) &&
      (filters.level === '' || q.nvqfLevel === parseInt(filters.level)) &&
      (filters.year === '' || q.approvalYear === parseInt(filters.year)) &&
      (q.title.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const uniqueSectors = [...new Set(QUALIFICATIONS_REGISTRY.map(q => q.sector))];
  const uniqueYears = [...new Set(QUALIFICATIONS_REGISTRY.map(q => q.approvalYear))].sort((a,b) => b-a);

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">NVQ Registry</h1>
            <p className="text-muted-foreground">Search and explore all nationally approved qualifications.</p>
        </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Search Qualifications</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <Input
                    name="search"
                    placeholder="Search by Title..."
                    className="md:max-w-xs"
                    value={filters.search}
                    onChange={handleFilterChange}
                />
                <Select name="sector" value={filters.sector} onChange={handleFilterChange}>
                    <option value="">All Sectors</option>
                    {uniqueSectors.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
                <Select name="level" value={filters.level} onChange={handleFilterChange}>
                    <option value="">All NVQF Levels</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(l => <option key={l} value={l}>Level {l}</option>)}
                </Select>
                <Select name="year" value={filters.year} onChange={handleFilterChange}>
                    <option value="">All Years</option>
                    {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
                </Select>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex justify-end mb-4">
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results (PDF/Excel)
                </Button>
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Qualification Title</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>NVQF Level</TableHead>
                <TableHead>Approval Year</TableHead>
                <TableHead>Version</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQualifications.map(q => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">{q.title}</TableCell>
                  <TableCell>{q.sector}</TableCell>
                  <TableCell>{q.nvqfLevel}</TableCell>
                  <TableCell>{q.approvalYear}</TableCell>
                  <TableCell>{q.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistryPage;
