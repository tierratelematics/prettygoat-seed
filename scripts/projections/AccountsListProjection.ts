import {IProjectionDefinition, Projection, IProjection} from "prettygoat";
import {AccountCreated, Account} from "../TypeDefinitions";

@Projection("List")
export default class AccountsListProjection implements IProjectionDefinition<Account[]> {

    define(): IProjection<Account[]> {
        return {
            name: "AccountsList",
            definition: {
                $init: () => [],
                "io.bank.AccountCreated": (state: Account[], event: AccountCreated) => {
                    state.push({
                        id: event.id,
                        name: event.name
                    });
                    return state;
                }
            }
        };
    }
}