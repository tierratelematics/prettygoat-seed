import {
    IProjectionDefinition,
    CountSnapshotStrategy,
    IProjection,
    Dictionary,
    IDeliverStrategy,
    DeliverAuthorization,
    DeliverContext,
    DeliverResult
} from "prettygoat";
import {AccountCreated, AccountDeleted, Account} from "./TypeDefinitions";
import {injectable} from "inversify";
import {values} from "lodash";

@injectable()
export class AccountsProjection implements IProjectionDefinition<Dictionary<Account>> {

    define(): IProjection<Dictionary<Account>> {
        return {
            name: "Accounts",
            definition: {
                $init: () => {
                    return {};
                },
                "io.bank.AccountCreated": (state, event: AccountCreated) => {
                    state[event.id] = {
                        id: event.id,
                        name: event.name,
                        status: "ACTIVE"
                    };
                    return state;
                },
                "io.bank.AccountDeleted": (state, event: AccountDeleted) => {
                    state[event.id].status = "DELETED";
                    return state;
                }
            },
            publish: {
                List: {
                    deliver: new ListDeliver()
                },
                Detail: {
                    notify: {
                        $key: parameters => parameters.id,
                        "io.bank.AccountCreated": (s, e: AccountCreated) => e.id,
                        "io.bank.AccountDeleted": (s, e: AccountDeleted) => e.id
                    },
                    deliver: new DetailDeliver()
                }
            },
            snapshot: new CountSnapshotStrategy()
        };
    }
}

class ListDeliver implements IDeliverStrategy<Dictionary<Account>, Account[]> {

    deliver(state: Dictionary<Account>, context: DeliverContext, readModels?: Dictionary<any>): DeliverResult<Account[]> {
        return [values(state), DeliverAuthorization.CONTENT];
    }

}

class DetailDeliver implements IDeliverStrategy<Dictionary<Account>, Account> {

    deliver(state: Dictionary<Account>, context: DeliverContext, readModels?: Dictionary<any>): DeliverResult<Account> {
        return [state[context.params.modelKey], DeliverAuthorization.CONTENT];
    }

}
