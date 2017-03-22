import {IProjectionDefinition, CountSnapshotStrategy, Projection, IProjection} from "prettygoat";
import {AccountCreated, AccountDeleted, Accounts} from "./TypeDefinitions";

@Projection("Accounts")
export class AccountsProjection implements IProjectionDefinition<Accounts> {

    define(): IProjection<Accounts> {
        let snapshotStrategy = new CountSnapshotStrategy();
        return {
            name: "Accounts",
            definition: {
                "io.bank.AccountCreated": (state, event: AccountCreated) => {
                    state = {
                        id: event.id,
                        name: event.name,
                        status: "ACTIVE"
                    };
                    return state;
                },
                "io.bank.AccountDeleted": (state, event: AccountDeleted) => {
                    state.status = "DELETED";
                    return state;
                }
            },
            split: {
                "io.bank.AccountCreated": (e: AccountCreated) => e.id,
                "io.bank.AccountDeleted": (e: AccountDeleted) => e.id
            },
            snapshotStrategy: snapshotStrategy
        };
    }
}