import _ from 'lodash'
import users from 'fixtures/users.json'
import { ValidationRolesEnum, IUser, ValidationRoles }  from 'util/interfaces'

const WORKERS_PER_ROLE = 4
const availableWorkers = _.slice(_.shuffle(users), 20, 40) as IUser[]

interface GetBestWorkersForRoleProps {
    users: IUser[],
    role: ValidationRoles
}

const getBestWorkersForRole = ({ users, role }:GetBestWorkersForRoleProps) => {
    const sortedWorkerByExperience = _.reverse(_.sortBy(users, user => {
        const indexOfRole = _.findIndex(user.validations, validation => validation.role === role)
        return user.validations[indexOfRole].experience
    }))

    // take best 4 (if they are ranked)
    const bestWorkers = []
    for (let i = 0; i < WORKERS_PER_ROLE; i++) {
        const indexOfRole = _.findIndex(sortedWorkerByExperience[i].validations, validation => validation.role === role)
        if (sortedWorkerByExperience[i].validations[indexOfRole].experience > 0) {
            bestWorkers.push(sortedWorkerByExperience[i])
        }
    }

    console.log({sortedWorkerByExperience, bestWorkers})
    return bestWorkers
}

export const createStafing = () => {
    let remainingWorkers = [...availableWorkers]

    let fillerWorkers:IUser[] =  getBestWorkersForRole({users: remainingWorkers, role: ValidationRolesEnum.filler})
    // remove the fillerWorkers from remaining workers
    remainingWorkers = _.filter(remainingWorkers, worker => {
        const fillerWorkersIds = _.map(fillerWorkers, worker => worker.id)
        return !_.includes(fillerWorkersIds, worker.id)
    })

    let univatWorkers:IUser[] = getBestWorkersForRole({users: remainingWorkers, role: ValidationRolesEnum.univat})
    // remove the fillerWorkers from remaining workers
    remainingWorkers = _.filter(remainingWorkers, worker => {
        const univatWorkersIds = _.map(univatWorkers, worker => worker.id)
        return !_.includes(univatWorkersIds, worker.id)
    })

    let tamper_bandWorkers:IUser[] = getBestWorkersForRole({users: remainingWorkers, role: ValidationRolesEnum.tamber_band})
    // remove the tamper_bandWorkers from remaining workers
    remainingWorkers = _.filter(remainingWorkers, worker => {
        const tamper_bandWorkersIds = _.map(tamper_bandWorkers, worker => worker.id)
        return !_.includes(tamper_bandWorkersIds, worker.id)
    })

    let bundlerWorkers:IUser[] = getBestWorkersForRole({users: remainingWorkers, role: ValidationRolesEnum.bundler})
    // remove the bundlerWorkers from remaining workers
    remainingWorkers = _.filter(remainingWorkers, worker => {
        const bundlerWorkersIds = _.map(bundlerWorkers, worker => worker.id)
        return !_.includes(bundlerWorkersIds, worker.id)
    })

    let pmcWorkers:IUser[] = getBestWorkersForRole({users: remainingWorkers, role: ValidationRolesEnum.pmc})
    // remove the bundlerWorkers from remaining workers
    remainingWorkers = _.filter(remainingWorkers, worker => {
        const pmcWorkersIds = _.map(pmcWorkers, worker => worker.id)
        return !_.includes(pmcWorkersIds, worker.id)
    })


    console.log({remainingWorkers, fillerWorkers, univatWorkers, tamper_bandWorkers, bundlerWorkers, pmcWorkers})

}
