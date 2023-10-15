import React, { useState } from 'react';
import Panel from './List';
import { css } from '@emotion/react'

import { update, pendingProposals, decidedProposals, delayedProposals } from '../extern';
import { ThemeProvider } from '@emotion/react';

const UserHome = ({dispatch}: {dispatch: (n: number) => void}) => {
    update()
    return <div className="uHBox">
        <Panel ids={pendingProposals} sendSelected={dispatch}/>
        <Panel ids={decidedProposals} sendSelected={dispatch}/>
        <Panel ids={delayedProposals} sendSelected={dispatch}/>
    </div>
}

export default UserHome;