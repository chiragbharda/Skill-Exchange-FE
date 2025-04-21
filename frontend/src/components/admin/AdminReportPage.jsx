import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });

        const fetchReports = async () => {
            try {
                const response = await axios.get('/allreport');
                setReports(response.data.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
                setErrorMessage('Error fetching reports. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleResolve = async (reportId) => {
        try {
            await axios.put(`/report/${reportId}/resolve`);
            setReports(prevReports =>
                prevReports.map(report =>
                    report._id === reportId ? { ...report, status: 'resolved' } : report
                )
            );
            toast.success('Report resolved successfully!');
        } catch (error) {
            console.error('Error resolving report:', error);
            toast.error('Failed to resolve the report.');
        }
    };

    const handleReject = async (reportId) => {
        try {
            await axios.put(`/report/${reportId}/reject`);
            setReports(prevReports =>
                prevReports.map(report =>
                    report._id === reportId ? { ...report, status: 'rejected' } : report
                )
            );
            toast.info('Report rejected.');
        } catch (error) {
            console.error('Error rejecting report:', error);
            toast.error('Failed to reject the report.');
        }
    };

    const handleDeleteClick = (reportId) => {
        setReportToDelete(reportId);
        setOpenDialog(true); // Open the confirmation dialog
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`/report/${reportToDelete}`);
            setReports(reports.filter((report) => report._id !== reportToDelete));
            setOpenDialog(false);
            setSnackbarMessage('Report removed successfully.');
            setOpenSnackbar(true); // Show success message
        } catch (error) {
            console.error('Error deleting report:', error);
            setOpenDialog(false);
            setSnackbarMessage('Failed to remove report.');
            setOpenSnackbar(true); // Show error message
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false); // Close the confirmation dialog without doing anything
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false); // Close the Snackbar
    };

    return (
        <>
            <AdminNavbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <Box
                sx={{
                    minHeight: reports.length > 0 ? 'auto' : '100vh',
                    background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
                    padding: 3,
                    display: 'flex',
                    justifyContent: reports.length > 0 ? 'flex-start' : 'center',
                    alignItems: reports.length > 0 ? 'flex-start' : 'center',
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

                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                            {errorMessage}
                        </Typography>
                    )}

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
                                        {/* <TableCell><strong>Status</strong></TableCell> */}
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
                                            {/* <TableCell>{report.status}</TableCell> */}
                                            <TableCell>
                                                
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small"
                                                    sx={{ ml: 1 }}
                                                    onClick={() => handleDeleteClick(report._id)}
                                                >
                                                    Remove
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

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <p>Do you really want to remove this report?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Yes, Remove
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Success/Error Message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    );
};

export default AdminReportsPage;
