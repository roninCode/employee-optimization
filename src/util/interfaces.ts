export enum ValidationRolesEnum {
    filler = 'filler',
    univat = 'univat' ,
    tamber_band = 'tamper_band',
    bundler = 'bundler',
    pmc = 'pmc',
}

export type ValidationRoles = 'filler' | 'univat' | 'tamper_band' | 'bundler' | 'pmc'

export interface IUser {
    id: number
    first_name: string
    last_name: string
    validations: {
        role: ValidationRoles
        experience: number
    }[]
}