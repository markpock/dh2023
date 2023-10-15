import React, { useState } from 'react';
import Panel from './List';
import { css } from '@emotion/react'

import { update, pendingProposals, decidedProposals, delayedProposals } from '../extern';
import { ThemeProvider } from '@emotion/react';
import darkTheme from '../theme';

const containerStyle = css`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const UserHome = ({dispatch}: {dispatch: (n: number) => void}) => {
    update()
    return <div css={containerStyle}>
        <Panel ids={pendingProposals} sendSelected={dispatch}/>
        <Panel ids={decidedProposals} sendSelected={dispatch}/>
        <Panel ids={delayedProposals} sendSelected={dispatch}/>
    </div>
}

export default UserHome;