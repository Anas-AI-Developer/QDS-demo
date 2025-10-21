import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Input } from '../ui/Input';

const AssessmentGuideForm: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Assessment Guide</CardTitle>
                <CardDescription>Details for conducting the practical assessment.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg p-6 space-y-8">
                    {/* Header Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-gray-600 text-white p-4 rounded-t-md">
                            <h2 className="text-xl font-bold">Title of Competency Standard</h2>
                            <div className="flex gap-2">
                                <span className="bg-white text-gray-700 px-3 py-1 rounded text-sm">CS Code: AUT-001</span>
                                <span className="bg-white text-gray-700 px-3 py-1 rounded text-sm">Level: 4</span>
                                <span className="bg-white text-gray-700 px-3 py-1 rounded text-sm">Version: 1.0</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-gray-500 text-white p-4">
                            <h3 className="text-lg">Competency Unit</h3>
                            <span className="text-right">Assessment Date (DD/MM/YY): __/__/____</span>
                        </div>
                    </div>

                    {/* Main Sections */}
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-1 border-r pr-4 text-right font-semibold text-muted-foreground">Candidate Details</div>
                        <div className="col-span-4 space-y-2">
                            <div>
                                <label className="w-48 inline-block">Name:</label>
                                <Input className="inline-block w-auto flex-grow" placeholder="Enter candidate name..." />
                            </div>
                            <div>
                                <label className="w-48 inline-block">Registration/Roll Number:</label>
                                <Input className="inline-block w-auto flex-grow" placeholder="Enter roll number..." />
                            </div>
                        </div>
                        
                        <div className="col-span-1 border-r pr-4 text-right font-semibold text-muted-foreground">Guidance for Candidate</div>
                        <div className="col-span-4">
                            <p>To meet this standard you are required to complete the following within the given time frame (for practical demonstration & assessment):</p>
                            <div className="bg-gray-200 dark:bg-gray-700 p-2 mt-2 rounded">
                                <ol className="list-decimal list-inside">
                                    <li>Assessment Task 1</li>
                                    <li>Assessment Task 2</li>
                                    <li>Assessment Task 3</li>
                                    <li>...........................</li>
                                </ol>
                            </div>
                            <p className="mt-2">And complete:</p>
                            <div className="bg-gray-200 dark:bg-gray-700 p-2 mt-2 rounded">
                                <ol className="list-decimal list-inside" start={5}>
                                    <li>Knowledge assessment test (Written or Oral)</li>
                                    <li>Portfolios at the time of assessment (if any)</li>
                                </ol>
                            </div>
                        </div>
                        
                        <div className="col-span-1 border-r pr-4 text-right font-semibold text-muted-foreground">Minimum Evidence Required</div>
                        <div className="col-span-4">
                            <p>During a practical assessment, under observation by an assessor, you will complete</p>
                            <div className="space-y-4 mt-2">
                                <div>
                                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">1. Assessment Task 1</div>
                                    <ul className="list-disc list-inside ml-6 mt-1">
                                        <li>Performance Criteria 1</li>
                                        <li>Performance Criteria 2</li>
                                        <li>Performance Criteria 3</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">2. Assessment Task 2</div>
                                    <ul className="list-disc list-inside ml-6 mt-1">
                                        <li>Performance Criteria 1</li>
                                        <li>Performance Criteria 2</li>
                                        <li>Performance Criteria 3</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">3. Assessment Task 3</div>
                                    <ul className="list-disc list-inside ml-6 mt-1">
                                        <li>Performance Criteria 1</li>
                                        <li>Performance Criteria 2</li>
                                        <li>Performance Criteria 3</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AssessmentGuideForm;