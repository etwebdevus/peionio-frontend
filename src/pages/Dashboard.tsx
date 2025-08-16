import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button
} from '@mui/material';
import { 
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import accountService from '../services/accountService';
import transactionService from '../services/transactionService';
import receivingAccountService from '../services/receivingAccountService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [members, setMembers] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [receivingAccounts, setReceivingAccounts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch credits
        const creditsData = await accountService.getCredits();
        setCredits(creditsData.credits);
        
        // Fetch team members
        const membersData = await accountService.getAllMembers();
        setMembers(membersData);
        
        // Fetch recent transactions
        const transactionsData = await transactionService.getRecentTransactions();
        setRecentTransactions(transactionsData);
        
        // Fetch receiving accounts
        const receivingAccountsData = await receivingAccountService.getAllReceivingAccounts();
        setReceivingAccounts(receivingAccountsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.firstName}!
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Credits Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'primary.light',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div">
                Credits
              </Typography>
              <CreditCardIcon />
            </Box>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {credits}
            </Typography>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ mt: 'auto', color: 'white', borderColor: 'white' }}
              onClick={() => navigate('/account/credits')}
            >
              Buy Credits
            </Button>
          </Paper>
        </Grid>
        
        {/* Team Members Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'secondary.light',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div">
                Team Members
              </Typography>
              <PeopleIcon />
            </Box>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {members.length}
            </Typography>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ mt: 'auto', color: 'white', borderColor: 'white' }}
              onClick={() => navigate('/account/members')}
            >
              Manage Team
            </Button>
          </Paper>
        </Grid>
        
        {/* Transactions Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'success.light',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div">
                Transactions
              </Typography>
              <ReceiptIcon />
            </Box>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {recentTransactions.length}
            </Typography>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ mt: 'auto', color: 'white', borderColor: 'white' }}
              onClick={() => navigate('/transactions')}
            >
              View All
            </Button>
          </Paper>
        </Grid>
        
        {/* Receiving Accounts Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'info.light',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div">
                Receiving Accounts
              </Typography>
              <AccountBalanceIcon />
            </Box>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {receivingAccounts.length}
            </Typography>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ mt: 'auto', color: 'white', borderColor: 'white' }}
              onClick={() => navigate('/receiving-accounts')}
            >
              Manage Accounts
            </Button>
          </Paper>
        </Grid>
        
        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Recent Transactions" />
            <Divider />
            <CardContent>
              {recentTransactions.length > 0 ? (
                <List>
                  {recentTransactions.slice(0, 5).map((transaction: any) => (
                    <React.Fragment key={transaction.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${transaction.type} - ${transaction.amount}`}
                          secondary={new Date(transaction.created_at).toLocaleDateString()}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="textSecondary" align="center">
                  No recent transactions
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button 
                  variant="text" 
                  color="primary"
                  onClick={() => navigate('/transactions')}
                >
                  View All
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Team Members */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Team Members" />
            <Divider />
            <CardContent>
              {members.length > 0 ? (
                <List>
                  {members.slice(0, 5).map((member: any) => (
                    <React.Fragment key={member.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${member.first_name} ${member.last_name}`}
                          secondary={member.email}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="textSecondary" align="center">
                  No team members
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button 
                  variant="text" 
                  color="primary"
                  onClick={() => navigate('/account/members')}
                >
                  View All
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

