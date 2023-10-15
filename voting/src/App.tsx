import React, {useReducer, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserHome from './pages/UserHome';
import Voting from './pages/Voting';
import Template from './Template';
import * as extern from './extern'

enum ActionE {
    Delay,
    Decide,
    Restore,
    Consider
}

interface Action {
    id: number
    readonly kind: ActionE
}

class Delay implements Action {
    id: number
    readonly kind: ActionE = ActionE.Delay
    constructor (id: number) { this.id = id }
}

class Decide implements Action {
    id: number
    readonly kind: ActionE = ActionE.Decide
    constructor (id: number) { this.id = id }
}

class Restore implements Action {
    id: number
    readonly kind: ActionE = ActionE.Restore
    constructor (id: number) { this.id = id }
}

class Consider implements Action {
    id: number
    readonly kind: ActionE = ActionE.Consider
    constructor (id: number) { this.id = id }
}

const actionReducer = (_: {}, {id, kind}: Action) => {
    switch (kind) {
        case ActionE.Delay:
            extern.delay(id)
            return {}
        case ActionE.Decide:
            extern.decide(id)
            return {}
        case ActionE.Restore:
            extern.restore(id)
            return {}
        case ActionE.Consider:
            extern.consider(id)
            return {}
    }
}

const userApprovalsReducer = (id: number) => (oldMap: Map<number, number[]>, newRows: number[]) => {
    const newMap = new Map(oldMap.entries())
    newMap.set(id, newRows);
    alert(newMap.get(id))
    return newMap
}


const App: React.FC = () => {
  //const [mode, setMode] = useState(Mode.User);
  // This is an admin level task only
  const [_, dispatchAction] = useReducer(actionReducer, {})

  const [selectedID, setSID] = useState(-1);
  // This is a user 
  const [userApprovals, dispatchUserApprovals] = useReducer(userApprovalsReducer(selectedID), new Map());

  const getSelectedRows = (id: number) => {
    const x = userApprovals.get(id)
    if (x === undefined) return []
    return x
  }

  return <BrowserRouter>
            <Routes>
                <Route path='/' element={<Template />} />
                <Route path='/home' element={<UserHome dispatch={setSID}/>} />
                <Route path='/voting'
                       element={ <Voting selectedID={selectedID}
                            selectedRows={getSelectedRows(selectedID)}
                            dispatch={dispatchUserApprovals}/>} />
            </Routes>
        </BrowserRouter>
};

export default App;
