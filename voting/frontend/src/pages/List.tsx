import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { proposal } from '../extern';
import { Link } from 'react-router-dom';

export default function Panel({ids, sendSelected}: {ids: number[], sendSelected: (n: number) => void}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
            {ids.map(x =>
            <ListItem disablePadding>
                <ListItemButton onClick={() => sendSelected(x)} component={Link} to={'/voting'}>
                <ListItemText primary={proposal(x).name} />
                </ListItemButton>
            </ListItem>)}
        </List>
    </Box>
  );
}