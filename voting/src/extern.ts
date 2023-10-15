// Function to simulate server for now.
// Throws an error if proposal n is not pending.
const shift = (oldqueue: number[], newqueue: number[]) => (n: number) => log.push (() => {
    if (!oldqueue.includes(n))
        throw new Error('Could not find the proposal in the requisite set.')
    oldqueue.splice(oldqueue.indexOf(n), 1);
    newqueue.push(n);
})

export interface Proposal {
    name: string
    items: LineItem[]
}

export interface LineItem {
    cost: number                    // Total cost of LI
    quantity?: number    // Quantity of LI
    desc: string                    // Description of LI
    priority?: string    // Critical, Low, etc.
}

export const pendingProposals: number[] = []
export const delayedProposals: number[] = []
export const decidedProposals: number[] = []

// To be replaced by calls to the server.
// The basic schema here: the admin calls delay, decide, restore, and consider
// with a proposal ID as the only acceptable actions. Before every rendering,
// the client will have to call this update function, which will make all the
// appropriate updates.

// Serverside data.
const log: (() => void)[] = []
const proposals: Proposal[] = [
    {name: 'Audio tech refresh for language learning',
     items: [{desc: 'Headphones', priority: 'critical', cost: 5 * 130, quantity: 5},
             {desc: 'AUX cords', cost: 5 * 5, quantity: 5},
             {desc: 'Microphones', quantity: 10, cost: 10 * 70}]}
]

// USER FUNCTIONS
// Initializes pendingProposals, delayedProposals, decidedProposals.
// Adapter for three serverside functions.
export const initval = [...Array(proposals.length).keys()]
export const init = initval.map(x => pendingProposals.push(x))
// Adapter for a serverside function that requests a log of updates for the
// clientside versions of the pending, delayed, and decided proposal ids and
// executes the corresponding clientside functions.
export const update = () => log.map(x => x())
// Gets information associated with the nth proposal. Because proposal ids
// shouldn't change, this is easily memoizable in practice.
export const proposal = (n: number) => proposals[n]

// ADMIN FUNCTIONS
// Each one of these is just a plain PUT request to the server from the admin user.
export const delay = shift(pendingProposals, delayedProposals)
export const decide = shift(pendingProposals, decidedProposals)
export const restore = shift(decidedProposals, pendingProposals)
export const consider = shift(delayedProposals, pendingProposals)


