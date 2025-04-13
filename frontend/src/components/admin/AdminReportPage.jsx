import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, CircularProgress
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AdminReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        // Scroll to the main content when the page loads
        contentRef.current.scrollIntoView({ behavior: 'smooth' });

        // Fetch all reports from backend
        const fetchReports = async () => {
            try {
                const response = await axios.get('/allreport'); // Replace with the correct API endpoint
                console.log(response); // Debugging log to ensure data structure
                setReports(response.data.data); // Assuming the backend returns data in the 'data' field
            } catch (error) {
                console.error('Error fetching reports:', error);
                setErrorMessage('Error fetching reports. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    return (
        <>
            <AdminNavbar />
            <Box
                sx={{
                    minHeight: reports.length > 0 ? 'auto' : '100vh', // Adjust height dynamically
                    background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
                    padding: 3,
                    display: 'flex',
                    justifyContent: reports.length > 0 ? 'flex-start' : 'center', // Center if no data
                    alignItems: reports.length > 0 ? 'flex-start' : 'center',    // Center if no data
                }}
            >

                <Box ref={contentRef} />
                <Paper
                    elevation={5}
                    sx={{
                        width: '100%',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: 4,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                        Admin: All Reports
                    </Typography>

                    {/* Error Message */}
                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                            {errorMessage}
                        </Typography>
                    )}

                    {/* Loader */}
                    {isLoading ? (
                        <CircularProgress sx={{ margin: '0 auto', display: 'block' }} />
                    ) : (
                        <TableContainer>
                            <Table sx={{ minWidth: 650, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableCell><strong>Report ID</strong></TableCell>
                                        <TableCell><strong>Reporter Email</strong></TableCell>
                                        <TableCell><strong>Reported User Email</strong></TableCell>
                                        <TableCell><strong>Reason</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell>
                                        <TableCell><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reports.map((report) => (
                                        <TableRow
                                            key={report._id}
                                            sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                                        >
                                            <TableCell>{report._id}</TableCell>
                                            <TableCell>{report.reporterId?.email || 'N/A'}</TableCell>
                                            <TableCell>{report.reportedUserId?.email || 'N/A'}</TableCell>
                                            <TableCell>{report.reason}</TableCell>
                                            <TableCell>{report.status}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    sx={{ mr: 1 }}
                                                >
                                                    Resolve
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                >
                                                    Reject
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default AdminReportsPage;
