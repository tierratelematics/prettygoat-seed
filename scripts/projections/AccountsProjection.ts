import {IProjectionDefinition, CountSnapshotStrategy, Projection, IProjection} from "prettygoat";
import {AccountCreated, AccountDeleted, Account} from "../TypeDefinitions";

@Projection("Accounts")
export default class AccountsProjection implements IProjectionDefinition<Account> {

    define(): IProjection<Account> {
        let snapshotStrategy = new CountSnapshotStrategy();
        return {
            name: "Accounts",
            definition: {
                "io.bank.AccountCreated": (state: Account, event: AccountCreated) => {
                    state = {
                        id: event.id,
                        name: event.name,
                        status: "ACTIVE"
                    };
                    return state;
                },
                "io.bank.AccountDeleted": (state: Account, event: AccountDeleted) => {
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