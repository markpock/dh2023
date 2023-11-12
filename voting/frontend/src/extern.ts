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

export const pendingProposals: number[] = [2, 3, 4, 5]
export const delayedProposals: number[] = [1, 6]
export const decidedProposals: number[] = [0, 7, 8]

// To be replaced by calls to the server.
// The basic schema here: the admin calls delay, decide, restore, and consider
// with a proposal ID as the only acceptable actions. Before every rendering,
// the client will have to call this update function, which will make all the
// appropriate updates.

// Serverside data.
const log: (() => void)[] = []
const proposals: Proposal[] = [
    {name: 'Audio Tech Refresh for Language Learning',
     items: [{desc: 'Headphones', priority: 'critical', cost: 5 * 130, quantity: 5},
             {desc: 'AUX cords', cost: 5 * 5, quantity: 5},
             {desc: 'Microphones', quantity: 10, cost: 10 * 70}]},
    {name: 'Office Ergonomics Upgrade',
     items: [
            { desc: 'Ergonomic Chairs', priority: 'critical', cost: 15 * 200, quantity: 15 },
            { desc: 'Adjustable Desks', priority: 'high', cost: 10 * 300, quantity: 10 },
            { desc: 'Monitor Stands', priority: 'medium', cost: 10 * 40, quantity: 10 }
        ]
    },
    {
        name: 'Green Energy Initiative for Office',
        items: [
          { desc: 'Solar Panels', priority: 'critical', cost: 20 * 400, quantity: 20 },
          { desc: 'LED Lighting', priority: 'high', cost: 50 * 15, quantity: 50 },
        ]
    },
    {
        name: 'Website Redesign and Development',
        items: [
          { desc: 'UI/UX Design', priority: 'critical', cost: 1 * 5000, quantity: 1 },
          { desc: 'Frontend Development', priority: 'high', cost: 1 * 8000, quantity: 1 },
          { desc: 'Backend Development', priority: 'high', cost: 1 * 10000, quantity: 1 }
        ]
    },
    {
        name: 'Employee Wellness Program',
        items: [
          { desc: 'Yoga Classes', priority: 'high', cost: 20 * 20, quantity: 20 },
          { desc: 'Nutrition Workshops', priority: 'medium', cost: 10 * 30, quantity: 10 }
        ]
      },
      {
        name: 'Community Outreach Campaign',
        items: [
          { desc: 'Event Space Rentals', priority: 'high', cost: 5 * 200, quantity: 5 },
          { desc: 'Promotional Materials', priority: 'medium', cost: 10 * 50, quantity: 10 },
          { desc: 'Social Media Ads', priority: 'high', cost: 5 * 100, quantity: 5 }
        ]
      },
      {
        name: 'IT Infrastructure Upgrade',
        items: [
          { desc: 'Servers', priority: 'critical', cost: 10 * 1000, quantity: 10 },
          { desc: 'Network Switches', priority: 'high', cost: 5 * 300, quantity: 5 },
          { desc: 'Security Software', priority: 'medium', cost: 15 * 50, quantity: 15 },
          { desc: 'IT Support Training', priority: 'medium', cost: 1 * 5000, quantity: 1 }
        ]
      },
      {
        name: 'Educational Workshop Series',
        items: [
          { desc: 'Workshop Materials', priority: 'high', cost: 10 * 25, quantity: 10 },
          { desc: 'Venue Rentals', priority: 'medium', cost: 5 * 200, quantity: 5 },
          { desc: 'Guest Speaker Fees', priority: 'high', cost: 3 * 500, quantity: 3 },
          { desc: 'Refreshments', priority: 'medium', cost: 15 * 10, quantity: 15 }
        ]
      },
      {
        name: 'Mobile App Development',
        items: [
          { desc: 'UI/UX Design', priority: 'high', cost: 1 * 8000, quantity: 1 },
          { desc: 'Frontend Development', priority: 'critical', cost: 1 * 12000, quantity: 1 },
          { desc: 'Backend Development', priority: 'critical', cost: 1 * 15000, quantity: 1 },
          { desc: 'Quality Assurance', priority: 'medium', cost: 1 * 6000, quantity: 1 }
        ]
      }
                              
]

// USER FUNCTIONS
// Initializes pendingProposals, delayedProposals, decidedProposals.
// Adapter for three serverside functions.
// export const initval = [...Array(proposals.length).keys()]
// export const init = initval.map(x => pendingProposals.push(x))
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


