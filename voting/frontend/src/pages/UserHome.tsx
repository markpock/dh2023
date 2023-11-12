// import React, { useState } from 'react';
// import Panel from './List';
// import { css } from '@emotion/react'
// import './UserHome.css';


// import { update, pendingProposals, decidedProposals, delayedProposals } from '../extern';
// import { ThemeProvider } from '@emotion/react';

// const UserHome = ({dispatch}: {dispatch: (n: number) => void}) => {
//     update()
//     return <div className="uHBox">
//         <Panel ids={pendingProposals} sendSelected={dispatch}/>
//         <Panel ids={decidedProposals} sendSelected={dispatch}/>
//         <Panel ids={delayedProposals} sendSelected={dispatch}/>
//     </div>
// }

// export default UserHome;

import React from 'react';
import Panel from './List';
import { update, pendingProposals, decidedProposals, delayedProposals } from '../extern';
import './UserHome.css';

const UserHome = ({ dispatch }: { dispatch: (n: number) => void }) => {
  update();

  return (
    <div className="uHBox">
      <div className="panel">
        <h2>Pending Proposals</h2>
        <Panel ids={pendingProposals} sendSelected={dispatch} />
      </div>
      <div className="panel">
        <h2>Decided Proposals</h2>
        <Panel ids={decidedProposals} sendSelected={dispatch} />
      </div>
      <div className="panel">
        <h2>Delayed Proposals</h2>
        <Panel ids={delayedProposals} sendSelected={dispatch} />
      </div>
    </div>
  );
};

export default UserHome;
