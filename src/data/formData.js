// player 

export const playerAddFormData = [
    { type: 'text', name: 'alias', label: 'Alias', optional: false },
    { type: 'text', name: 'firstName', label: 'First Name', optional: false },
    { type: 'text', name: 'lastInitial', label: 'Last Initial', optional: false },
    { type: 'text', name: 'preferredPronouns', label: 'Preferred Pronouns', optional: true },
    { type: 'text', name: 'countryOrigin', label: 'Country', optional: true },
    { type: 'select', name: 'mainRole', label: 'Main Role', optional: false, valueOptions: ['flex', 'dps', 'tank', 'support'] }
]

export const playerEditFormData = [
    { type: 'text', name: 'firstName', label: 'First Name', optional: false },
    { type: 'text', name: 'lastInitial', label: 'Last Initial', optional: false },
    { type: 'text', name: 'preferredPronouns', label: 'Preferred Pronouns', optional: true },
    { type: 'text', name: 'countryOrigin', label: 'Country', optional: true },
    { type: 'select', name: 'mainRole', label: 'Main Role', optional: false, valueOptions: ['flex', 'dps', 'tank', 'support'] }
]

// team

export const teamAddFormData = [
    { type: 'text', name: 'code', label: 'Team Code', optional: false },
    { type: 'text', name: 'teamName', label: 'Team Name', optional: false },
    { type: 'checkbox', name: 'isActive', label: 'Active Team', optional: false },
    { type: 'date', name: 'establishedDate', label: 'Established Date', optional: false },
    { type: 'text', name: 'logo', label: 'Logo', optional: true },
    { type: 'text', name: 'captain', label: 'Captain', optional: true }
]

export const teamEditFormData = [
    { type: 'text', name: 'teamName', label: 'Team Name', optional: false },
    { type: 'checkbox', name: 'isActive', label: 'Active Team', optional: false },
    { type: 'text', name: 'logo', label: 'Logo', optional: true },
    { type: 'text', name: 'captain', label: 'Captain', optional: true }
]

// staff

export const staffAddFormData = [
    { type: 'text', name: 'username', label: 'username', optional: false },
    { type: 'text', name: 'firstName', label: 'First Name', optional: false },
    { type: 'text', name: 'lastInitial', label: 'Last Initial', optional: false },
    { type: 'text', name: 'preferredPronouns', label: 'Preferred Pronouns', optional: true },
    { type: 'text', name: 'password', label: 'Temporary Password', optional: false },
    { type: 'text', name: 'email', label: 'Email', optional: false },
    { type: 'select', name: 'staffType', label: 'Type', optional: false, valueOptions: ['admin', 'mod'] }
]

export const staffEditFormData = [
    { type: 'text', name: 'firstName', label: 'First Name', optional: false },
    { type: 'text', name: 'lastInitial', label: 'Last Initial', optional: false },
    { type: 'text', name: 'preferredPronouns', label: 'Preferred Pronouns', optional: true },
    { type: 'text', name: 'email', label: 'Email', optional: false },
]