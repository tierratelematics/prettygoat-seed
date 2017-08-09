import {
    IModule,
    IProjectionRegistry,
    IServiceLocator
} from "prettygoat";
import {interfaces} from "inversify";
import {AccountsProjection} from "./AccountsProjection";

class BankModule implements IModule {

    modules = (container: interfaces.Container) => {

    };

    register(registry: IProjectionRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        registry.add(AccountsProjection).forArea("Accounts");
    }
}

export default BankModule